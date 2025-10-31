import { CalendarGrid, CalendarGridArr } from "@/app/types/dateTypes";
import { UKRegion, UKRegionSet } from "@/app/api/public-holidays/route";

const date = new Date();
// sanitise might be a better name, but didn't want to bother with thinking between sanitise and sanitize
export const coerceMonth = (month: number | undefined, coerce?: boolean) => {
    const valid = date.getMonth();
    if (month !== undefined && Number.isInteger(month) && month >= 0 && month <= 11)
        return coerce ? String(month) : true;
    return coerce ? valid : false;
};

export const coerceYear = (year: number | undefined, coerce?: boolean) => {
    const valid = date.getFullYear();

    if (year !== undefined && Number.isInteger(year) && year >= 0) return coerce ? String(year) : true;
    return coerce ? valid : false;
};

export const coerceRegion = (region: string | undefined, coerce?: boolean) => {
    const valid = UKRegion.ENGLAND;
    if (region && UKRegionSet.has(region)) return coerce ? region : true;
    return coerce ? valid : false;
};

export const coerceCalendarGrid = (gridOption: CalendarGrid | undefined, coerce?: boolean) => {
    const valid = CalendarGrid.MONTH;
    if (gridOption && CalendarGridArr.includes(gridOption)) return coerce ? gridOption : true;
    return coerce ? valid : false;
};
