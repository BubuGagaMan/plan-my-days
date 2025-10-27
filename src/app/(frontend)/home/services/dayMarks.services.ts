import { serverSideSupabase } from "../../supabaseServerShit/serverSideSupabase";

export const fetchUserDayMarks = async () => {
    const supabase = await serverSideSupabase();
    const { data, error } = await supabase.from("day_mark").select("id, title, background_color, font_color");

    return data;
};

export const deleteDayMarkById = async (id: string) => {
    const supabase = await serverSideSupabase();
    const { data, error } = await supabase.from("day_mark").delete().eq("id", id);
    console.log(data, error)
};
