import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, locale: "ar" | "en" = "en") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-IQ" : "en-US", {
    maximumFractionDigits: 0
  }).format(value);
}

export function formatCurrency(value: number, locale: "ar" | "en" = "en") {
  const amount = formatNumber(value, locale);
  return locale === "ar" ? `${amount} د.ع` : `${amount} IQD`;
}

export function formatCompactCurrency(value: number, locale: "ar" | "en" = "en") {
  const amount = new Intl.NumberFormat(locale === "ar" ? "ar-IQ" : "en-US", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);

  return locale === "ar" ? `${amount} د.ع` : `${amount} IQD`;
}
