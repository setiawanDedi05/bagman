import { fetchToken } from "@/firebase";
import {
  LabelTaskEnum,
  PriorityTaskEnum,
  StatusTaskEnum,
} from "@/services/dto/task-dto";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function MapperLabel(label: string) {
  switch (label) {
    case LabelTaskEnum.FEATURE:
      return "primary";
    case LabelTaskEnum.BUG:
      return "danger";
    default:
      return "secondary";
  }
}

export function MapperPriority(priority: string) {
  switch (priority) {
    case PriorityTaskEnum.LOW:
      return "primary";
    case PriorityTaskEnum.HIGH:
      return "danger";
    default:
      return "secondary";
  }
}

export function MapperStatus(status: string) {
  switch (status) {
    case StatusTaskEnum.ONPROGRESS:
      return "primary";
    case StatusTaskEnum.DONE:
      return "danger";
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
