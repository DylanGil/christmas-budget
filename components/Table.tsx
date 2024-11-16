import { createClient } from "@/lib/supabase/server";

export const Table = async () => {
  const supabase = await createClient();
  const { data: recipient } = await supabase.from("recipient").select();

  return (
    <div className="mx-auto flex size-full w-10/12 flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Table</h1>
      <pre>{JSON.stringify(recipient, null, 2)}</pre>
    </div>
  );
};
