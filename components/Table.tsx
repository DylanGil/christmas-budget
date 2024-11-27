import { Recipient } from "@/app/types";
import { CreateColumns } from "./recipientsTable/columns";
import { DataTable } from "./recipientsTable/data-table";

export const Table = ({
  recipients,
  setRecipients,
}: {
  recipients: Recipient[];
  setRecipients: (recipients: Recipient[]) => void;
}) => {
  const columns = CreateColumns(recipients, setRecipients);

  return (
    <div className="mx-auto flex size-full w-10/12 flex-col items-center justify-center">
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={recipients}
          setRecipients={setRecipients}
        />
      </div>
    </div>
  );
};
