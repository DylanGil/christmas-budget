import { User } from "@/app/types";
import { createClient } from "@/lib/supabase/server";

export const getUser = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? (user as unknown as User) : null;
};
