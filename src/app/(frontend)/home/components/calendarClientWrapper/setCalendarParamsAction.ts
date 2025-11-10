"use server";

import { cookies } from "next/headers";
import { UKRegion } from "@/app/types/publicHolidays.types";
import { coerceCalendarGrid, coerceMonth, coerceRegion, coerceYear } from "@/app/utilities/validators/validateCalendarParams";
import { CalendarGrid } from "@/app/types/dateTypes";
import { redirect } from "next/navigation";

type searchParams = {
    month: string;
    year: string;
    region: string;
    "calendar-grid": string;
};

type calendarParam = "month" | "year" | "region" | "calendar-grid"

type CalendarParams = {
    [key in calendarParam]: {
        cookie?: string;
        searchParam?: string;
        validator: (value: any, coerce?: boolean) => boolean | number | string;
    };
};

export const setCalendarParamsAction = async (searchParams: searchParams) => {
    const cookieStore = await cookies();

    const calendarParams: CalendarParams = {
        month: {
            validator: (value: string, coerce?: boolean) => coerceMonth(Number(value), coerce),
        },
        year: {
            validator: (value: string, coerce?: boolean) => coerceYear(Number(value), coerce),
        },
        region: {
            validator: (value: string, coerce?: boolean) => coerceRegion(value, coerce),
        },
        "calendar-grid": {
            validator: (value: CalendarGrid, coerce?: boolean) => coerceCalendarGrid(value, coerce),
        },
    };

    let allValid = true;

    for (const key in calendarParams) {
        const calendarParamsKey = key as keyof typeof calendarParams
        const validator = calendarParams[calendarParamsKey].validator;
        const searchParam = searchParams[calendarParamsKey];
        const cookie = validator(cookieStore.get(key)?.value, true);

        calendarParams[calendarParamsKey].cookie = String(cookie);

        calendarParams[calendarParamsKey].searchParam = searchParam;

        if (!searchParam || !validator(searchParam)) {
            calendarParams[calendarParamsKey].searchParam = String(cookie);
            // cookieStore.set(key, cookie);
            allValid = false;
        } else {
            cookieStore.set(key, searchParam);
        }
    }

    if (!allValid) {
        const query = new URLSearchParams({
            year: calendarParams.year.searchParam ?? new Date().getFullYear.toString(),
            month: calendarParams.month.searchParam ?? new Date().getMonth().toString(),
            region: calendarParams.region.searchParam ?? UKRegion.ENGLAND,
            "calendar-grid": calendarParams["calendar-grid"].searchParam ?? CalendarGrid.MONTH,
        }).toString();
        redirect(`/home?${query}`);
    }
};
