// ==========================================
// MOCK PAYMENT PROVIDER
// For development and testing
// ==========================================

import { BasePaymentProvider } from "./provider";
import type {
  PaymentProvider,
  CreateCheckoutParams,
  CheckoutSession,
  Subscription,
  SubscriptionUpdateParams,
  WebhookEvent,
  PaymentResult,
  Customer,
  CreateCustomerParams,
  Plan,
} from "./types";

// In-memory storage for mock data
const mockCustomers = new Map<string, Customer>();
const mockSubscriptions = new Map<string, Subscription>();

/**
 * Mock Payment Provider
 *
 * Use this for development and testing.
 * Does not actually charge anything.
 */
export class MockPaymentProvider extends BasePaymentProvider {
  readonly provider: PaymentProvider = "mock";

  // ==========================================
  // CUSTOMER MANAGEMENT
  // ==========================================

  async createCustomer(
    params: CreateCustomerParams
  ): Promise<PaymentResult<Customer>> {
    const id = `cus_mock_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    const customer: Customer = {
      id,
      provider: "mock",
      providerCustomerId: id,
      userId: params.userId,
      email: params.email,
      createdAt: new Date(),
    };

    mockCustomers.set(id, customer);

    return this.success(customer);
  }

  async getCustomer(providerCustomerId: string): Promise<PaymentResult<Customer>> {
    const customer = mockCustomers.get(providerCustomerId);

    if (!customer) {
      return this.error("customer_not_found", "Zákazník nebyl nalezen");
    }

    return this.success(customer);
  }

  async deleteCustomer(providerCustomerId: string): Promise<PaymentResult<void>> {
    mockCustomers.delete(providerCustomerId);
    return this.success(undefined);
  }

  // ==========================================
  // CHECKOUT
  // ==========================================

  async createCheckoutSession(
    params: CreateCheckoutParams
  ): Promise<PaymentResult<CheckoutSession>> {
    const id = `cs_mock_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    // Create a mock checkout session
    const session: CheckoutSession = {
      id,
      url: `${params.successUrl}?session_id=${id}&plan=${params.plan}`,
      provider: "mock",
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    };

    // In a real implementation, this would redirect to the payment page
    // For mock, we simulate immediate success
    const subscription = await this.createMockSubscription(params);
    if (subscription.success && subscription.data) {
      mockSubscriptions.set(subscription.data.id, subscription.data);
    }

    return this.success(session);
  }

  private async createMockSubscription(
    params: CreateCheckoutParams
  ): Promise<PaymentResult<Subscription>> {
    const id = `sub_mock_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const now = new Date();
    const periodEnd = new Date(now);

    if (params.interval === "month") {
      periodEnd.setMonth(periodEnd.getMonth() + 1);
    } else {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    }

    const subscription: Subscription = {
      id,
      provider: "mock",
      providerSubscriptionId: id,
      userId: params.userId,
      plan: params.plan,
      status: "active",
      interval: params.interval,
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: false,
      createdAt: now,
    };

    return this.success(subscription);
  }

  // ==========================================
  // SUBSCRIPTION MANAGEMENT
  // ==========================================

  async getSubscription(
    providerSubscriptionId: string
  ): Promise<PaymentResult<Subscription>> {
    const subscription = mockSubscriptions.get(providerSubscriptionId);

    if (!subscription) {
      return this.error("subscription_not_found", "Předplatné nebylo nalezeno");
    }

    return this.success(subscription);
  }

  async updateSubscription(
    providerSubscriptionId: string,
    params: SubscriptionUpdateParams
  ): Promise<PaymentResult<Subscription>> {
    const subscription = mockSubscriptions.get(providerSubscriptionId);

    if (!subscription) {
      return this.error("subscription_not_found", "Předplatné nebylo nalezeno");
    }

    // Update subscription
    if (params.newPlan) {
      subscription.plan = params.newPlan;
    }

    if (params.newInterval) {
      subscription.interval = params.newInterval;
    }

    if (params.cancelAtPeriodEnd !== undefined) {
      subscription.cancelAtPeriodEnd = params.cancelAtPeriodEnd;
    }

    mockSubscriptions.set(providerSubscriptionId, subscription);

    return this.success(subscription);
  }

  async cancelSubscription(
    providerSubscriptionId: string,
    immediately = false
  ): Promise<PaymentResult<Subscription>> {
    const subscription = mockSubscriptions.get(providerSubscriptionId);

    if (!subscription) {
      return this.error("subscription_not_found", "Předplatné nebylo nalezeno");
    }

    if (immediately) {
      subscription.status = "canceled";
      subscription.canceledAt = new Date();
    } else {
      subscription.cancelAtPeriodEnd = true;
    }

    mockSubscriptions.set(providerSubscriptionId, subscription);

    return this.success(subscription);
  }

  async reactivateSubscription(
    providerSubscriptionId: string
  ): Promise<PaymentResult<Subscription>> {
    const subscription = mockSubscriptions.get(providerSubscriptionId);

    if (!subscription) {
      return this.error("subscription_not_found", "Předplatné nebylo nalezeno");
    }

    if (subscription.status === "canceled") {
      return this.error(
        "subscription_already_canceled",
        "Předplatné bylo již zrušeno"
      );
    }

    subscription.cancelAtPeriodEnd = false;
    mockSubscriptions.set(providerSubscriptionId, subscription);

    return this.success(subscription);
  }

  // ==========================================
  // WEBHOOKS
  // ==========================================

  async verifyWebhook(
    payload: string | Buffer,
    _signature: string
  ): Promise<PaymentResult<WebhookEvent>> {
    // For mock provider, just parse the payload as JSON
    try {
      const data =
        typeof payload === "string" ? JSON.parse(payload) : JSON.parse(payload.toString());

      const event: WebhookEvent = {
        id: `evt_mock_${Date.now()}`,
        type: data.type || "checkout.completed",
        provider: "mock",
        data,
        createdAt: new Date(),
      };

      return this.success(event);
    } catch {
      return this.error("invalid_payload", "Neplatný webhook payload");
    }
  }

  // ==========================================
  // BILLING PORTAL (Optional)
  // ==========================================

  async createBillingPortalSession(
    _providerCustomerId: string,
    returnUrl: string
  ): Promise<PaymentResult<{ url: string }>> {
    // Mock implementation - just redirect back
    return this.success({
      url: `${returnUrl}?billing=mock`,
    });
  }
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get analyses limit for a plan
 */
export function getPlanAnalysesLimit(plan: Plan): number {
  switch (plan) {
    case "FREE":
      return 3;
    case "PLUS":
    case "PRO":
    case "LIFETIME":
      return -1; // unlimited
    default:
      return 3;
  }
}

/**
 * Check if a plan allows unlimited analyses
 */
export function hasUnlimitedAnalyses(plan: Plan): boolean {
  return getPlanAnalysesLimit(plan) === -1;
}
