import { CalendarHeader } from "./header/CalendarHeader";
import MarkOptionsBar from "./MarkOptionsBar/MarkOptionsBar";
import YearDaysGrid from "./YearDayGrid/YearDaysGrid";
import MonthDayGrid from "./MonthDayGrid/MonthDayGrid";
import { fetchCalendarYear } from "@/app/services/fetchCalendarYear";
import { getAllDayMarks } from "@/app/services/dayMarks.services";
import { UKRegion,  UKRegionSet } from "@/app/types/publicHolidays.types";
import { CalendarGrid, CalendarGridArr } from "@/app/types/dateTypes";

type Props = {
    SP: { [key: string]: string | string[] | undefined };
};

export default async function Calendar({ SP }: Props) {
    const regionParam =
        typeof SP.region === "string" && UKRegionSet.has(SP.region) ? (SP.region as UKRegion) : UKRegion.ENGLAND;

    const calendarGridParam =
        typeof SP["calendar-grid"] === "string" && CalendarGridArr.includes(SP["calendar-grid"] as CalendarGrid)
            ? (SP["calendar-grid"] as CalendarGrid)
            : CalendarGrid.MONTH;

    const date = new Date();
    const yearParam = isNaN(Number(SP.year)) ? date.getFullYear() : Number(SP.year);
    const monthParam = isNaN(Number(SP.month)) ? date.getMonth() : Number(SP.month);

    const [userDayMarks, fullYearCalendar] = await Promise.all([
        getAllDayMarks(),
        fetchCalendarYear(yearParam, regionParam),
    ]);

    return (
        <div className="max-w-200 m-auto">
            <CalendarHeader
                month={monthParam}
                year={yearParam}
                toPath="/home"
                region={regionParam}
                calendarGrid={calendarGridParam}
            />
            <MarkOptionsBar markOptions={userDayMarks} />

            {calendarGridParam === CalendarGrid.MONTH ? (
                <MonthDayGrid monthDaysArr={fullYearCalendar[monthParam]} />
            ) : (
                <YearDaysGrid yearCalendar={fullYearCalendar} />
            )}
        </div>
    );
}
