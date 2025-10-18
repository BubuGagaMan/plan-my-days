"use server";
// import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { serverSideSupabase } from "../supabaseServerShit/serverSideSupabase";

export const register = async (formData: FormData) => {
    const supabase = await serverSideSupabase();
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email === "string" && typeof password === "string") {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (!error && data.user?.id) {
            const { error } = await supabase
                .from("day_mark")
                .insert([
                    { title: "OFF-DAY", background_color: "#698F46", font_color: "#171C17", user_id: data.user.id },
                ]);
            redirect("/auth/e-confirmation");
        }
    }
};

export const login = async (formData: FormData) => {
    const supabase = await serverSideSupabase();
    const email = formData.get("email");
    const password = formData.get("password");
    if (typeof email === "string" && typeof password === "string") {
        await supabase.auth.signInWithPassword({
            email,
            password,
        });

        // return data.session?.access_token
        redirect("/home");
    }
};

// export const loginWithGoogle = async () => {
//     let { data, error } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//     });
// };

export const logout = async () => {
    const supabase = await serverSideSupabase();
    await supabase.auth.signOut();
    redirect("/auth/login");
};
