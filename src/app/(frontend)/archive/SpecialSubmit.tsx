"use client";
import { useAppStore } from "@/app/(frontend)/store/useAppStore";
import { markMultipleDaysAction } from "./markMultipleDaysAction";
import { useEffect } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useFormStatus } from "react-dom";
export default function SpecialSubmit() {
    const dayMark = useAppStore((s) => s.dayMark);
    // @TODO FIX TYPE BELOW
    const initDayMark = useAppStore((s) => s.initDayMark);
    const { pending } = useFormStatus();

    useEffect(() => {
        initDayMark();
    }, [initDayMark]);

    if (!dayMark) {
        return <LoadingSpinner />;
    }

    const actionWithParams = markMultipleDaysAction.bind(null, dayMark.id);

    return (
        <button
            formAction={actionWithParams}
            className="
              w-full py-2 rounded-lg text-white font-medium
              bg-red-600 hover:bg-red-700
              transition-colors shadow-lg
            "
            disabled={pending}
        >
            Mark selected
        </button>
    );
}
