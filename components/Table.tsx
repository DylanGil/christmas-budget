import { Recipient } from "@/app/types";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";

export const Table = ({
  recipients,
  setRecipients,
}: {
  recipients: Recipient[];
  setRecipients: (recipients: Recipient[]) => void;
}) => {
  const supabase = createClient();
  const handleClickUpsert = async () => {
    const { data, error } = await supabase
      .from("countries")
      .upsert({ id: 1, name: "Albania" })
      .select();
    console.log("data", data);
    console.log("error", error);
  };
  const handleClickDelete = async () => {
    const { data, error } = await supabase
      .from("countries")
      .delete()
      .eq("id", 1)
      .select();
    console.log("data", data);
    console.log("error", error);
  };
  return (
    <div className="mx-auto flex size-full w-10/12 flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Table</h1>
      <pre>{JSON.stringify(recipients, null, 2)}</pre>
      <div className="flex space-x-4">
        <Button onClick={handleClickUpsert}>
          <span>Insert</span>
        </Button>
        <Button onClick={handleClickDelete}>
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
};
