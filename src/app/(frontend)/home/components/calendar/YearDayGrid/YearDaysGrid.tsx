import WeekDayHeader from "../MonthDayGrid/WeekDayHeader";
import { monthsOfTheYear } from "@/app/maps/dateMaps";
import { Day, Year } from "@/app/types/dateTypes";
import YearDayCard from "./YearDayCard";

export default async function YearDaysGrid({ yearCalendar }: { yearCalendar: Year }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5  items-start  bg-neutral-800/80 p-1">
            {yearCalendar.map((month, index) => {
                return (
                    <div key={monthsOfTheYear[index]} className="grid gap-0.5">
                        <h3 className="bg-red-800/80 text-white px-1 py-0.5 rounded-t-sm">{monthsOfTheYear[index]}</h3>

                        <div
                            className=" grid
                            grid-cols-7 gap-0.5"
                        >
                            <WeekDayHeader small />
                            {month.map((day: Day) => {
                                return <YearDayCard key={day.date} day={day} />;
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
