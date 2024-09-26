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
import { useCallback, useEffect, useState } from "react";
import { projectsService } from "@/services/projects/projects-service";
import { ProjectDTO } from "@/services/dto/project-dto";
import { Owner } from "./components/owner";
import { useRouter } from "next/navigation";
import { useLoadingStore } from "@/store/loading-store";
import Link from "next/link";

export default function ProjectPage() {
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const { hideLoading, showLoading } = useLoadingStore();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    showLoading();
    try {
      const response = await projectsService.allProject();
      setProjects(response.data);
    } catch (error) {
      throw error;
    }
    hideLoading();
  }, [showLoading, hideLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const goToDetail = useCallback(
    (id: string) => {
      router.push("/protected/projects/" + id);
    },
    [router]
  );

  return (
    <div className="flex flex-col w-full gap-5">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="self-end">
          <Button>Create</Button>
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
      <div className="w-full grid gap-2 mb-[100px] lg:grid-cols-2">
        {projects.map((project: ProjectDTO) => {
          return (
            <Link key={project.id} href={`/protected/projects/${project.id}`}>
              <Card className="hover:cursor-pointer hover:bg-slate-300">
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Owner data={project.owner} />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
