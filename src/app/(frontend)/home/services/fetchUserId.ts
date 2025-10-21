import { SupabaseClient } from "@supabase/supabase-js";

export const fetchUserId = async (supabaseInstance: SupabaseClient<any, "public", "public", any, any>) => {
    const userId = (await supabaseInstance.auth.getUser()).data.user?.id

    return userId
}