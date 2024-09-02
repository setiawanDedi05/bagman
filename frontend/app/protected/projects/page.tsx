import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Member } from "./components/member";
import { Button } from "@/components/ui/button";
import AddProjectForm from "./components/add-project-form";

export default function ProjectPage() {
  return (
    <div className="flex flex-col w-full gap-5">
      <Sheet>
        <SheetTrigger className="self-end w-[10em]">
          <Button>Create</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create Project</SheetTitle>
            <SheetDescription>Bring Your Ideas to Life: Start Your Project Today!</SheetDescription>
          </SheetHeader>
          <AddProjectForm />
        </SheetContent>
      </Sheet>
      <div className="w-full grid gap-2 lg:grid-cols-2">
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
    </div>
  );
}
