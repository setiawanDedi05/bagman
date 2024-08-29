"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/services/api";
import { messaging, requestFCMToken } from "@/services/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 charachters.",
  }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
    const { username, password } = values;
    try {
      const response = await login(username, password);
      console.log({ response });
      const fcmToken = await requestFCMToken();
      if (fcmToken) {
        console.log({ fcmToken });
      }
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="dedi05" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  prefix=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Don't Overrated, Overthinking and All kind of Over
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
