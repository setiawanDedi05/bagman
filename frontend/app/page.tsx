"use client";

import { messaging } from "@/services/firebase";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const swUrl = `/firebase-messaging-sw.js`;
      navigator.serviceWorker.register(swUrl)
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);

          // Dapatkan token FCM
          getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY })
            .then((currentToken) => {
              if (currentToken) {
                console.log('FCM Token:', currentToken);
              } else {
                console.log('No registration token available.');
              }
            })
            .catch((err) => {
              console.error('An error occurred while retrieving token.', err);
            });

          // Menangani pesan
          onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <h1>Hello</h1>
  );
}
