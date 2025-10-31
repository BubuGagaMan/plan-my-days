import { SupabaseClient } from "@supabase/supabase-js";

export const getUserId = async (supabaseInstance: SupabaseClient<any, "public", "public", any, any>) => {
    const userId = (await supabaseInstance.auth.getUser()).data.user?.id

    return userId
}