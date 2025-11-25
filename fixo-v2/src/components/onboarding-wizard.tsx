"use client";

import * as React from "react";
import {
  Camera,
  Wrench,
  Shield,
  ArrowRight,
  ArrowLeft,
  Check,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OnboardingStep {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "welcome",
    icon: Sparkles,
    title: "Vitejte ve FIXO!",
    description:
      "Vase osobni asistence pro domaci opravy. Vyfotografujte jakykoliv problem a ziskejte okamzitou diagnostiku s navody krok za krokem.",
  },
  {
    id: "camera",
    icon: Camera,
    title: "Vyfotografujte zavadu",
    description:
      "Staci vyfotit problem - kapajici kohoutek, nefunkcni zasuvku, nebo cokoliv jineho. AI analyzuje obrazek a identifikuje problem.",
  },
  {
    id: "diagnosis",
    icon: Wrench,
    title: "Ziskejte navod na opravu",
    description:
      "Behem sekund obdrzite detailni navod s jednotlivymi kroky, seznamem potrebnych nastroju a odhadem casu.",
  },
  {
    id: "safety",
    icon: Shield,
    title: "Bezpecnost na prvnim miste",
    description:
      "Kazdy navod obsahuje bezpecnostni varovani. Nebezpecne prace oznacime a doporucime privolat odbornika.",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Pripraveno pro mobil",
    description:
      "FIXO funguje skvele na mobilu. Pouzijte primo kameru telefonu a mejte navody vzdy po ruce.",
  },
];

interface OnboardingWizardProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export function OnboardingWizard({ onComplete, onSkip }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const step = ONBOARDING_STEPS[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  const goToStep = (newStep: number) => {
    if (isAnimating || newStep === currentStep) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(newStep);
      setIsAnimating(false);
    }, 150);
  };

  const nextStep = () => {
    if (isLastStep) {
      onComplete();
    } else {
      goToStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      goToStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      onComplete();
    }
  };

  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Skip button */}
      <div className="absolute top-4 right-4 z-10">
        <Button variant="ghost" size="sm" onClick={handleSkip}>
          Preskocit
          <X className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div
          className={cn(
            "text-center max-w-md transition-all duration-300",
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}
        >
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-fixo-primary-light flex items-center justify-center">
                <Icon className="h-12 w-12 text-fixo-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-fixo-primary text-white flex items-center justify-center text-sm font-bold">
                {currentStep + 1}
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-4">{step.title}</h2>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {ONBOARDING_STEPS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToStep(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentStep
                ? "w-8 bg-fixo-primary"
                : index < currentStep
                ? "w-2 bg-fixo-primary/50"
                : "w-2 bg-muted-foreground/30"
            )}
            aria-label={`Krok ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center px-6 pb-8">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={isFirstStep || isAnimating}
          className={cn(isFirstStep && "invisible")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zpet
        </Button>

        <Button variant="fixo" onClick={nextStep} disabled={isAnimating}>
          {isLastStep ? (
            <>
              Zacit pouzivat
              <Check className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Dalsi
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ==========================================
// ONBOARDING STATE MANAGEMENT
// ==========================================

const ONBOARDING_KEY = "fixo-onboarding-completed";

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Check if onboarding was already completed
    const completed = localStorage.getItem(ONBOARDING_KEY);
    setShowOnboarding(!completed);
    setIsLoading(false);
  }, []);

  const completeOnboarding = React.useCallback(() => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setShowOnboarding(false);
  }, []);

  const resetOnboarding = React.useCallback(() => {
    localStorage.removeItem(ONBOARDING_KEY);
    setShowOnboarding(true);
  }, []);

  return {
    showOnboarding,
    isLoading,
    completeOnboarding,
    resetOnboarding,
  };
}

// ==========================================
// ONBOARDING GATE COMPONENT
// ==========================================

interface OnboardingGateProps {
  children: React.ReactNode;
}

export function OnboardingGate({ children }: OnboardingGateProps) {
  const { showOnboarding, isLoading, completeOnboarding } = useOnboarding();

  if (isLoading) {
    return null;
  }

  return (
    <>
      {children}
      {showOnboarding && (
        <OnboardingWizard
          onComplete={completeOnboarding}
          onSkip={completeOnboarding}
        />
      )}
    </>
  );
}
