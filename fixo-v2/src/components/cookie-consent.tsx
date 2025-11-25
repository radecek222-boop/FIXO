"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, Cookie, Settings } from "lucide-react";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_CONSENT_KEY = "fixo-cookie-consent";
const COOKIE_PREFERENCES_KEY = "fixo-cookie-preferences";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);

    // Dispatch event for analytics to listen to
    window.dispatchEvent(
      new CustomEvent("cookieConsentChanged", { detail: prefs })
    );
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptNecessaryOnly = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const saveCustomPreferences = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 animate-in slide-in-from-bottom-4 duration-300">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl border bg-background shadow-xl">
          {/* Main banner */}
          <div className="p-4 md:p-6">
            <div className="flex items-start gap-4">
              <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-fixo-primary-light">
                <Cookie className="h-6 w-6 text-fixo-primary" />
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    🍪 Cookies a soukromí
                  </h3>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="text-muted-foreground hover:text-foreground md:hidden"
                    aria-label="Zavřít"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Používáme cookies pro správné fungování webu a analýzu návštěvnosti.
                  Analytické cookies nám pomáhají zlepšovat službu, ale vyžadují váš souhlas.
                  Více informací v{" "}
                  <Link
                    href="/privacy"
                    className="text-fixo-primary hover:underline"
                  >
                    Zásadách ochrany osobních údajů
                  </Link>
                  .
                </p>

                {/* Cookie details - expandable */}
                {showDetails && (
                  <div className="mt-4 space-y-4 rounded-lg border bg-muted/30 p-4">
                    {/* Necessary cookies */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Nezbytné cookies</h4>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded">
                            Vždy aktivní
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Nutné pro fungování webu - přihlášení, bezpečnost, preference.
                        </p>
                      </div>
                      <div className="shrink-0">
                        <div className="h-6 w-11 rounded-full bg-fixo-primary flex items-center justify-end px-1">
                          <div className="h-4 w-4 rounded-full bg-white" />
                        </div>
                      </div>
                    </div>

                    {/* Analytics cookies */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-medium">Analytické cookies</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Google Analytics - anonymní statistiky návštěvnosti.
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setPreferences((p) => ({
                            ...p,
                            analytics: !p.analytics,
                          }))
                        }
                        className={`shrink-0 h-6 w-11 rounded-full flex items-center px-1 transition-colors ${
                          preferences.analytics
                            ? "bg-fixo-primary justify-end"
                            : "bg-muted justify-start"
                        }`}
                        role="switch"
                        aria-checked={preferences.analytics}
                      >
                        <div className="h-4 w-4 rounded-full bg-white shadow" />
                      </button>
                    </div>

                    {/* Marketing cookies */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-medium">Marketingové cookies</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Personalizované reklamy a remarketing (zatím nepoužíváme).
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setPreferences((p) => ({
                            ...p,
                            marketing: !p.marketing,
                          }))
                        }
                        className={`shrink-0 h-6 w-11 rounded-full flex items-center px-1 transition-colors ${
                          preferences.marketing
                            ? "bg-fixo-primary justify-end"
                            : "bg-muted justify-start"
                        }`}
                        role="switch"
                        aria-checked={preferences.marketing}
                      >
                        <div className="h-4 w-4 rounded-full bg-white shadow" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Button onClick={acceptAll} className="flex-1 md:flex-none">
                    Přijmout vše
                  </Button>
                  <Button
                    onClick={acceptNecessaryOnly}
                    variant="outline"
                    className="flex-1 md:flex-none"
                  >
                    Pouze nezbytné
                  </Button>
                  {!showDetails ? (
                    <Button
                      onClick={() => setShowDetails(true)}
                      variant="ghost"
                      className="flex-1 md:flex-none"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Nastavení
                    </Button>
                  ) : (
                    <Button
                      onClick={saveCustomPreferences}
                      variant="secondary"
                      className="flex-1 md:flex-none"
                    >
                      Uložit nastavení
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook to check cookie preferences
export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    const loadPreferences = () => {
      const saved = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (saved) {
        setPreferences(JSON.parse(saved));
      }
    };

    loadPreferences();

    // Listen for changes
    const handleChange = (e: CustomEvent<CookiePreferences>) => {
      setPreferences(e.detail);
    };

    window.addEventListener(
      "cookieConsentChanged",
      handleChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "cookieConsentChanged",
        handleChange as EventListener
      );
    };
  }, []);

  return {
    hasConsent: preferences !== null,
    analyticsAllowed: preferences?.analytics ?? false,
    marketingAllowed: preferences?.marketing ?? false,
  };
}
