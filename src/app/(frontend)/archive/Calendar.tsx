import MonthDays from "./MonthDays";
import { generateCalendarMonth } from "./generateCalendarMonth";
import { fetchOffDays } from "./offDays";
import { CalendarHeader } from "../home/components/calendar/header/CalendarHeader";
import { getPublicHolidays, UKRegion, UKRegionSet } from "../../services/publicHolidays.services";
import { getAllMarkedDays } from "../../services/markedDays.services";
import { getAllDayMarks } from "../../services/dayMarks.services";
import { DayMarkOption } from "../home/components/calendar/header/markPicker/DayMarkPicker";
import MarkOptionsBar from "../home/components/calendar/MarkOptionsBar/MarkOptionsBar";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Calendar({ searchParams }: Props) {
    // lift up...
    const queryParams = await searchParams;
    const date = new Date();
    const yearParam = isNaN(Number(queryParams.year)) ? date.getFullYear() : Number(queryParams.year);
    const monthParam = isNaN(Number(queryParams.month)) ? date.getMonth() : Number(queryParams.month);
    const regionParam =
        typeof queryParams.region === "string" && UKRegionSet.has(queryParams.region)
            ? (queryParams.region as UKRegion)
            : UKRegion.ENGLAND;

    const publicHolidays = await getPublicHolidays(regionParam as UKRegion);
    const userOffDays = await fetchOffDays();
    const userMarkedDays = await getAllMarkedDays();
    const userDayMarks: DayMarkOption[] | null = await getAllDayMarks();

    const monthMap = generateCalendarMonth(yearParam, monthParam + 1, userMarkedDays, publicHolidays);
    // console.log(monthMap)

    return (
        <div className="grid justify-center mx-auto ">
            <CalendarHeader
                year={yearParam}
                month={monthParam}
                toPath="/home"
                region={regionParam}
            />
            <MarkOptionsBar markOptions={userDayMarks} />
            <MonthDays monthMap={monthMap} />
        </div>
    );
}
