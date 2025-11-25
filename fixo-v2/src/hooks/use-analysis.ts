"use client";

import { useState, useCallback } from "react";
import { useUser } from "./use-user";

export interface AnalysisResult {
  analysisId: string;
  timestamp: string;
  detection: {
    object: {
      name: string;
      category: string;
      confidence?: number;
    };
    issue: {
      name: string;
      description: string;
      riskScore: number;
      difficulty: string;
    };
  };
  recommendations: {
    timeEstimate: string;
    tools: string[];
    steps: Array<{
      step: number;
      action: string;
      time: string;
      icon: string;
    }>;
    safetyWarnings: string[];
    estimatedCost: {
      min: number;
      max: number;
      currency: string;
    };
  };
  confidence: number;
}

interface UseAnalysisOptions {
  onSuccess?: (result: AnalysisResult) => void;
  onError?: (error: string) => void;
}

export function useAnalysis(options?: UseAnalysisOptions) {
  const { user } = useUser();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(
    async (image?: string, description?: string) => {
      if (!image && !description) {
        setError("Nahrajte fotografii nebo popište problém");
        return null;
      }

      // Check if user can analyze
      if (user && !user.canAnalyze) {
        setError("Dosáhli jste měsíčního limitu analýz. Upgradujte na PLUS pro neomezené analýzy.");
        return null;
      }

      setIsAnalyzing(true);
      setError(null);

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image, description }),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Analýza selhala");
        }

        setResult(data.data);
        options?.onSuccess?.(data.data);
        return data.data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Neočekávaná chyba";
        setError(message);
        options?.onError?.(message);
        return null;
      } finally {
        setIsAnalyzing(false);
      }
    },
    [user, options]
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    analyze,
    isAnalyzing,
    result,
    error,
    reset,
    canAnalyze: user?.canAnalyze ?? true,
    analysesRemaining: user ? user.monthlyAnalysesLimit - user.monthlyAnalysesUsed : 3,
  };
}
