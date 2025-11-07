export type DBDayMark = {
    id: string;
    title: string;
    background_color: string;
    font_color: string;
};

export type DBMarkedDay = {
    id?: string;
    date: string;
    day_mark: DBDayMark;
    user_id?: string;
    notes?: string | null;
    publicHoliday?: string | null;
};

export type PublicHoliday = {
    title: string;
    date: string;
};

export type Day = {
    weekDay: string;
    monthDay: number;
    month: number;
    year: number;
    isFromCurrentMonth: boolean;
    date: string;
    markedDay: DBMarkedDay | null;
    publicHoliday: PublicHoliday | null;
};

export type Month = Day[]

export type Year = Month[]

export type NumberToStringMap = {
    [key: number]: string;
};

export enum CalendarGrid {
    YEAR = "year",
    MONTH = "month",
}

// creating a set is overkill for 2 items... initiating it will cost more
export const CalendarGridArr = [CalendarGrid.MONTH, CalendarGrid.YEAR];


// export type DBDay = {
//     id?: string;
//     off_date: string;
//     user_id?: string;
//     notes?: string | null;
//     publicHoliday?: string | null;
// };

// export type PublicHolidaySeparateDMY = {
//     date: number;
//     year: number;
//     month: number;
//     title: string;
// };

// export type Day = {
//     date: number;
//     day: number;
//     year: number;
//     month: number;
//     isWeekend?: boolean;
//     notes?: string | null;
//     publicHoliday?: PublicHolidaySeparateDMY | null;
//     dayMarkId?: string;
//     dayMark?: DBDayMark;
// };