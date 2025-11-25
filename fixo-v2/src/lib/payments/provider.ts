// ==========================================
// ABSTRACT PAYMENT PROVIDER
// Interface for any payment gateway
// ==========================================

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
} from "./types";

/**
 * Abstract Payment Provider Interface
 *
 * Implement this interface for each payment gateway:
 * - Stripe: StripePaymentProvider
 * - GoPay: GoPayPaymentProvider
 * - Comgate: ComgatePaymentProvider
 * - PayPal: PayPalPaymentProvider
 */
export interface IPaymentProvider {
  readonly provider: PaymentProvider;

  // ==========================================
  // CUSTOMER MANAGEMENT
  // ==========================================

  /**
   * Create a customer in the payment provider
   */
  createCustomer(params: CreateCustomerParams): Promise<PaymentResult<Customer>>;

  /**
   * Get a customer by their provider customer ID
   */
  getCustomer(providerCustomerId: string): Promise<PaymentResult<Customer>>;

  /**
   * Delete a customer
   */
  deleteCustomer(providerCustomerId: string): Promise<PaymentResult<void>>;

  // ==========================================
  // CHECKOUT
  // ==========================================

  /**
   * Create a checkout session for subscription
   */
  createCheckoutSession(
    params: CreateCheckoutParams
  ): Promise<PaymentResult<CheckoutSession>>;

  // ==========================================
  // SUBSCRIPTION MANAGEMENT
  // ==========================================

  /**
   * Get a subscription by its provider subscription ID
   */
  getSubscription(
    providerSubscriptionId: string
  ): Promise<PaymentResult<Subscription>>;

  /**
   * Update a subscription (change plan, cancel, etc.)
   */
  updateSubscription(
    providerSubscriptionId: string,
    params: SubscriptionUpdateParams
  ): Promise<PaymentResult<Subscription>>;

  /**
   * Cancel a subscription immediately or at period end
   */
  cancelSubscription(
    providerSubscriptionId: string,
    immediately?: boolean
  ): Promise<PaymentResult<Subscription>>;

  /**
   * Reactivate a canceled subscription (if still in period)
   */
  reactivateSubscription(
    providerSubscriptionId: string
  ): Promise<PaymentResult<Subscription>>;

  // ==========================================
  // WEBHOOKS
  // ==========================================

  /**
   * Verify and parse a webhook event from the provider
   */
  verifyWebhook(
    payload: string | Buffer,
    signature: string
  ): Promise<PaymentResult<WebhookEvent>>;

  // ==========================================
  // BILLING PORTAL
  // ==========================================

  /**
   * Create a billing portal session for customer self-service
   */
  createBillingPortalSession?(
    providerCustomerId: string,
    returnUrl: string
  ): Promise<PaymentResult<{ url: string }>>;
}

/**
 * Base class with common functionality
 */
export abstract class BasePaymentProvider implements IPaymentProvider {
  abstract readonly provider: PaymentProvider;

  abstract createCustomer(
    params: CreateCustomerParams
  ): Promise<PaymentResult<Customer>>;

  abstract getCustomer(
    providerCustomerId: string
  ): Promise<PaymentResult<Customer>>;

  abstract deleteCustomer(
    providerCustomerId: string
  ): Promise<PaymentResult<void>>;

  abstract createCheckoutSession(
    params: CreateCheckoutParams
  ): Promise<PaymentResult<CheckoutSession>>;

  abstract getSubscription(
    providerSubscriptionId: string
  ): Promise<PaymentResult<Subscription>>;

  abstract updateSubscription(
    providerSubscriptionId: string,
    params: SubscriptionUpdateParams
  ): Promise<PaymentResult<Subscription>>;

  abstract cancelSubscription(
    providerSubscriptionId: string,
    immediately?: boolean
  ): Promise<PaymentResult<Subscription>>;

  abstract reactivateSubscription(
    providerSubscriptionId: string
  ): Promise<PaymentResult<Subscription>>;

  abstract verifyWebhook(
    payload: string | Buffer,
    signature: string
  ): Promise<PaymentResult<WebhookEvent>>;

  // Optional method - not all providers support this
  createBillingPortalSession?(
    providerCustomerId: string,
    returnUrl: string
  ): Promise<PaymentResult<{ url: string }>>;

  /**
   * Helper to create error result
   */
  protected error<T>(code: string, message: string): PaymentResult<T> {
    return {
      success: false,
      error: { code, message },
    };
  }

  /**
   * Helper to create success result
   */
  protected success<T>(data: T): PaymentResult<T> {
    return {
      success: true,
      data,
    };
  }
}
