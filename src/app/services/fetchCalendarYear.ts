import { getCalendarMonth } from "../utilities/getCalendarMonth";
import { getAllMarkedDays } from "./markedDays.services";
import { getPublicHolidays, UKRegion } from "./publicHolidays.services";

// use other services + logic to construct a calendar year
export const fetchCalendarYear = async (year: number, region: UKRegion) => {
    const publicHolidays = await getPublicHolidays(region);
    const userMarkedDays = await getAllMarkedDays();

    const yearAll = [];
    for (let i = 0; i < 12; i++) {
        const fullMonthCalendar: any = getCalendarMonth(year, i + 1, userMarkedDays || [], publicHolidays);
        yearAll.push(fullMonthCalendar);
    }

    return yearAll;
};
