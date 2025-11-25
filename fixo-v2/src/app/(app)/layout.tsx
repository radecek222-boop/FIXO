"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DisclaimerModal } from "@/components/disclaimer-modal";
import { OnboardingGate } from "@/components/onboarding-wizard";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingGate>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <DisclaimerModal />
      </div>
    </OnboardingGate>
  );
}
