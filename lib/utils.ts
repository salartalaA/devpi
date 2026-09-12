import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: number) {
  if (status >= 200 && status < 300) {
    return "bg-success/15 text-success";
  }

  if (status >= 300 && status < 400) {
    return "bg-accent-sky/15 text-accent-sky";
  }

  if (status >= 400 && status < 500) {
    return "bg-warning/15 text-warning";
  }

  if (status >= 500) {
    return "bg-destructive/15 text-destructive";
  }

  return "bg-muted text-muted-foreground";
}
