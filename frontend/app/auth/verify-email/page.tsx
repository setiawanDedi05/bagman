"use client";
import { useEffect, useState, Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authService } from "@/services/auth/auth-service";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic"; // Pastikan ini ada untuk rendering dinamis

export default function VerifyEmail() {
  
  const [token, setToken] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    const params = searchParams.get('token');
    setToken(params as string);
    console.log({params, token});
    const verifyEmail = async () => {
      if (!token) {
        setVerificationResult({ success: false, message: "Token is missing." });
        return;
      }

      try {
        const result = await authService.verifyEmail(token);
        // Handle hasil verifikasi
        if (result.status === 200) {
          setVerificationResult({
            success: true,
            message: "Email successfully verified!",
          });
        } else {
          setVerificationResult({
            success: false,
            message: result.data.message,
          });
        }
      } catch (error: any) {
        setVerificationResult({
          success: false,
          message: error.message || "An error occurred.",
        });
      }
    };

    verifyEmail();
  }, [token, searchParams]);

  return (
    <Card className="w-[90%] md:w-[50%]">
      <CardHeader className="text-start">
        <CardTitle>
          {verificationResult
            ? verificationResult.success
              ? "Success"
              : "Failed"
            : "Verifying..."}
        </CardTitle>
        <CardDescription className="text-start">
          {verificationResult
            ? verificationResult.message
            : "Please wait while we verify your email."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {verificationResult && (
          <div>
            {verificationResult.success ? (
              <p>Your email has been successfully verified! 🎉</p>
            ) : (
              <p>Verification failed. Please check your token.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
