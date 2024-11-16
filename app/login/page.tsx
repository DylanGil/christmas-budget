import { LoginForm } from "@/components/login-form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? (
    redirect("/")
  ) : (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
