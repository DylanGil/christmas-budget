"use client";
import { Recipient } from "@/app/types";
import { Charts } from "@/components/Charts";
import { Table } from "@/components/Table";
import { useState } from "react";

export default function MainContent({ recipient }: { recipient: Recipient[] }) {
  const [recipients, setRecipients] = useState<Recipient[]>(recipient || []);

  return (
    <div>
      <Charts recipients={recipients} />
      <Table recipients={recipients} setRecipients={setRecipients} />
    </div>
  );
}
