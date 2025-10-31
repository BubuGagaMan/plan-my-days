"use client"
import { useState } from "react";
import { Day2 } from "../../../utilities/getCalendarMonth";
export default function DayCardForm({day}: {day: Day2}) {
    const [clicked, setClicked] = useState(false)
    return (
        <form
        onClick={() => {setClicked(!clicked)}}
            className={`w-full h-[70%]
            text-xs p-2
            cursor-default 
            bg-black 
            absolute 
            top-0 left-0
            transition-all duration-100 ease-in-out 
            grid gap-2 `}
        >
            <input type="hidden" name="date" value={day.date} />
            <input type="hidden" name="is-marked" value={day.markedDay ? 1 : 0} />
            <button className="cursor-pointer border border-white w-[75%] m-auto">See details</button>
            <button className="cursor-pointer border border-white w-[75%] m-auto" type="submit">
                Mark
            </button>
        </form>
    );
}
// bottom-[-71%] group-hover:bottom-0  group-focus:bottom-0 group-active:bottom-0