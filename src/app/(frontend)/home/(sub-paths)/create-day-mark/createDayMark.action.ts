"use server";
import { revalidatePath } from "next/cache";
import { serverSideSupabase } from "@/app/(frontend)/supabaseServerShit/serverSideSupabase";

export const createDayMarkAction = async (formData: FormData) => {
    const supabase = await serverSideSupabase();
    const title = formData.get("title");
    const background_color = formData.get("background_color");
    const font_color = formData.get("font_color");
    // need to check if user id...
    const user_id = (await supabase.auth.getUser()).data.user?.id;

    try {
        await supabase.from("day_mark").insert([{ title, background_color, font_color, user_id }]);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
        }
    }

    revalidatePath("/home");
};
