import { createClient } from "@supabase/supabase-js";
import { serverSideSupabase } from "../supabaseServerShit/serverSideSupabase";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

export const fetchOffDays = async () => {
    const supabase = await serverSideSupabase();
    try {
        const userId = (await supabase.auth.getUser()).data.user?.id;

        if (userId) {
            const { data: saved_off_days, error } = await supabase
                .from("saved_off_days")
                .select("off_date")
                .eq("user_id", userId);

            return saved_off_days;
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return 0;
        } else {
            console.error("Unexpected error while trying to fetch off days");
            return 0;
        }
    }
};
