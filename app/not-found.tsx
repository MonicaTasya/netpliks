import { Frown } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-white">
            <div className="flex flex-row items-center gap-1">
                <Frown size={60} />
                <h1 className="text-6xl font-bold">404</h1>
            </div>
            <p className="text-xl">Page Not Found</p>
        </div>
    );
}
