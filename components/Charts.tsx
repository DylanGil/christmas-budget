import { Recipient } from "@/app/types";

export const Charts = ({ recipients }: { recipients: Recipient[] }) => {
  return (
    <div className="mx-auto flex size-full w-10/12 flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Charts</h1>
    </div>
  );
};
