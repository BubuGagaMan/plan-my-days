import { Day, Month } from "@/app/types/dateTypes";
import DayCard from "./DayCard";
import WeekDayHeader from "./WeekDayHeader";

export default function MonthDayGrid({ monthDaysArr }: { monthDaysArr: Month }) {

    return (
        <>
            <div className="grid gap-0.5 sm:gap-1 md:gap-1.5 w-full grid-cols-7  bg-neutral-800 ">
                <WeekDayHeader />
            </div>
            <div className="grid gap-0.5 sm:gap-1 md:gap-1.5 w-full h-full grid-cols-7 [grid-template-columns:repeat(7,minmax(0px,1fr))]  bg-neutral-800" tabIndex={0}>
   
                {monthDaysArr.map((day: Day) => {
                    return <DayCard key={day.date} day={day} />;
                })}
            </div>
        </>
    );
}
