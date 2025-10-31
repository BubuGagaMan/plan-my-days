"use server";
import { revalidatePath } from "next/cache";
import { DBDayMark } from "../../../../../types/dateTypes";
import { serverSideSupabase } from "@/app/(frontend)/supabaseServerShit/serverSideSupabase";

export type ActionSettings = {
    clear: boolean;
    overwrite: boolean;
};

export const markDayAction = async (
    selectedDayMark: DBDayMark | null,
    multipleDatesArr: string[] | null,
    actionSettings: ActionSettings,
    formData: FormData
) => {
    const supabase = await serverSideSupabase();
    const date = formData.get("date");

    const user_id = (await supabase.auth.getUser()).data.user?.id;

    if (typeof date === "string") {
        // delete single
        if (actionSettings.clear && !multipleDatesArr) {
            console.log("deleting single");
            const { data, error } = await supabase.from("marked_day").delete().eq("date", date);
        }
        // delete multiple
        if (actionSettings.clear && multipleDatesArr) {
            console.log("deleting multiple");
            const insertData = multipleDatesArr.map((date) => ({
                date,
                day_mark_id: selectedDayMark?.id,
                user_id,
            }));
            const { data, error } = await supabase.from("marked_day").delete().in("date", multipleDatesArr);
            console.log(error);
        }
        // create single
        if (!actionSettings.clear && !multipleDatesArr) {
            console.log("creating single");

            if (actionSettings.overwrite) {
                console.log("overwrite triggered");
                const { data, error } = await supabase.from("marked_day").delete().eq("date", date);
            }
            const { data, error } = await supabase
                .from("marked_day")
                .insert([{ date: date, day_mark_id: selectedDayMark?.id, user_id }]);
        }
        // create multiple
        if (!actionSettings.clear && multipleDatesArr) {
            console.log("creating multiple");
            const insertData = multipleDatesArr.map((date) => ({
                date,
                day_mark_id: selectedDayMark?.id,
                user_id,
            }));

            if (actionSettings.overwrite) {
                console.log("overwrite triggered");
                await supabase.from("marked_day").delete().in("date", multipleDatesArr);
                await supabase.from("marked_day").insert(insertData);
            } else {
                const { data, error } = await supabase.from("marked_day").select("date").in("date", multipleDatesArr);
                console.log(data);
                const filteredData = insertData.filter(
                    (markedDay) => !data?.find((marked_day: { date: string }) => marked_day.date === markedDay.date)
                );
                console.log(filteredData);
                await supabase.from("marked_day").insert(filteredData);
            }
        }

        revalidatePath("/home");
    }
};
