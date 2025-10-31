import { serverSideSupabase } from "../(frontend)/supabaseServerShit/serverSideSupabase";
import { cache } from "react";
import { getUserId } from "./user.services";

export type UserMarkedDay = {
    id: string
    date: string
    notes: string | null
    day_mark: {
        id: string
        title: string
        background_color: string
        font_color: string
    }
}

// type UserMarkedDaysFetch = UserMarkedDay[]

export const getAllMarkedDays = cache(async (): Promise<UserMarkedDay[] | null> => {
    const supabase = await serverSideSupabase();
    try {
        const userId = (await supabase.auth.getUser()).data.user?.id;

        if (userId) {
            const { data: fetchedDays, error } = await supabase
                .from("marked_day")
                .select(
                    `id,
                    date,
                    notes,
                    day_mark:day_mark!marked_day_day_mark_id_fkey ( id, title, background_color, font_color )`
                )
                .eq("user_id", userId);

            return fetchedDays as UserMarkedDay[] | null;
        }
        return []
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return null;
        } else {
            console.error("Unexpected error while trying to fetch off days");
            return null;
        }
    }
});

export const getMarkedDayById = async (id: string) => {
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

// type MarkedDateNoId = {
//     date: string
//     notes: string | null
//     day_mark: {
//         id: string
//         title: string
//         background_color: string
//         font_color: string
//     }
// }

export const getMarkedDayByDate = async (date: string): Promise<UserMarkedDay[] | null> => {
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
                .eq("date", date)
                .eq("user_id", userId);

            return data as UserMarkedDay[] | null;
        }
        // @TODO - might need to look into a different return practice for when user not found
        return null
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(err.message);
            return null;
        } else {
            console.error("Unexpected error while trying to fetch off days");
            return null;
        }
    }
};


export const createMarkedDays = async (dates: string[], dayMarkId: string, notes: string | null) => {
    const supabase = await serverSideSupabase();
    const userId = await getUserId(supabase);

    const makredDays = dates.map((date) => {
        return {
            date,
            user_id: userId,
            day_mark_id: dayMarkId,
            notes,
        };
    });

    const { data, error } = await supabase.from("marked_day").insert(makredDays);
    // console.log(data, error)
};
