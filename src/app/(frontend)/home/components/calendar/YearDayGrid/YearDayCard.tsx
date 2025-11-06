import { Day } from "@/app/types/dateTypes";
import MarkDaySubmit from "../MonthDayGrid/MarkDaySubmit";

export default function YearDayCard({ day }: { day: Day }) {
    const isWeekend = day.weekDay == "Saturday" || day.weekDay === "Sunday";
    const markedBgColor = day.markedDay ? day.markedDay.day_mark.background_color : "";
    const markedFontColor = day.markedDay ? day.markedDay?.day_mark.font_color : "";
    return (
        <div
            className={`
                overflow-hidden
                aspect-square
                text-amber-200 
                text-center
                cursor-pointer
                transition-all duration-150
                grid 
                text-[10px]
                sm:text-xs
                justify-center items-center
                rounded-[1px]
                ${ // NOTE THE CUSTOM CSS CLASSES!!!
                    day.markedDay
                        ? ""
                        : day.publicHoliday
                        ? "public-holiday"
                        : isWeekend
                        ? "weekend-day"
                        : "unmarked-day"
                } 
                ${!day.isFromCurrentMonth && "out-of-month-day"}
                            hover:filter-[brightness(130%)]
                
                focus:ring-2 focus:ring-blue-200
                hover:ring-1 hover:ring-blue-200
                active:shadow-[inset_0_0_5px_black]
                relative
                
            `}
            style={{
                backgroundColor: day.markedDay ? markedBgColor : "",
                color: day.markedDay ? markedFontColor : "",
            }}
        >
            <span>{day.monthDay}</span>
            <form
                className="absolute inset-0  w-full 
                          transition-all duration-200  
                          peer-checked:bottom-0 grid gap-1 justify-center items-center  cursor-default"
            >
                <input type="hidden" name="date" value={day.date} />
                <input type="hidden" name="is-marked" value={day.markedDay ? 1 : 0} />
                <input type="hidden" name="day-mark-id" value={day.markedDay ? day.markedDay.day_mark.id : ""} />

                <MarkDaySubmit day={day} small/>
            </form>
        </div>
    );
}
