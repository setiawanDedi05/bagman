import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Member } from "./components/member";

export default function ProjectPage() {
  return (
    <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Onboarding Mybank</CardTitle>
          <CardDescription>Onboarding for Mybank</CardDescription>
        </CardHeader>
        <CardContent>
          <Member />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Onboarding Mybank</CardTitle>
          <CardDescription>Onboarding for Mybank</CardDescription>
        </CardHeader>
        <CardContent>
          <Member />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Onboarding Mybank</CardTitle>
          <CardDescription>Onboarding for Mybank</CardDescription>
        </CardHeader>
        <CardContent>
          <Member />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Onboarding Mybank</CardTitle>
          <CardDescription>Onboarding for Mybank</CardDescription>
        </CardHeader>
        <CardContent>
          <Member />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Onboarding Mybank</CardTitle>
          <CardDescription>Onboarding for Mybank</CardDescription>
        </CardHeader>
        <CardContent>
          <Member />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Onboarding Mybank</CardTitle>
          <CardDescription>Onboarding for Mybank</CardDescription>
        </CardHeader>
        <CardContent>
          <Member />
        </CardContent>
      </Card>
    </div>
  );
}
