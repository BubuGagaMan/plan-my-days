"use server"
import { createMarkedDays } from "../../services/markedDays.services";
import { getDateRange } from "../../utilities/getDateRange";

export const markMultipleDaysAction = async (dayMarkId: string, formData: FormData) => {
    const fromDate = formData.get("from-date");
    const fromMonth = formData.get("from-month");
    const fromYear = formData.get("from-year");

    const toDate = formData.get("to-date");
    const toMonth = formData.get("to-month");
    const toYear = formData.get("to-year");

    const notes = formData.get("notes");

    // const dateRange = getDateRange(
    //     Number(fromDate),
    //     Number(fromMonth),
    //     Number(fromYear),
    //     Number(toDate),
    //     Number(toMonth),
    //     Number(toYear)
    // );

    //  await createMarkedDays(dateRange, dayMarkId, String(notes));

};
