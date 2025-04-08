import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Otras utilidades que necesites...
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
export function absoluteUrl(path) {
  return `${window.env.NEXT_PUBLIC_APP_URL}${path}`;
}
