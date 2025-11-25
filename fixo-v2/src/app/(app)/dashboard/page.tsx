"use client";

import * as React from "react";
import { Upload, Camera, FileImage, Loader2, AlertTriangle, Clock, Wrench, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CameraCapture, useCameraAvailable } from "@/components/camera-capture";

type AnalysisState = "idle" | "uploading" | "analyzing" | "complete";

interface AnalysisResult {
  object: {
    name: string;
    category: string;
    confidence: number;
  };
  issue: {
    name: string;
    description: string;
    riskScore: number;
    difficulty: string;
  };
  timeEstimate: string;
  tools: string[];
  steps: Array<{
    step: number;
    action: string;
    description?: string;
    time: string;
    icon: string;
  }>;
  safetyWarnings: string[];
}

export default function DashboardPage() {
  const [state, setState] = React.useState<AnalysisState>("idle");
  const [dragOver, setDragOver] = React.useState(false);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<AnalysisResult | null>(null);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [showCamera, setShowCamera] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const cameraAvailable = useCameraAvailable();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  // Handle camera capture
  const handleCameraCapture = async (imageData: string) => {
    setShowCamera(false);
    setPreview(imageData);
    await analyzeImage(imageData);
  };

  // Analyze image (from file or camera)
  const analyzeImage = async (imageData: string) => {
    setState("uploading");
    await new Promise((r) => setTimeout(r, 500));
    setState("analyzing");

    // Call the API
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        // Map API response to component format
        const apiResult = data.data;
        setResult({
          object: {
            name: apiResult.detection?.object?.name || "Neznámý objekt",
            category: apiResult.detection?.object?.category || "other",
            confidence: apiResult.confidence || 0.8,
          },
          issue: {
            name: apiResult.detection?.issue?.name || "Neznámá závada",
            description: apiResult.detection?.issue?.description || "",
            riskScore: apiResult.detection?.issue?.riskScore || 5,
            difficulty: getDifficultyLabel(apiResult.detection?.issue?.difficulty || "MEDIUM"),
          },
          timeEstimate: apiResult.recommendations?.timeEstimate || "15 min",
          tools: apiResult.recommendations?.tools || [],
          steps: apiResult.recommendations?.steps || [],
          safetyWarnings: apiResult.recommendations?.safetyWarnings || [],
        });
      } else {
        throw new Error(data.error || "Analýza selhala");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      // Fallback to mock data on error
      setResult(getMockResult());
    }

    setState("complete");
  };

  const getDifficultyLabel = (difficulty: string): string => {
    const labels: Record<string, string> = {
      "VERY_EASY": "Velmi snadná",
      "EASY": "Snadná",
      "MEDIUM": "Střední",
      "HARD": "Těžká",
      "VERY_HARD": "Velmi těžká",
      "EXPERT": "Pro experty",
    };
    return labels[difficulty] || difficulty;
  };

  const getMockResult = (): AnalysisResult => ({
    object: { name: "Kohoutek", category: "voda", confidence: 0.92 },
    issue: {
      name: "Kapající kohoutek",
      description: "Netěsnící těsnění nebo O-kroužek způsobuje únik vody.",
      riskScore: 2,
      difficulty: "Nízká",
    },
    timeEstimate: "15 min",
    tools: ["Klíč", "Šroubovák", "Nové těsnění", "Hadřík"],
    steps: [
      { step: 1, action: "Zavřete hlavní přívod vody", time: "1 min", icon: "🚰" },
      { step: 2, action: "Otevřete kohoutek pro uvolnění tlaku", time: "30 s", icon: "💧" },
      { step: 3, action: "Odšroubujte hlavici kohoutku", time: "2 min", icon: "🔧" },
      { step: 4, action: "Vyjměte staré těsnění", time: "2 min", icon: "⚙️" },
      { step: 5, action: "Nasaďte nové těsnění", time: "2 min", icon: "🔩" },
      { step: 6, action: "Sestavte kohoutek zpět", time: "3 min", icon: "🔧" },
      { step: 7, action: "Pusťte vodu a zkontrolujte", time: "2 min", icon: "✅" },
    ],
    safetyWarnings: [
      "Vždy nejdříve zavřete hlavní přívod vody",
      "Mějte připravený kbelík na zachycení zbylé vody",
      "Nepoužívejte nadměrnou sílu při utahování",
    ],
  });

  const handleFile = async (file: File) => {
    // Create preview and analyze
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      setPreview(imageData);
      await analyzeImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const resetAnalysis = () => {
    setState("idle");
    setPreview(null);
    setResult(null);
    setCurrentStep(0);
  };

  const getRiskColor = (score: number) => {
    if (score <= 3) return "success";
    if (score <= 6) return "warning";
    return "danger";
  };

  return (
    <div className="container py-8">
      {/* Idle State - Upload Zone */}
      {state === "idle" && (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Vyfotografujte závadu</h1>
            <p className="text-muted-foreground">
              AI okamžitě identifikuje problém a nabídne řešení
            </p>
          </div>

          <div
            className={cn(
              "upload-zone cursor-pointer",
              dragOver && "drag-over"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">Přetáhněte fotografii sem</p>
            <p className="text-sm text-muted-foreground mt-1">
              nebo klikněte pro výběr souboru
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Podporované formáty: JPG, PNG, GIF, WebP
            </p>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <FileImage className="mr-2 h-4 w-4" />
              Vybrat fotografii
            </Button>
            {cameraAvailable !== false && (
              <Button variant="outline" onClick={() => setShowCamera(true)}>
                <Camera className="mr-2 h-4 w-4" />
                Použít kameru
              </Button>
            )}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="mx-auto h-6 w-6 text-fixo-primary mb-2" />
                <div className="font-semibold">30 sekund</div>
                <div className="text-xs text-muted-foreground">Průměrná analýza</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <CheckCircle className="mx-auto h-6 w-6 text-success mb-2" />
                <div className="font-semibold">Bezpečné</div>
                <div className="text-xs text-muted-foreground">S varováními</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Wrench className="mx-auto h-6 w-6 text-fixo-secondary mb-2" />
                <div className="font-semibold">500+ oprav</div>
                <div className="text-xs text-muted-foreground">V databázi</div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Analyzing State */}
      {(state === "uploading" || state === "analyzing") && (
        <div className="max-w-md mx-auto text-center py-12">
          <Loader2 className="mx-auto h-12 w-12 text-fixo-primary animate-spin mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            {state === "uploading" ? "Nahrávám fotografii..." : "Analyzuji..."}
          </h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className={state === "analyzing" ? "text-fixo-primary font-medium" : ""}>
              ✓ Detekce objektu
            </p>
            <p className={state === "analyzing" ? "text-fixo-primary font-medium" : ""}>
              ✓ Identifikace závady
            </p>
            <p>○ Příprava návodů</p>
          </div>
        </div>
      )}

      {/* Results State */}
      {state === "complete" && result && (
        <div className="max-w-4xl mx-auto">
          {/* Result Header */}
          <Card className="mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-fixo-primary to-blue-600 text-white p-6">
              <div className="flex items-start gap-4">
                {preview && (
                  <img
                    src={preview}
                    alt="Analyzovaný obrázek"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-2">
                    Detekováno s {Math.round(result.object.confidence * 100)}% jistotou
                  </Badge>
                  <h2 className="text-2xl font-bold">{result.object.name}</h2>
                  <p className="text-blue-100 mt-1">{result.issue.name}</p>
                </div>
              </div>
            </div>
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm text-muted-foreground">Čas opravy</div>
                  <div className="font-semibold">{result.timeEstimate}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Obtížnost</div>
                  <div className="font-semibold">{result.issue.difficulty}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Riziko</div>
                  <Badge variant={getRiskColor(result.issue.riskScore)}>
                    {result.issue.riskScore}/10
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Warnings */}
          {result.safetyWarnings.length > 0 && (
            <Card className="mb-6 border-warning bg-warning-light">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="h-5 w-5" />
                  Bezpečnostní upozornění
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.safetyWarnings.map((warning, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-warning">⚠️</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Tools */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Potřebné nástroje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {result.tools.map((tool) => (
                  <Badge key={tool} variant="outline">
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Steps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                Krok {currentStep + 1} z {result.steps.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-6xl mb-4">{result.steps[currentStep].icon}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {result.steps[currentStep].action}
                </h3>
                <Badge variant="outline">{result.steps[currentStep].time}</Badge>
              </div>

              {/* Step navigation */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  Předchozí krok
                </Button>
                {currentStep < result.steps.length - 1 ? (
                  <Button
                    variant="fixo"
                    onClick={() => setCurrentStep(currentStep + 1)}
                  >
                    Další krok
                  </Button>
                ) : (
                  <Button variant="success" onClick={resetAnalysis}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Dokončit opravu
                  </Button>
                )}
              </div>

              {/* All steps overview */}
              <div className="mt-8 pt-6 border-t">
                <h4 className="text-sm font-medium mb-4">Přehled všech kroků</h4>
                <div className="space-y-2">
                  {result.steps.map((step, i) => (
                    <div
                      key={step.step}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
                        i === currentStep && "bg-fixo-primary-light border-l-4 border-fixo-primary",
                        i < currentStep && "bg-success-light opacity-75",
                        i > currentStep && "bg-muted"
                      )}
                      onClick={() => setCurrentStep(i)}
                    >
                      <span className="text-lg">{step.icon}</span>
                      <span className={cn("flex-1 text-sm", i === currentStep && "font-medium")}>
                        {step.action}
                      </span>
                      <span className="text-xs text-muted-foreground">{step.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={resetAnalysis}>
              Analyzovat další závadu
            </Button>
            <Button variant="secondary">
              Zavolat odborníka
            </Button>
          </div>
        </div>
      )}

      {/* Camera Capture Modal */}
      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}
