import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 w-full min-h-72"> {/* 18rem = 288px */}
      {/* Image Placeholder */}
      <Skeleton className="h-48 w-full rounded-xl" />

      {/* Title + Price */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}

