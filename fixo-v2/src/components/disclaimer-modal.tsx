"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Shield, Zap, Wrench, CheckCircle2 } from "lucide-react";

const DISCLAIMER_ACCEPTED_KEY = "fixo-disclaimer-accepted";

interface DisclaimerModalProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export function DisclaimerModal({ onAccept, onDecline }: DisclaimerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasRead, setHasRead] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const accepted = localStorage.getItem(DISCLAIMER_ACCEPTED_KEY);
    if (!accepted) {
      // Small delay to let the page load
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(DISCLAIMER_ACCEPTED_KEY, "true");
    localStorage.setItem(DISCLAIMER_ACCEPTED_KEY + "-date", new Date().toISOString());
    setIsOpen(false);
    onAccept?.();
  };

  const handleDecline = () => {
    setIsOpen(false);
    onDecline?.();
    // Redirect to homepage
    window.location.href = "/";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning-light">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div>
              <DialogTitle className="text-xl">
                Důležité upozornění
              </DialogTitle>
              <DialogDescription>
                Před použitím služby FIXO si prosím přečtěte
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Informativní charakter */}
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fixo-primary-light">
                <Shield className="h-5 w-5 text-fixo-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold">1. Informativní charakter</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Veškeré informace, návody a doporučení poskytované službou FIXO mají
                <strong> výhradně informativní a vzdělávací charakter</strong>. Nejedná se
                o odborné poradenství ani o náhradu profesionálních služeb kvalifikovaných
                řemeslníků.
              </p>
            </div>
          </div>

          {/* Přijetí odpovědnosti */}
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fixo-primary-light">
                <Wrench className="h-5 w-5 text-fixo-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold">2. Přijetí odpovědnosti</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Používáním služby FIXO <strong>přijímáte plnou a výhradní odpovědnost</strong> za:
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                <li>Veškeré své jednání a rozhodnutí učiněná na základě poskytnutých informací</li>
                <li>Jakékoli škody na majetku, zdraví nebo životě vzniklé v důsledku použití</li>
                <li>Posouzení svých schopností a zkušeností před provedením opravy</li>
              </ul>
            </div>
          </div>

          {/* Vyloučení odpovědnosti */}
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-danger-light">
                <AlertTriangle className="h-5 w-5 text-danger" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-danger">3. Vyloučení odpovědnosti provozovatele</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Provozovatel služby FIXO (White Glove servis, IČO: 09769684), jeho vlastníci,
                zaměstnanci ani partneři <strong>nenesou žádnou odpovědnost</strong> za přímé,
                nepřímé, náhodné, následné nebo zvláštní škody vzniklé použitím služby.
              </p>
            </div>
          </div>

          {/* Nebezpečné práce */}
          <div className="rounded-lg border-2 border-danger bg-danger-light p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-danger" />
              <h3 className="font-bold text-danger">⚡ Nebezpečné práce</h3>
            </div>
            <p className="text-sm text-gray-700">
              Práce s <strong>elektřinou, plynem a vodou pod tlakem</strong> mohou být
              životu nebezpečné. Pro tyto práce <strong>DŮRAZNĚ DOPORUČUJEME</strong> přivolat
              kvalifikovaného odborníka. V ČR jsou některé práce ze zákona vyhrazeny pouze
              osobám s příslušnou kvalifikací.
            </p>
          </div>

          {/* AI upozornění */}
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">4. AI analýza</h3>
              <p className="text-sm text-muted-foreground mt-1">
                AI analýza je založena na pravděpodobnostním modelu a <strong>není 100%
                spolehlivá</strong>. Vaše fotografie budou odeslány na servery OpenAI
                pro zpracování.
              </p>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <button
              onClick={() => setHasRead(!hasRead)}
              className={`shrink-0 mt-0.5 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                hasRead
                  ? "bg-fixo-primary border-fixo-primary text-white"
                  : "border-muted-foreground"
              }`}
              role="checkbox"
              aria-checked={hasRead}
            >
              {hasRead && <CheckCircle2 className="h-4 w-4" />}
            </button>
            <label
              onClick={() => setHasRead(!hasRead)}
              className="text-sm cursor-pointer select-none"
            >
              Přečetl/a jsem si a rozumím výše uvedeným podmínkám. Přijímám plnou
              odpovědnost za použití služby FIXO.
            </label>
          </div>

          <p className="text-xs text-muted-foreground">
            Kompletní podmínky najdete v{" "}
            <Link href="/terms" className="text-fixo-primary hover:underline">
              Podmínkách použití
            </Link>{" "}
            a{" "}
            <Link href="/privacy" className="text-fixo-primary hover:underline">
              Zásadách ochrany osobních údajů
            </Link>
            .
          </p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleDecline}
            className="w-full sm:w-auto"
          >
            Nesouhlasím
          </Button>
          <Button
            onClick={handleAccept}
            disabled={!hasRead}
            className="w-full sm:w-auto"
          >
            Souhlasím a pokračuji
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Hook to check if disclaimer was accepted
export function useDisclaimerAccepted() {
  const [accepted, setAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    const isAccepted = localStorage.getItem(DISCLAIMER_ACCEPTED_KEY) === "true";
    setAccepted(isAccepted);
  }, []);

  return accepted;
}

// Component to show disclaimer before specific action
interface DisclaimerGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function DisclaimerGate({ children, fallback }: DisclaimerGateProps) {
  const accepted = useDisclaimerAccepted();

  if (accepted === null) {
    // Loading state
    return fallback || null;
  }

  if (!accepted) {
    return <DisclaimerModal />;
  }

  return <>{children}</>;
}
