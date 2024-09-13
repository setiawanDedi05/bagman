"use client";

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
import { Button } from "@/components/ui/button";
import AddProjectForm from "./components/add-project-form";
import { Suspense, useCallback, useEffect, useState } from "react";
import { projectsService } from "@/services/projects/projects-service";
import { ProjectDTO } from "@/services/dto/project-dto";
import { Owner } from "./components/owner";
import { useRouter } from "next/navigation";

export default function ProjectPage() {
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function fetchData() {
    try {
      const response = await projectsService.allProject();
      setProjects(response.data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const goToDetail = useCallback(
    (id: string) => {
      router.push("/protected/projects/" + id);
    },
    [router]
  );

  return (
    <Suspense fallback={<div>loading</div>}>
      <div className="flex flex-col w-full gap-5">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="self-end">
            <Button variant="outline">Create</Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto">
            <SheetHeader>
              <SheetTitle>Create Project</SheetTitle>
              <SheetDescription>
                Bring Your Ideas to Life: Start Your Project Today!
              </SheetDescription>
            </SheetHeader>
            <AddProjectForm setProjects={setProjects} setOpen={setOpen} />
          </SheetContent>
        </Sheet>
        {!projects.length && (
          <Card>
            <CardHeader>
              <CardTitle>Empty Data</CardTitle>
            </CardHeader>
            <CardContent>Your project data is empty</CardContent>
          </Card>
        )}
        <div className="w-full grid gap-2 lg:grid-cols-2">
          {projects.map((project: ProjectDTO) => {
            return (
              <Card
                key={project.id}
                onClick={() => goToDetail(project.id)}
                className="hover:cursor-pointer hover:bg-slate-300"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Owner data={project.owner} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Suspense>
  );
}
