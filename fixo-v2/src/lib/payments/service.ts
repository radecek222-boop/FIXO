// ==========================================
// PAYMENT SERVICE
// Manages payment providers and operations
// ==========================================

import { prisma } from "@/lib/prisma";
import type { IPaymentProvider } from "./provider";
import { MockPaymentProvider } from "./mock-provider";
import type {
  PaymentProvider,
  Plan,
  CreateCheckoutParams,
  CheckoutSession,
  Subscription,
  SubscriptionUpdateParams,
  PaymentResult,
  PLAN_CONFIGS,
} from "./types";

/**
 * Payment Service
 *
 * Singleton service that manages payment operations.
 * Abstracts the payment provider for easy switching.
 */
export class PaymentService {
  private provider: IPaymentProvider;

  constructor(providerType?: PaymentProvider) {
    // Initialize provider based on configuration
    // In production, this would check environment variables
    this.provider = this.initializeProvider(providerType);
  }

  private initializeProvider(providerType?: PaymentProvider): IPaymentProvider {
    const type = providerType || this.getConfiguredProvider();

    switch (type) {
      // Future implementations:
      // case "stripe":
      //   return new StripePaymentProvider();
      // case "gopay":
      //   return new GoPayPaymentProvider();
      // case "comgate":
      //   return new ComgatePaymentProvider();
      // case "paypal":
      //   return new PayPalPaymentProvider();
      case "mock":
      default:
        return new MockPaymentProvider();
    }
  }

  private getConfiguredProvider(): PaymentProvider {
    // Check environment for configured provider
    const provider = process.env.PAYMENT_PROVIDER as PaymentProvider;
    return provider || "mock";
  }

  /**
   * Get the current payment provider type
   */
  getProviderType(): PaymentProvider {
    return this.provider.provider;
  }

  // ==========================================
  // CHECKOUT OPERATIONS
  // ==========================================

  /**
   * Create a checkout session for upgrading plan
   */
  async createCheckout(
    userId: string,
    plan: Exclude<Plan, "FREE">,
    interval: "month" | "year",
    successUrl: string,
    cancelUrl: string
  ): Promise<PaymentResult<CheckoutSession>> {
    // Get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true },
    });

    if (!user?.email) {
      return {
        success: false,
        error: { code: "user_not_found", message: "Uživatel nebyl nalezen" },
      };
    }

    const params: CreateCheckoutParams = {
      userId,
      userEmail: user.email,
      plan,
      interval,
      successUrl,
      cancelUrl,
      metadata: {
        userId,
        plan,
        interval,
      },
    };

    return this.provider.createCheckoutSession(params);
  }

  // ==========================================
  // SUBSCRIPTION OPERATIONS
  // ==========================================

  /**
   * Get user's active subscription
   */
  async getActiveSubscription(
    userId: string
  ): Promise<PaymentResult<Subscription | null>> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionId: true },
    });

    if (!user?.subscriptionId) {
      return { success: true, data: null };
    }

    return this.provider.getSubscription(user.subscriptionId);
  }

  /**
   * Cancel user's subscription
   */
  async cancelSubscription(
    userId: string,
    immediately = false
  ): Promise<PaymentResult<Subscription>> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionId: true },
    });

    if (!user?.subscriptionId) {
      return {
        success: false,
        error: {
          code: "no_subscription",
          message: "Uživatel nemá aktivní předplatné",
        },
      };
    }

    const result = await this.provider.cancelSubscription(
      user.subscriptionId,
      immediately
    );

    if (result.success && immediately) {
      // Update user's plan to FREE
      await prisma.user.update({
        where: { id: userId },
        data: {
          plan: "FREE",
          subscriptionId: null,
          subscriptionEnd: null,
          monthlyAnalysesLimit: 3,
        },
      });
    }

    return result;
  }

  /**
   * Update user's subscription
   */
  async updateSubscription(
    userId: string,
    params: SubscriptionUpdateParams
  ): Promise<PaymentResult<Subscription>> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionId: true },
    });

    if (!user?.subscriptionId) {
      return {
        success: false,
        error: {
          code: "no_subscription",
          message: "Uživatel nemá aktivní předplatné",
        },
      };
    }

    return this.provider.updateSubscription(user.subscriptionId, params);
  }

  // ==========================================
  // WEBHOOK HANDLING
  // ==========================================

  /**
   * Process a webhook event
   */
  async handleWebhook(
    payload: string | Buffer,
    signature: string
  ): Promise<PaymentResult<void>> {
    const eventResult = await this.provider.verifyWebhook(payload, signature);

    if (!eventResult.success || !eventResult.data) {
      return {
        success: false,
        error: eventResult.error || {
          code: "webhook_failed",
          message: "Webhook ověření selhalo",
        },
      };
    }

    const event = eventResult.data;

    // Process based on event type
    switch (event.type) {
      case "checkout.completed":
        await this.handleCheckoutCompleted(event.data);
        break;

      case "subscription.updated":
        await this.handleSubscriptionUpdated(event.data);
        break;

      case "subscription.canceled":
      case "subscription.deleted":
        await this.handleSubscriptionCanceled(event.data);
        break;

      case "payment.failed":
      case "invoice.payment_failed":
        await this.handlePaymentFailed(event.data);
        break;

      default:
        console.log(`Unhandled webhook event type: ${event.type}`);
    }

    return { success: true };
  }

  private async handleCheckoutCompleted(
    data: Record<string, unknown>
  ): Promise<void> {
    const userId = data.userId as string;
    const plan = data.plan as Plan;
    const subscriptionId = data.subscriptionId as string;
    const subscriptionEnd = data.subscriptionEnd as string;

    if (!userId || !plan) return;

    // Update user's plan
    await prisma.user.update({
      where: { id: userId },
      data: {
        plan,
        subscriptionId,
        subscriptionEnd: subscriptionEnd ? new Date(subscriptionEnd) : null,
        monthlyAnalysesLimit: plan === "FREE" ? 3 : -1,
        monthlyAnalysesUsed: 0, // Reset on plan change
      },
    });
  }

  private async handleSubscriptionUpdated(
    data: Record<string, unknown>
  ): Promise<void> {
    const userId = data.userId as string;
    const plan = data.plan as Plan;
    const subscriptionEnd = data.subscriptionEnd as string;

    if (!userId) return;

    await prisma.user.update({
      where: { id: userId },
      data: {
        plan: plan || undefined,
        subscriptionEnd: subscriptionEnd ? new Date(subscriptionEnd) : undefined,
        monthlyAnalysesLimit: plan && plan !== "FREE" ? -1 : 3,
      },
    });
  }

  private async handleSubscriptionCanceled(
    data: Record<string, unknown>
  ): Promise<void> {
    const userId = data.userId as string;

    if (!userId) return;

    // Downgrade to FREE plan
    await prisma.user.update({
      where: { id: userId },
      data: {
        plan: "FREE",
        subscriptionId: null,
        subscriptionEnd: null,
        monthlyAnalysesLimit: 3,
      },
    });
  }

  private async handlePaymentFailed(
    data: Record<string, unknown>
  ): Promise<void> {
    const userId = data.userId as string;

    if (!userId) return;

    // TODO: Send notification email about failed payment
    console.log(`Payment failed for user ${userId}`);
  }

  // ==========================================
  // BILLING PORTAL
  // ==========================================

  /**
   * Create billing portal session for customer management
   */
  async createBillingPortal(
    userId: string,
    returnUrl: string
  ): Promise<PaymentResult<{ url: string }>> {
    if (!this.provider.createBillingPortalSession) {
      return {
        success: false,
        error: {
          code: "not_supported",
          message: "Platební portál není podporován",
        },
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true },
    });

    if (!user?.stripeCustomerId) {
      return {
        success: false,
        error: {
          code: "no_customer",
          message: "Zákazník nebyl nalezen",
        },
      };
    }

    return this.provider.createBillingPortalSession(
      user.stripeCustomerId,
      returnUrl
    );
  }
}

// Singleton instance
export const paymentService = new PaymentService();
