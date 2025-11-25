// ==========================================
// ABSTRACT PAYMENT TYPES
// Platform-agnostic payment definitions
// ==========================================

export type PaymentProvider = "stripe" | "gopay" | "comgate" | "paypal" | "mock";

export type Plan = "FREE" | "PLUS" | "PRO" | "LIFETIME";

export type Currency = "CZK" | "EUR" | "USD";

export type SubscriptionInterval = "month" | "year";

export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "past_due"
  | "unpaid"
  | "trialing"
  | "incomplete"
  | "paused";

// ==========================================
// PAYMENT CONFIGURATION
// ==========================================

export interface PlanConfig {
  id: Plan;
  name: string;
  description: string;
  prices: {
    monthly: number;
    yearly: number;
  };
  currency: Currency;
  features: string[];
  analysesLimit: number;
  popular?: boolean;
}

export const PLAN_CONFIGS: Record<Plan, PlanConfig> = {
  FREE: {
    id: "FREE",
    name: "FREE",
    description: "Pro občasné kutily",
    prices: { monthly: 0, yearly: 0 },
    currency: "CZK",
    features: [
      "3 AI analýzy měsíčně",
      "Základní databáze (50 oprav)",
      "Textové návody",
      "Bezpečnostní varování",
    ],
    analysesLimit: 3,
  },
  PLUS: {
    id: "PLUS",
    name: "PLUS",
    description: "Pro aktivní kutily",
    prices: { monthly: 49, yearly: 490 },
    currency: "CZK",
    features: [
      "Neomezené AI analýzy",
      "Kompletní databáze (500+ oprav)",
      "Video tutoriály",
      "Offline přístup",
      "Prioritní podpora",
    ],
    analysesLimit: -1, // unlimited
    popular: true,
  },
  PRO: {
    id: "PRO",
    name: "PRO",
    description: "Pro profesionály",
    prices: { monthly: 99, yearly: 990 },
    currency: "CZK",
    features: [
      "Vše z PLUS",
      "Více zařízení",
      "Reporty a statistiky",
      "API přístup",
      "Dedikovaná podpora",
    ],
    analysesLimit: -1,
  },
  LIFETIME: {
    id: "LIFETIME",
    name: "LIFETIME",
    description: "Jednorázová platba",
    prices: { monthly: 999, yearly: 999 },
    currency: "CZK",
    features: [
      "Vše z PRO navždy",
      "Žádné měsíční platby",
      "Všechny budoucí funkce",
    ],
    analysesLimit: -1,
  },
};

// ==========================================
// CHECKOUT TYPES
// ==========================================

export interface CreateCheckoutParams {
  userId: string;
  userEmail: string;
  plan: Exclude<Plan, "FREE">;
  interval: SubscriptionInterval;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface CheckoutSession {
  id: string;
  url: string;
  provider: PaymentProvider;
  expiresAt?: Date;
}

// ==========================================
// SUBSCRIPTION TYPES
// ==========================================

export interface Subscription {
  id: string;
  provider: PaymentProvider;
  providerSubscriptionId: string;
  userId: string;
  plan: Plan;
  status: SubscriptionStatus;
  interval: SubscriptionInterval;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt?: Date;
  createdAt: Date;
}

export interface SubscriptionUpdateParams {
  newPlan?: Plan;
  newInterval?: SubscriptionInterval;
  cancelAtPeriodEnd?: boolean;
}

// ==========================================
// WEBHOOK TYPES
// ==========================================

export interface WebhookEvent {
  id: string;
  type: WebhookEventType;
  provider: PaymentProvider;
  data: Record<string, unknown>;
  createdAt: Date;
}

export type WebhookEventType =
  | "checkout.completed"
  | "subscription.created"
  | "subscription.updated"
  | "subscription.canceled"
  | "subscription.deleted"
  | "payment.succeeded"
  | "payment.failed"
  | "invoice.paid"
  | "invoice.payment_failed";

// ==========================================
// PAYMENT RESULT TYPES
// ==========================================

export interface PaymentResult<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// ==========================================
// CUSTOMER TYPES
// ==========================================

export interface Customer {
  id: string;
  provider: PaymentProvider;
  providerCustomerId: string;
  userId: string;
  email: string;
  createdAt: Date;
}

export interface CreateCustomerParams {
  userId: string;
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}
