"use server";
import { serverSideSupabase } from "../supabaseServerShit/serverSideSupabase";
import { revalidatePath } from "next/cache";
import { DBDayMark } from "../home/types/dateTypes";
// import { DayMarkOption } from "../components/calendar/DayMarkPicker";

export const actionDayOff = async (path: string, dayMark: DBDayMark, formData: FormData) => {
    const supabase = await serverSideSupabase();
    const fullDate = formData.get("full-date");
    const isMarked = Number(formData.get("isMarked"));

    const user_id = (await supabase.auth.getUser()).data.user?.id;
    if (typeof fullDate === "string" && typeof isMarked === "number") {
        // if is marked **
        if (isMarked) {
            const { data, error } = await supabase.from("marked_day").delete().eq("date", fullDate);

        } else {
            const { data, error } = await supabase
                .from("marked_day")
                .insert([{ date: fullDate, day_mark_id: dayMark.id, user_id }]);

        }
        revalidatePath(path);
    }
};
