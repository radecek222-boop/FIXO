import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price with currency
 */
export function formatPrice(
  amount: number,
  currency: string = "CZK",
  locale: string = "cs-CZ"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format duration in minutes to human readable string
 */
export function formatDuration(minutes: number, locale: string = "cs"): string {
  if (minutes < 60) {
    return locale === "cs" ? `${minutes} min` : `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (locale === "cs") {
    return mins > 0 ? `${hours} hod ${mins} min` : `${hours} hod`;
  }
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Get risk level color class
 */
export function getRiskColor(score: number): string {
  if (score <= 3) return "risk-low";
  if (score <= 6) return "risk-medium";
  return "risk-high";
}

/**
 * Get risk level label
 */
export function getRiskLabel(score: number, locale: string = "cs"): string {
  const labels = {
    cs: { low: "Nízké", medium: "Střední", high: "Vysoké" },
    en: { low: "Low", medium: "Medium", high: "High" },
  };
  const l = labels[locale as keyof typeof labels] || labels.cs;
  if (score <= 3) return l.low;
  if (score <= 6) return l.medium;
  return l.high;
}

/**
 * Get difficulty badge color
 */
export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    VERY_EASY: "bg-green-100 text-green-700",
    EASY: "bg-green-100 text-green-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    HARD: "bg-orange-100 text-orange-700",
    EXPERT: "bg-red-100 text-red-700",
  };
  return colors[difficulty] || "bg-gray-100 text-gray-700";
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncate text with ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

/**
 * Generate slug from string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Format date
 */
export function formatDate(
  date: Date | string,
  locale: string = "cs-CZ"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(
  date: Date | string,
  locale: string = "cs"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (locale === "cs") {
    if (minutes < 1) return "právě teď";
    if (minutes < 60) return `před ${minutes} min`;
    if (hours < 24) return `před ${hours} hod`;
    if (days < 7) return `před ${days} dny`;
    return formatDate(d, "cs-CZ");
  }

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(d, "en-US");
}

/**
 * Calculate savings percentage
 */
export function calculateSavings(diyCost: number, proCost: number): number {
  if (proCost <= 0) return 0;
  return Math.round(((proCost - diyCost) / proCost) * 100);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if we're on the client side
 */
export const isClient = typeof window !== "undefined";

/**
 * Check if the app is running as PWA
 */
export function isPWA(): boolean {
  if (!isClient) return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true
  );
}
