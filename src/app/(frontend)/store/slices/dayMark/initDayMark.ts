"use server";
import { serverSideSupabase } from "@/app/(frontend)/supabaseServerShit/serverSideSupabase";

export const initDayMark = async () => {
    try {
        const supabase = await serverSideSupabase();
        const user_id = (await supabase.auth.getUser()).data.user?.id;
        const { data, error } = await supabase
            .from("day_mark")
            .select("id, title, background_color, font_color")
            .eq("user_id", user_id)
            .limit(1);
        if (data && !error) {
            return data[0];
        } else {
            throw new Error(error.message);
        }
    } catch (err) {
        console.error(err);
    }
};
