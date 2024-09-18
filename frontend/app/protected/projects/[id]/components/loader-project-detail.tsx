import { Skeleton } from "@/components/ui/skeleton";

export default function LoaderProjectDetail() {
  return (
    <div className="w-full flex flex-col gap-5">
      <Skeleton className="h-[30px] w-[50%] rounded-xl" />
      <div className="flex justify-between">
        <Skeleton className="h-[30px] w-[50%] rounded-xl" />
        <div className="flex gap-5 w-[30%]">
          <Skeleton className="h-[30px] w-[50%] rounded-xl" />
          <Skeleton className="h-[30px] w-[50%] rounded-xl" />
        </div>
      </div>
      <Skeleton className="h-[300px] w-full rounded-xl" />
    </div>
  );
}
