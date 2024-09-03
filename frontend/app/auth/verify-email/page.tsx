"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authService } from "@/services/auth/auth-service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  const goToSignIn = () => {
    router.push("/");
  };

  const verifyEmail = async () => {
    try {
      const respose = await authService.verifyEmail(token ?? "");
      console.log({ respose });
      if (respose.status === 200) {
        setIsValid(true);
      }
    } catch (error) {
      setIsValid(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [verifyEmail]);

  return isValid ? (
    <Card className="w-[90%] md:w-[50%]">
      <CardHeader className="text-start">
        <CardTitle>Email Successfully Verified!</CardTitle>
        <CardDescription className="text-start">
          Thank you for verifying your email address! 🎉
        </CardDescription>
      </CardHeader>
      <CardContent>
        Your account is now fully activated, and you can start exploring all the
        features we offer. If you have any questions or need further assistance,
        feel free to visit our Help Center or contact our support team. Welcome
        to the bag!
      </CardContent>
      <CardFooter>
        <Button onClick={goToSignIn}>Sign In</Button>
      </CardFooter>
    </Card>
  ) : (
    <Card className="w-[90%] md:w-[50%]">
      <CardHeader className="text-start">
        <CardTitle>Email Verification Unsuccessful</CardTitle>
        <CardDescription className="text-start">
          Oops! It seems there was an issue verifying your email address.
        </CardDescription>
      </CardHeader>
      <CardContent>
        Please try again by clicking the verification link sent to your inbox.
      </CardContent>
    </Card>
  );
}
