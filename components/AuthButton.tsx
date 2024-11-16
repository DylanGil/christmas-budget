import { signOutAction } from "@/app/actions";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      {/* Hey, {user.email} ! */}
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Se déconnecter
        </Button>
      </form>
    </div>
  ) : (
    <div className="m-2">
      <Button asChild variant={"default"}>
        <Link href="/login">Se connecter / S&apos;inscrire</Link>
      </Button>
    </div>
  );
}
