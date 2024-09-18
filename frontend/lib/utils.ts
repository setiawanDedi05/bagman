import { fetchToken } from "@/firebase";
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

export async function getNotificationPermissionAndToken() {
  // Step 1: Check if Notifications are supported in the browser.
  if (!("Notification" in window)) {
    console.info("This browser does not support desktop notification");
    return null;
  }

  // Step 2: Check if permission is already granted.
  if (Notification.permission === "granted") {
    return await fetchToken();
  }

  // Step 3: If permission is not denied, request permission from the user.
  if (Notification.permission !== "denied") {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      return await fetchToken();
    }
  }

  console.log("Notification permission not granted.");
  return null;
}
