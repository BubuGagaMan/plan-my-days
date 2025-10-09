"use server";
// import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { serverSideSupabase } from "../supabaseServerShit/serverSideSupabase";

export const signUp = async (formData: FormData) => {
    const supabase = await serverSideSupabase();
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email === "string" && typeof password === "string") {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        redirect("/auth/e-confirmation");
    }
};

export const login = async (formData: FormData) => {
    const supabase = await serverSideSupabase();
    const email = formData.get("email");
    const password = formData.get("password");
    if (typeof email === "string" && typeof password === "string") {
        let { data, error } = await supabase.auth.signInWithPassword({
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
    let { error } = await supabase.auth.signOut();
    redirect("/auth/login");
};
