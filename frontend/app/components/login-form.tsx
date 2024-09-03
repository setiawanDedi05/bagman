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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/auth-store";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 charachters.",
  }),
});

function LoginForm() {
  const { setSeason } = useAuthStore();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await authService.login(values);
      if (response.status === 200) {
        toast({
          title: "Authentication Success",
          description: "You Are in the bag",
        });
        setSeason(response.data.user);
        router.push("/protected/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: "credentials not match",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message,
      });
    }
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
        <Button type="submit">Sign In</Button>
      </form>
    </Form>
  );
}

export default function LoginPage() {
  return (
    <Card>
      <CardHeader className="text-start">
        <CardTitle>Login</CardTitle>
        <CardDescription className="text-start">
          Don't Overrated, Overthinking and All kind of Over
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
