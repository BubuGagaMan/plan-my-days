"use client";
import { useFormStatus } from "react-dom";
import { deleteDayActionForm } from "../../../../actions/deleteDayMark.action";
import { MdDelete } from "react-icons/md";
import { LoadingSpinner } from "../../../LoadingSpinner";
type DayMarkProp = { id: string; title: string; background_color: string; font_color: string };

export default function DeleteDayMark({ dayMark }: { dayMark: DayMarkProp }) {
    const { pending } = useFormStatus();

    const isDefaultMark = dayMark.title === "OFF-DAY";

    if(pending) {
        return <LoadingSpinner />
    }
    return (
        <form action={deleteDayActionForm}>
            <input type="hidden" name="day-mark-id" value={dayMark.id} />
            <button
                disabled={pending || isDefaultMark}
                type="submit"
                className={` ${isDefaultMark ? "bg-gray-600" : "bg-red-800"} rounded-sm w-full h-full py-2 px-1 ${
                    !isDefaultMark && "cursor-pointer hover:bg-red-900 focus:bg-red-700"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <MdDelete size={16} color={"white"} />
            </button>
        </form>
    );
}
