import { daysOfTheWeek } from "../maps/dateMaps";
import { Day, DBMarkedDay, PublicHoliday } from "../types/dateTypes";
import { getMonthEnd } from "./getMonthEnd";

export const getCalendarMonth = (
    year: number,
    month: number,
    markedDays: DBMarkedDay[],
    publicHolidays: PublicHoliday[]
): Day[] => {
    const zeroIndexMonth = month - 1;

    const lastMonthDay = getMonthEnd(year, zeroIndexMonth);

    const hasPrevMonth = zeroIndexMonth - 1 > -1 ? true : false;

    const prevLastDayArgs = {
        year: hasPrevMonth ? year : year - 1,
        month: hasPrevMonth ? month - 1 : 12,
    };
    const prevLastDay = getMonthEnd(prevLastDayArgs.year, prevLastDayArgs.month - 1);

    const monthStart = new Date(year, zeroIndexMonth, 1);
    const monthEnd = new Date(year, zeroIndexMonth, lastMonthDay);

    let startWeekDay = monthStart.getDay();
    let endWeekDay = monthEnd.getDay();

    const startWeekDayChecked = startWeekDay !== 0 ? startWeekDay : 7;

    const result = [];

    // days before FROM MONDAY, before start of current month (if any)
    for (let i = 1; i < startWeekDayChecked; i++) {
        const dayDiff = startWeekDayChecked - i - 1;

        // pre-declare date elements to build the date string for immediately adding it to the object
        const monthDay = prevLastDay - dayDiff;
        const month = prevLastDayArgs.month;
        const year = prevLastDayArgs.year;

        const date = `${year}-${String(month).padStart(2, "0")}-${String(monthDay).padStart(2, "0")}`;
        const publicHoliday = publicHolidays.find((pHoliday: PublicHoliday) => pHoliday.date === date) || null;
        const markedDay = markedDays.find((markedDay: DBMarkedDay) => markedDay.date === date) || null;

        const dayObject: Day = {
            weekDay: daysOfTheWeek[i],
            monthDay,
            month,
            year,
            isFromCurrentMonth: false,
            date,
            publicHoliday,
            markedDay,
        };

        result.push(dayObject);
    }

    // days of current month
    // use the function params for year/month
    for (let i = 1; i <= lastMonthDay; i++) {
        const monthDay = i;

        const date = `${year}-${String(month).padStart(2, "0")}-${String(monthDay).padStart(2, "0")}`;

        const publicHoliday = publicHolidays.find((pHoliday: PublicHoliday) => pHoliday.date === date) || null;
        const markedDay = markedDays.find((markedDay: DBMarkedDay) => markedDay.date === date) || null;

        const dayObject: Day = {
            weekDay: daysOfTheWeek[startWeekDay],
            monthDay,
            month,
            year,
            isFromCurrentMonth: true,
            date,
            publicHoliday,
            markedDay,
        };

        result.push(dayObject);

        if (startWeekDay < 6) {
            startWeekDay++;
        } else {
            startWeekDay = 0;
        }
    }

    const nextMonthExists = zeroIndexMonth + 1 > 11 ? false : true;

    // days TO SUNDAY after current month (if any)
    for (let i = 1; endWeekDay < 7 && endWeekDay > 0; i++) {
        endWeekDay++;

        const monthDay = i;
        const monthNext = nextMonthExists ? month + 1 : 1;
        const yearOrNext = nextMonthExists ? year : year + 1;

        const date = `${yearOrNext}-${String(monthNext).padStart(2, "0")}-${String(monthDay).padStart(2, "0")}`;

        const publicHoliday = publicHolidays.find((pHoliday: PublicHoliday) => pHoliday.date === date) || null;
        const markedDay = markedDays.find((markedDay: DBMarkedDay) => markedDay.date === date) || null;

        // execute sunday here to avoid having to deal with 0 for weekDay (as Date().getDay() === 0 for sundays)
        if (endWeekDay === 7) {
            const date = `${yearOrNext}-${String(monthNext).padStart(2, "0")}-${String(monthDay).padStart(2, "0")}`;

            const publicHoliday = publicHolidays.find((pHoliday: PublicHoliday) => pHoliday.date === date) || null;
            const markedDay = markedDays.find((markedDay: DBMarkedDay) => markedDay.date === date) || null;

            const sundayObject: Day = {
                weekDay: daysOfTheWeek[0],
                monthDay: monthDay,
                month: monthNext,
                year: yearOrNext,
                isFromCurrentMonth: false,
                date,
                publicHoliday,
                markedDay,
            };
            result.push(sundayObject);
            return result;
        }

        const dayObject: Day = {
            weekDay: daysOfTheWeek[endWeekDay],
            monthDay,
            month: monthNext,
            year: yearOrNext,
            isFromCurrentMonth: false,
            date,
            publicHoliday,
            markedDay,
        };

        result.push(dayObject);
    }

    // console.log("GET FULL CALENDAR", result);
    return result;
    // const startDate = date
};
