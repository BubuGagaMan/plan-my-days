import { isLeapYear } from "./isLeapYear";

export const getMonthEnd = (year: number, month: number) => {
    switch (month) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            return 31;

        case 1: {
            if (isLeapYear(year)) return 29;
            return 28;
        }
        default:
            return 30;
    }
};
