"use client";
import React, { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginPage from "./components/login-form";
import RegisterPage from "./components/register-form";
import LoaderMain from "./components/loader-main";

const HomePage = () => {
  return (
    <Suspense fallback={<LoaderMain />}>
      <div className="text-center p-[50px] flex flex-col lg:flex-row lg:justify-around lg:align-middle">
        <div className="w-full lg:w-[50%] flex flex-col justify-center align-middle">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to Bagman
          </h1>
          <p>Organize Todays, Achieve Tomorrow</p>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            In a world filled with endless to-dos, our task management app helps
            you cut through the noise. With intuitive tools for organizing your
            tasks, you can focus on what truly matters and set yourself up for
            success. Achieve more every day by turning todays plans into
            tomorrows accomplishments..
          </p>
        </div>
        <div className="flex mt-10 justify-center">
          <Tabs defaultValue="sign-in" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <LoginPage />
            </TabsContent>
            <TabsContent value="sign-up">
              <RegisterPage />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Suspense>
  );
};

export default HomePage;
