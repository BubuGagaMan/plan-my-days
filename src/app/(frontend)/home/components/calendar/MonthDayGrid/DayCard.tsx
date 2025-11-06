import MarkDaySubmit from "./MarkDaySubmit";
import { PiPencilLineFill } from "react-icons/pi";
import { Day } from "@/app/types/dateTypes";

import "../styles.css";

export default function DayCard({ day }: { day: Day }) {
    const isWeekend = day.weekDay == "Saturday" || day.weekDay === "Sunday";
    const markedBgColor = day.markedDay ? day.markedDay.day_mark.background_color : "";
    const markedFontColor = day.markedDay ? day.markedDay?.day_mark.font_color : "";
    return (
        <div
            tab-index="0"
            className={`      
                group    
                aspect-square
                transition-all duration-100 ease-in-out
                rounded-[1px]
                hover:filter-[brightness(130%)]
                
                focus:ring-2 focus:ring-blue-200
                hover:ring-1 hover:ring-blue-200
                active:shadow-[inset_0_0_5px_black]
                
                cursor-pointer      
                h-full w-full
                relative 
               
                grid justify-center items-center text-center
                text-xs sm:text-sm md:text-base lg:text-lg font-semibold
                ${
                    // NOTE THE CUSTOM CSS CLASSED BELOW!
                    day.markedDay
                        ? ""
                        : day.publicHoliday
                        ? "public-holiday"
                        : isWeekend
                        ? "weekend-day"
                        : "unmarked-day"
                } 
                ${!day.isFromCurrentMonth && "out-of-month-day"}`}
            style={{
                backgroundColor: day.markedDay ? markedBgColor : "",
                color: day.markedDay ? markedFontColor : "",
            }}
        >
            <div className="grid grid-cols-3 justify-start">
                <span className="col-start-2">{day.monthDay}</span>
                {day.markedDay?.notes ? (
                    <PiPencilLineFill
                        className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4.5 lg:h-4.5"
                        color={day.markedDay ? markedFontColor : "green"}
                    />
                ) : null}
            </div>
            <div
                className="
                min-[500px]:text-[12px] max-[640px]:text-[12px]
                min-[400px]:text-[10px] max-[500px]:text-[10px]
                max-[330px]:text-[8.5px] 
                sm:text-sm 
                md:text-base 
                lg:text-lg
                "
            >
                {day.markedDay
                    ? day.markedDay.day_mark.title
                    : day.publicHoliday
                    ? day.publicHoliday.title
                    : isWeekend
                    ? "WEEKEND"
                    : "-"}
            </div>

            <form
                className="absolute inset-0 w-full 
              transition-all duration-200  
              peer-checked:bottom-0 grid gap-1 justify-center items-center  cursor-default group"
            >
                <input type="hidden" name="date" value={day.date} />
                <input type="hidden" name="is-marked" value={day.markedDay ? 1 : 0} />
                <input type="hidden" name="day-mark-id" value={day.markedDay ? day.markedDay.day_mark.id : ""} />

                <MarkDaySubmit day={day} />
            </form>
        </div>
    );
}
