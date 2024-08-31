"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VerificationRequestPage() {
  return (
    <Card className="w-[90%] md:w-[50%]">
      <CardHeader className="text-start">
        <CardTitle>Please Verify Your Email Address!</CardTitle>
        <CardDescription className="text-start">
          To complete your registration and activate your account, we need to
          verify your email address.
        </CardDescription>
      </CardHeader>
      <CardContent>
        A verification link has been sent to your email. Please check your inbox
        (and your spam/junk folder just in case) and click the link to verify
        your email. Thank you for helping us keep your account secure!
      </CardContent>
    </Card>
  );
}
