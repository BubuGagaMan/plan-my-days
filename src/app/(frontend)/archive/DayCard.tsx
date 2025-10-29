import { Day, DBMarkedDay } from "../home/types/dateTypes";
import { daysOfTheWeek } from "../home/dateMaps";
import { SubmitButton } from "./SubmitButton";

export default function DayCard({ day, isPreview }: { day: Day; isPreview?: boolean }) {
    return (
        <form
            key={day.date}
            className={`
                overflow-hidden
                relative 
                aspect-square
                p-1
                md:p-2
           
                flex flex-col items-center justify-between
                rounded-md 
                transition-all duration-100 ease-in-out
                cursor-pointer
                shadow-sm
                hover:shadow-md
                hover:scale-[1.03]
  
            `}
            style={{
                backgroundColor: day.dayMark ? day.dayMark.background_color : "gray",
                color: day.dayMark ? day.dayMark.font_color : "black",
                //textShadow: "1px 1px 3px black",
            }}
        >
            {/* Light highlight on hover */}
            <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-300 pointer-events-none"></div>

            {/* Date number (top) */}
            <p
                className={`font-semibold  text-[12px] sm:text-[16px]  lg:text-lg

                `}
            >
                {day.date}
            </p>

            {/* Hidden Inputs */}
            <input
                type="hidden"
                name="full-date"
                value={`${day.year}-${day.month}-${day.date < 10 ? "0" + day.date : day.date}`}
            />
            <input type="hidden" name="isMarked" value={day.dayMark ? 1 : 0} />

            {/* Day of week (middle) */}
            <p
                className={` text-[10px] sm:text-sm md:text-base font-medium ${
                    day.isWeekend ? "text-red-700" : day.publicHoliday ? "text-purple-100" : "text-gray-600"
                }`}
                style={{
                    color: day.dayMark && day.dayMark.font_color,
                }}
            >
                {daysOfTheWeek[day.day]}
            </p>
            <p
                className="
                [@media(min-width:280px)]:text-[6px]
                [@media(max-width:500px)]:text-[6px]
                [@media(min-width:500px)]:text-[10px]
                [@media(max-width:820px)]:text-[10px]
                [@media(min-width:820px)]:text-[10px]
            
             text-black font-medium text-center truncate"
            >
                {day.dayMark
                    ? day.dayMark.title
                    : day.isWeekend
                    ? "WEEKEND"
                    : day.publicHoliday
                    ? "PUBLIC HOLIDAY"
                    : "-"}
            </p>
            {/* <h3>notes</h3> */}

            {/* Submit Button (bottom) */}
            {/* <div className="h-full relative bg-red-600 w-full"> */}
            {!isPreview && !day.dayMark &&(
                <div className="absolute w-full h-full top-0 bg-red text-black">
                    <p>see see details</p>
                    <p></p>
                    <SubmitButton isWeekend={day.isWeekend} dayMark={day.dayMark} />
                </div>
            )}

            {/* </div> */}
        </form>
    );
}
