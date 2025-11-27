import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 w-full min-h-72 bg-gray-50 dark:bg-transparent p-2 rounded-xl border border-gray-200 dark:border-none">
      
      {/* Image Placeholder */}
      <Skeleton className="h-48 w-full rounded-xl bg-gray-200 dark:bg-gray-800" />

      {/* Title + Price */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
      </div>

    </div>
  )
}
