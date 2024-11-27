"use server";

import { Recipient, User } from "@/app/types";
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

export const getUser = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? (user as unknown as User) : null;
};

export const upsertRecipient = async (recipient: Recipient) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("recipient")
    .upsert(recipient)
    .select();
  return { data, error };
};

export const deleteRecipient = async (id: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("recipient")
    .delete()
    .eq("id", id)
    .select();
  return { data, error };
};
