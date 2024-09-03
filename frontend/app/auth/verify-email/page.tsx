import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authService } from "@/services/auth/auth-service";
import { Suspense } from "react";

export default async function VerifyEmail({ searchParams }: { searchParams: { token: string } }) {
  const token = searchParams.token;

  if (!token) {
    return (
      <Card className="w-[90%] md:w-[50%]">
        <CardHeader className="text-start">
          <CardTitle>Email Successfully Verified!</CardTitle>
          <CardDescription className="text-start">
            Thank you for verifying your email address! 🎉
          </CardDescription>
        </CardHeader>
        <CardContent>
          Your account is now fully activated, and you can start exploring all
          the features we offer. If you have any questions or need further
          assistance, feel free to visit our Help Center or contact our support
          team. Welcome to the bag!
        </CardContent>
      </Card>
    );
  }

  const response = await authService.verifyEmail(token);
  if (response.status === 200) {
    return (
      <Card className="w-[90%] md:w-[50%]">
        <CardHeader className="text-start">
          <CardTitle>Email Successfully Verified!</CardTitle>
          <CardDescription className="text-start">
            Thank you for verifying your email address! 🎉
          </CardDescription>
        </CardHeader>
        <CardContent>
          Your account is now fully activated, and you can start exploring all
          the features we offer. If you have any questions or need further
          assistance, feel free to visit our Help Center or contact our support
          team. Welcome to the bag!
        </CardContent>
      </Card>
    );
  }

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Card className="w-[90%] md:w-[50%]">
        <CardHeader className="text-start">
          <CardTitle>Email Successfully Verified!</CardTitle>
          <CardDescription className="text-start">
            Thank you for verifying your email address! 🎉
          </CardDescription>
        </CardHeader>
        <CardContent>
          Your account is now fully activated, and you can start exploring all
          the features we offer. If you have any questions or need further
          assistance, feel free to visit our Help Center or contact our support
          team. Welcome to the bag!
        </CardContent>
      </Card>
    </Suspense>
  );
}
