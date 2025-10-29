import { Day, DBDay, DBMarkedDay, PublicHoliday, PublicHolidaySeparateDMY } from "../home/types/dateTypes";
import { getMonthEnd } from "../home/utilities/getMonthEnd";


export function generateCalendarMonth(
    year: number,
    month: number,
    markedDays: DBMarkedDay[],
    publicHolidays: PublicHoliday[]
) {
    const date = new Date(`${year}-${month}-1`);
    const monthEnd = getMonthEnd(year, month - 1);
    let day = date.getDay();
    const daysArr: Day[] = [];

    for (let i = 1; i <= monthEnd; i++) {
        const isWeekend = day == 0 || day == 6;
        // let isOffDay = isWeekend;

        daysArr.push({ year, month, date: i, day, isWeekend });
        day = day + 1 < 7 ? day + 1 : 0;
    }

    const currentMarkedDays: any = markedDays.map((markedDay: DBMarkedDay) => {
        // db day id -> "dd-mm-yyy"
        const fullDateArr = markedDay.date.split("-");

        return {
            ...markedDay,
            // former date in markedDay to be replaced
            date: Number(fullDateArr[2]),
            month: Number(fullDateArr[1]),
            year: Number(fullDateArr[0]),
        };
    });

    const publicHolidaysMap: PublicHolidaySeparateDMY[] = publicHolidays.map((pHoliday: PublicHoliday) => {
        const fullDateArr = pHoliday.date.split("-");
        return {
            date: Number(fullDateArr[2]),
            month: Number(fullDateArr[1]),
            year: Number(fullDateArr[0]),
            title: pHoliday.title,
        };
    });
    // tested this functionality with sets - it seems like the array are too small
    // and the setup costs for sets/maps outweight their benefits, even if I set 1000 off days and 500 public holidays
    const daysArrWithOffDays = daysArr.map((day: Day) => {
        const markedDayMatch = currentMarkedDays.find((currentMarkedDay: any) => {
            return (
                day.year === currentMarkedDay.year &&
                day.month === currentMarkedDay.month &&
                day.date === currentMarkedDay.date
            );
        });
        if (markedDayMatch) {
            return {...day, markedDayId: markedDayMatch.id, dayMark: markedDayMatch.day_mark};
        }
        const publicHolidayMatch = publicHolidaysMap.find((pHoliday: any) => {
            return day.year === pHoliday.year && day.month === pHoliday.month && day.date === pHoliday.date;
        });
        if (publicHolidayMatch) {
            return { ...day, publicHoliday: publicHolidayMatch };
        }
        return day;
    });
    return daysArrWithOffDays;
}
