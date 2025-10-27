import { serverSideSupabase } from "../../supabaseServerShit/serverSideSupabase";

export const fetchUserMarkedDays = async () => {
    const supabase = await serverSideSupabase();
    try {
        const userId = (await supabase.auth.getUser()).data.user?.id;

        if (userId) {
            const { data, error } = await supabase
                .from("marked_day")
                .select(
                    `id,
                    date,
                    notes,
                    day_mark:day_mark!marked_day_day_mark_id_fkey ( id, title, background_color, font_color )`
                )
                .eq("user_id", userId);
            //console.log(data, userId);

            return data;
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

export const fetchMarkedDayById = async (id: string) => {
    const supabase = await serverSideSupabase();

    try {
        const userId = (await supabase.auth.getUser()).data.user?.id;

        if (userId) {
            const { data, error } = await supabase
                .from("marked_day")
                .select(
                    `date, 
                notes, 
                day_mark:day_mark!marked_day_day_mark_id_fkey ( id, title, background_color, font_color )`
                )
                .eq("id", id)
                .eq("user_id", userId);

            return data;
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

export const fetchMarkedDayByDate = async (date: string) => {
    const supabase = await serverSideSupabase();

    try {
        const userId = (await supabase.auth.getUser()).data.user?.id;

        if (userId) {
            const { data, error } = await supabase
                .from("marked_day")
                .select(
                    `date, 
                notes, 
                day_mark:day_mark!marked_day_day_mark_id_fkey ( id, title, background_color, font_color )`
                )
                .eq("date", date)
                .eq("user_id", userId);

            return data;
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
