import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100">
            <div className="w-64 border-r border-zinc-200/80 backdrop-blur-xl bg-white/70">
                <div className="p-4 border-b border-zinc-200/80">
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-10 w-10 rounded-xl" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                </div>
                <div className="p-4">
                    <Skeleton className="h-4 w-20 mb-4" />
                    <div className="space-y-2">
                        {Array(6)
                            .fill(0)
                            .map((_, i) => (
                                <Skeleton key={i} className="h-8 w-full rounded-lg" />
                            ))}
                    </div>
                    <Skeleton className="h-4 w-20 mt-6 mb-4" />
                    <div className="space-y-2">
                        {Array(3)
                            .fill(0)
                            .map((_, i) => (
                                <Skeleton key={i} className="h-8 w-full rounded-lg" />
                            ))}
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="h-16 border-b border-zinc-200/80 backdrop-blur-xl bg-white/70 p-4">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-32 rounded-lg" />
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-8 w-40 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <Skeleton className="h-8 w-48 mb-2 rounded-lg" />
                            <Skeleton className="h-4 w-64 rounded-lg" />
                        </div>
                        <Skeleton className="h-10 w-32 rounded-lg" />
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <Skeleton className="h-10 w-64 rounded-xl" />
                            <Skeleton className="h-9 w-32 rounded-lg" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {Array(8)
                                .fill(0)
                                .map((_, i) => (
                                    <Skeleton key={i} className="h-64 w-full rounded-xl" />
                                ))}
                        </div>
                    </div>
                    <Skeleton className="h-6 w-32 mb-4 mt-8 rounded-lg" />
                    <Skeleton className="h-64 w-full rounded-xl" />
                </div>
            </div>
        </div>
    )
}
