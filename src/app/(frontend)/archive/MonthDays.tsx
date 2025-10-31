import { Day, DBMarkedDay } from "../../types/dateTypes";
import DayCard from "./DayCard";

export default function MonthDays({ monthMap }: { monthMap: Day[] }) {
    return (
        <div className={`grid gap-1 md:gap-2 w-full grid-cols-7`}>
            {monthMap.map((day: DBMarkedDay | Day) => (
                <DayCard key={day.date} day={day} />
            ))}
        </div>
    );
}
