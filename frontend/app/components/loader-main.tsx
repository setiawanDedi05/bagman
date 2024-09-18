import { Skeleton } from "@/components/ui/skeleton";

export default function LoaderMain() {
  return (
    <div className="justify-center items-center w-full flex flex-col lg:flex-row lg:justify-around lg:align-middle gap-5">
      <div className="w-full lg:w-[50%] flex flex-col justify-center items-center gap-5">
        <Skeleton className="h-[30px] w-[80%]" />
        <Skeleton className="h-[30px] w-[30%]" />
        <Skeleton className="h-[100px] w-[80%]" />
      </div>
      <div className="w-[80%] lg:w-[50%] flex mt-10 justify-center">
        <Skeleton className="h-[300px] w-full lg:w-[80%]" />
      </div>
    </div>
  );
}
