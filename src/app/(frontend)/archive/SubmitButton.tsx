"use client";

import { usePathname } from "next/navigation";
import { actionDayOff } from "./offDaysActions";
import { useFormStatus } from "react-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useAppStore } from "@/app/(frontend)/store/useAppStore";
import { DBDayMark } from "../../types/dateTypes";
import { useEffect } from "react";

type Props = {
    isOffDay?: boolean;
    isWeekend?: boolean;
    isPublicHoliday?: boolean;
    dayMark?: DBDayMark;
};

export function SubmitButton({ isOffDay, isWeekend, isPublicHoliday, dayMark }: Props) {
    const pickedDayMark = useAppStore((s) => s.dayMark);
    const { pending } = useFormStatus();

    const pathname = usePathname();

    /* Bind the pathname to the actionDayOff server action 
    - in order to retain the path params after the request and path is refreshed
  */

    // useEffect(() => {}, [pickedDayMark]);
    if (!pickedDayMark) {
        return <LoadingSpinner />;
    }
    const actionWithParams = actionDayOff.bind(null, pathname, pickedDayMark);

    return (
        <button
            type="submit"
            formAction={actionWithParams}
            disabled={pending} // disables button during loading
            className={`
              w-full h-full cursor-pointer flex items-center justify-center


              ${
                  isOffDay
                      ? "hover:bg-gradient-to-br hover:from-green-500 hover:via-green-800 hover:to-green-900"
                      : isPublicHoliday
                      ? "hover:bg-gradient-to-br hover:from-purple-300 hover:via-purple-600 hover:to-purple-800"
                      : isWeekend
                      ? "hover:bg-gradient-to-br hover:from-amber-100 hover:via-amber-400 hover:to-amber-500"
                      : "hover:bg-gradient-to-br hover:from-white via-gray-200 hover:to-gray-300 "
              }
               ${
                   pending && isOffDay
                       ? "bg-gradient-to-br from-green-500 via-green-800 to-green-900 cursor-wait"
                       : pending && !isOffDay
                       ? "bg-gradient-to-br from-white via-gray-200 to-gray-300 border-gray-300"
                       : ""
               }
              text-transparent hover:text-black
               `}
        >
            {pending ? (
                <LoadingSpinner />
            ) : (
                <span className="text-sm ">
                    {dayMark ? (
                        "Remove mark"
                    ) : (
                        <>
                            Mark as <br /> {pickedDayMark.title}
                        </>
                    )}
                </span>
            )}
        </button>
    );
}
