import { Skeleton } from "@/components/ui/skeleton";

export default function LoaderProject() {
  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="flex flex-col space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}
