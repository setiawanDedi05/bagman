import { messaging } from "./firebase-config";
import { getToken } from "firebase/messaging";

const VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY;

export const requestPermission = async () => {
  console.log("Requesting notification permission...");
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    console.log("Notification permission granted.");
    return getFCMToken();
  } else {
    console.log("Unable to get permission to notify.");
  }
};

export const getFCMToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (currentToken) {
      console.log("FCM Token:", currentToken);
      return currentToken;
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
};
