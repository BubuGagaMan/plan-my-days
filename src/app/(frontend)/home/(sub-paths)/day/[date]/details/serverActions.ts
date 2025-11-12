"use server";

import { serverSideSupabase } from "@/app/(frontend)/supabaseServerShit/serverSideSupabase";
import { revalidatePath } from "next/cache";

export const updateDayNotes = async (formData: FormData) => {
    const date = formData.get("date");
    const newNotes = formData.get("notes");

    const supabase = await serverSideSupabase();
    const userId = (await supabase.auth.getUser()).data.user?.id;

    await supabase.from("marked_day").update({ notes: newNotes }).eq("date", date).eq("user_id", userId).select();

    revalidatePath(`/home/day/${date}/details`);
};
