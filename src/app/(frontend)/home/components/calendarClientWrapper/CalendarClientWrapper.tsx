// app/home/CalendarClient.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { setCalendarParamsAction } from "./setCalendarParamsAction";
import { LoadingSpinner } from "../LoadingSpinner";

export function CalendarClientWrapper({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const params = useSearchParams();

    useEffect(() => {
        const sp = Object.fromEntries(params.entries());
        const fetchParams = async () => {
            await setCalendarParamsAction(sp);
        };
        fetchParams();
        setIsLoading(false);
    }, [params]);

    if (!isLoading) {
        return <>{children}</>;
    }
    return (
        <div className="w-full h-full flex justify-center items-center">
            <LoadingSpinner />
        </div>
    );
}
