"use client";

import { useAppStore } from "@/app/(frontend)/store/useAppStore";
import { Day2 } from "../../../../../utilities/getCalendarMonth";
import MarkFromToSubmit from "./MarkFromToSubmit";
import Link from "next/link";
import SingleMarkDaySubmit from "./SingleMarkDaySubmit";
import { DayActions, DayActionsQuantity } from "@/app/(frontend)/store/slices/actionsOptions/actionsOptionsSlice";

export default function MarkDaySubmit({ day, small }: { day: Day2, small?: boolean }) {
    const selectedDayMark = useAppStore((s) => s.dayMark);
    const activeDayAction = useAppStore((s) => s.dayActionsOptions.selectionAction);
    const activeDayActionQuantity = useAppStore((s) => s.dayActionsOptions.selectionQuantity);

    const overwrite = useAppStore((s) => s.overwrite);

    if (activeDayAction === DayActions.SEE_DETAILS) {
        return (
            // @TODO - fix this disgusting mess
                <Link className="                        group
                        absolute inset-0
                        cursor-pointer   text-white
                        active:bg-[rgba(0,0,0,5)]
                        min-[500px]:text-[12px] max-[640px]:text-[12px]
                        min-[400px]:text-[10px] max-[500px]:text-[10px]
                        max-[330px]:text-[8.5px] 
                        sm:text-sm 
                        md:text-base
                        transition-all duration-200 
                        blur-[3rem]  hover:blur-none
                        group-hover:opacity-[1] bg-[rgba(0,0,0,0.65)] text-center grid items-center justify-center
                        opacity-0" href={`/home/day/${day.date}/details/`}>SEE DETAILS</Link>
            // </div>
        );
    }

    if (activeDayActionQuantity === DayActionsQuantity.SINGLE) {
        return (
            <SingleMarkDaySubmit
                day={day}
                clear={activeDayAction === DayActions.CLEAR}
                overwrite={overwrite}
                selectedDayMark={selectedDayMark}
                small={small}
            />
        );
    }

    if (activeDayActionQuantity === DayActionsQuantity.RANGE) {
        return (
            <MarkFromToSubmit
                date={day.date}
                selectedDayMark={selectedDayMark}
                clear={activeDayAction === DayActions.CLEAR}
                overwrite={overwrite}
                small={small}
            />
        );
    }
}
