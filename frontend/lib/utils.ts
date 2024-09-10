import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapperLabelBadge(label?: string) {
  switch (label) {
    case "bug":
      return "destructive";
    case "documentation":
      return "outline";
    default:
      return "secondary";
  }
}

export function mapperPriorityBadge(priority?: string) {
  switch (priority) {
    case "high":
      return "destructive";
    case "low":
      return "outline";
    default:
      return "secondary";
  }
}
