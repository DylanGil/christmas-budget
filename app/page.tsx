import { getUser } from "@/app/actions";
import MainContent from "@/components/MainContent";
import { createClient } from "@/lib/supabase/server";
import { Recipient } from "./types";

export default async function Home() {
  const supabase = await createClient();
  const user = await getUser();
  if (!user)
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>Veuillez vous connecter pour accéder au site</p>
      </div>
    );

  const { data: recipient } = (await supabase
    .from("recipient")
    .select()
    .order("created_at", { ascending: false })
    .eq("user_id", user.id)) as { data: Recipient[] };

  return <MainContent recipient={recipient} />;
}
