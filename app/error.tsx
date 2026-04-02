"use client";
import { Frown } from "lucide-react";
import { Button } from "@/src/components/Layout/Button";
import DefaultLayout from "@/src/components/Layout/DefaultLayout";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <DefaultLayout>
            <div className="flex h-screen flex-col items-center justify-center gap-4">
                <div className="flex flex-row items-center gap-2 text-xl text-white">
                    <Frown size={40} />
                    <p>{error.message || "Something went wrong!"}</p>
                </div>
                <Button variant="glass" onClick={reset}>
                    Try Again
                </Button>
            </div>
        </DefaultLayout>
    );
}
