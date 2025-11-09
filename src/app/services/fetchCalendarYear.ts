import { Month, Year } from "../types/dateTypes";
import { getCalendarMonth } from "../utilities/getCalendarMonth";
import { getAllMarkedDays } from "./markedDays.services";
import { getPublicHolidays } from "./publicHolidays.services";
import { UKRegion } from "../types/publicHolidays.types";

// use other services + logic to construct a calendar year
export const fetchCalendarYear = async (year: number, region: UKRegion): Promise<Year> => {
    const publicHolidays = await getPublicHolidays(region);
    const userMarkedDays = await getAllMarkedDays();

    const yearDays = [];
    for (let i = 0; i < 12; i++) {
        const monthDays: Month = getCalendarMonth(year, i + 1, userMarkedDays || [], publicHolidays);
        yearDays.push(monthDays);
    }

    return yearDays;
};
