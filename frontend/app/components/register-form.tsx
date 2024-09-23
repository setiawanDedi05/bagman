"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "@/services/auth/auth-service";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "@/store/loading-store";

const formSchema = z.object({
  email: z.string().email({ message: "email must be using email format" }),
  username: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 charachters.",
  }),
  name: z.string().min(4, {
    message: "name must be at least 4 charachters.",
  }),
});

function RegisterForm() {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoadingStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    showLoading();
    try {
      const response = await authService.register(values);
      if (response.status === 201) {
        toast({
          title: "Registration Success",
          description: "Welcome to the bag",
        });
        router.push("/auth/verification-request");
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: "credentials not match",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error?.response?.data?.message || error?.message,
      });
    }
    hideLoading();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-start"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start items-start">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="example username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start items-start">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="example name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start items-start">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-start items-start">
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
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  );
}

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-start">Register</CardTitle>
        <CardDescription className="text-start">
          You are Awesome, Chill and Love your self
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
