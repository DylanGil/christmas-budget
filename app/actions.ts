"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (email: string, password: string) => {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return "Email et mot de passe sont requis";
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return error.message;
  } else {
    return redirect("/");
  }
};

export const signInAction = async (email: string, password: string) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return error.message;
  }

  return redirect("/");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};
