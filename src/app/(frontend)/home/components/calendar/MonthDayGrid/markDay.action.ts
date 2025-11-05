"use server";
import { revalidatePath } from "next/cache";
import { DBDayMark } from "@/app/types/dateTypes";
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

    if (typeof date === "string" && user_id) {
        // delete single
        if (actionSettings.clear && !multipleDatesArr) {
            await supabase.from("marked_day").delete().eq("user_id", user_id).eq("date", date);
        }
        // delete multiple
        if (actionSettings.clear && multipleDatesArr) {
            await supabase.from("marked_day").delete().eq("user_id", user_id).in("date", multipleDatesArr);
        }
        // create single
        if (!actionSettings.clear && !multipleDatesArr) {
            if (actionSettings.overwrite) {
                await supabase.from("marked_day").delete().eq("user_id", user_id).eq("date", date);
            }
            await supabase.from("marked_day").insert([{ date: date, day_mark_id: selectedDayMark?.id, user_id }]);
        }
        // create multiple
        if (!actionSettings.clear && multipleDatesArr) {
            const insertData = multipleDatesArr.map((date) => ({
                date,
                day_mark_id: selectedDayMark?.id,
                user_id,
            }));

            if (actionSettings.overwrite) {
                // overwrite - delete and insert new
                await supabase.from("marked_day").delete().eq("user_id", user_id).in("date", multipleDatesArr);
                await supabase.from("marked_day").insert(insertData);
            } else {
                // non overwrite - filterout any pre-existing dates before inserting
                const { data } = await supabase
                    .from("marked_day")
                    .select("date")
                    .eq("user_id", user_id)
                    .in("date", multipleDatesArr);

                const filteredData = insertData.filter(
                    (markedDay) => !data?.find((marked_day: { date: string }) => marked_day.date === markedDay.date)
                );

                await supabase.from("marked_day").insert(filteredData);
            }
        }

        revalidatePath("/home");
    }
};
