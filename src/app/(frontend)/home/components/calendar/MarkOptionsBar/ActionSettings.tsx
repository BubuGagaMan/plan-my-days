"use client";

import Toggle from "../../base/Toggle";
import { useAppStore } from "@/app/(frontend)/store/useAppStore";
import { DayActions } from "@/app/(frontend)/store/slices/actionsOptions/actionsOptionsSlice";

interface ToggleProps {
    label: string;
}

export default function ActionSettings({ label }: ToggleProps) {
    const selectedDayAction = useAppStore((s) => s.dayActionsOptions.selectionAction);
    const overwrite = useAppStore((s) => s.overwrite);
    const setOverwrite = useAppStore((s) => s.setOverwrite);

    return (
        <div
            className="
        min-[500px]:text-[12px] max-[640px]:text-[12px]
        min-[400px]:text-[10px] max-[500px]:text-[10px]
        max-[330px]:text-[8.5px] 
        sm:text-sm 
        md:text-base 
        lg:text-lg
        text-white
        "
        >
            <Toggle
                label="Overwrite"
                grid
                onChange={() => {
                    setOverwrite(!overwrite);
                }}
                checked={overwrite && selectedDayAction === DayActions.MARK}
                disabled={selectedDayAction !== DayActions.MARK}
            />
        </div>
    );
}
