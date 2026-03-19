export default function MovieCardSkeleton() {
    return (
        <div className="flex animate-pulse flex-col overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="aspect-2/3 w-full bg-gray-200 dark:bg-gray-800" />
            <div className="flex flex-col gap-3 p-4">
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="mt-2 h-9 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
            </div>
        </div>
    );
}
