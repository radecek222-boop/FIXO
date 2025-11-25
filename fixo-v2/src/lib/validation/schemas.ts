import { z } from "zod";

// ==========================================
// COMMON SCHEMAS
// ==========================================

export const IdSchema = z.string().cuid();

export const EmailSchema = z.string().email("Neplatná emailová adresa");

export const UrlSchema = z.string().url("Neplatná URL adresa");

export const DateSchema = z.coerce.date();

// ==========================================
// USER SCHEMAS
// ==========================================

export const UserUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "Jméno musí mít alespoň 2 znaky")
    .max(100, "Jméno je příliš dlouhé")
    .optional(),
  image: UrlSchema.optional().nullable(),
});

export type UserUpdateInput = z.infer<typeof UserUpdateSchema>;

// ==========================================
// ANALYSIS SCHEMAS
// ==========================================

export const AnalyzeRequestSchema = z.object({
  image: z
    .string()
    .min(1, "Obrázek je povinný")
    .refine(
      (val) => {
        // Check if it's a valid base64 image or URL
        return (
          val.startsWith("data:image/") ||
          val.startsWith("http://") ||
          val.startsWith("https://")
        );
      },
      { message: "Neplatný formát obrázku" }
    ),
  description: z
    .string()
    .min(10, "Popis musí mít alespoň 10 znaků")
    .max(1000, "Popis je příliš dlouhý")
    .optional()
    .default(""),
  category: z
    .enum([
      "plumbing",
      "electrical",
      "hvac",
      "structural",
      "appliances",
      "outdoor",
      "other",
    ])
    .optional(),
});

export type AnalyzeRequestInput = z.infer<typeof AnalyzeRequestSchema>;

export const AnalysisResultSchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  confidence: z.number().min(0).max(100),
  riskScore: z.number().min(1).max(10),
  estimatedTime: z.string(),
  difficulty: z.enum(["easy", "medium", "hard", "expert"]),
  steps: z.array(
    z.object({
      step: z.number(),
      action: z.string(),
      time: z.string(),
      icon: z.string().optional(),
      hint: z.string().optional(),
    })
  ),
  tools: z.array(z.string()),
  warnings: z.array(z.string()),
  safetyLevel: z.enum(["safe", "caution", "dangerous"]),
});

export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;

// ==========================================
// REPAIR SCHEMAS
// ==========================================

export const RepairQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().max(100).optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
});

export type RepairQueryInput = z.infer<typeof RepairQuerySchema>;

export const RepairHistoryCreateSchema = z.object({
  repairId: IdSchema.optional(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  aiDiagnosis: z.any().optional(), // JSON
  images: z.array(z.string().url()).max(10).optional(),
});

export type RepairHistoryCreateInput = z.infer<typeof RepairHistoryCreateSchema>;

export const RepairHistoryUpdateSchema = z.object({
  status: z.enum(["IN_PROGRESS", "COMPLETED", "ABANDONED", "CALLED_PRO"]).optional(),
  notes: z.string().max(5000).optional(),
  duration: z.number().min(0).optional(),
  savedAmount: z.number().min(0).optional(),
  rating: z.number().min(1).max(5).optional(),
});

export type RepairHistoryUpdateInput = z.infer<typeof RepairHistoryUpdateSchema>;

// ==========================================
// PAYMENT SCHEMAS
// ==========================================

export const PlanSchema = z.enum(["FREE", "PLUS", "PRO", "LIFETIME"]);

export type Plan = z.infer<typeof PlanSchema>;

export const CheckoutRequestSchema = z.object({
  plan: PlanSchema.exclude(["FREE"]),
  successUrl: UrlSchema.optional(),
  cancelUrl: UrlSchema.optional(),
});

export type CheckoutRequestInput = z.infer<typeof CheckoutRequestSchema>;

// ==========================================
// CONTACT SCHEMAS
// ==========================================

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Jméno je povinné").max(100),
  email: EmailSchema,
  subject: z.string().min(5, "Předmět je povinný").max(200),
  message: z
    .string()
    .min(20, "Zpráva musí mít alespoň 20 znaků")
    .max(5000, "Zpráva je příliš dlouhá"),
  type: z.enum(["general", "support", "business", "bug"]).default("general"),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

// ==========================================
// VALIDATION HELPERS
// ==========================================

/**
 * Safely parse and validate data with Zod schema
 * Returns { success: true, data } or { success: false, errors }
 */
export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, errors: result.error };
}

/**
 * Format Zod errors into a user-friendly object
 */
export function formatZodErrors(error: z.ZodError): Record<string, string[]> {
  const formatted: Record<string, string[]> = {};

  for (const issue of error.errors) {
    const path = issue.path.join(".") || "_root";
    if (!formatted[path]) {
      formatted[path] = [];
    }
    formatted[path].push(issue.message);
  }

  return formatted;
}

/**
 * Get first error message from Zod error
 */
export function getFirstError(error: z.ZodError): string {
  return error.errors[0]?.message || "Neplatná data";
}
