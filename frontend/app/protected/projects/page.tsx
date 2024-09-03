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
import { useEffect, useState } from "react";
import { projectsService } from "@/services/projects/projects-service";
import { ProjectDTO } from "@/services/dto/project-dto";
import { Owner } from "./components/owner";

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
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
  return (
      <div className="flex flex-col w-full gap-5">
        <Sheet>
          <SheetTrigger className="self-end w-[10em]">
            <Button>Create</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create Project</SheetTitle>
              <SheetDescription>
                Bring Your Ideas to Life: Start Your Project Today!
              </SheetDescription>
            </SheetHeader>
            <AddProjectForm />
          </SheetContent>
        </Sheet>
        <div className="w-full grid gap-2 lg:grid-cols-2">
          {projects.map((project: ProjectDTO) => {
            return (
              <Card key={project.id}>
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
  );
}
