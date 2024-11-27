"use client";
import { Recipient } from "@/app/types";
import { Stats } from "@/components/Stats";
import { Table } from "@/components/Table";
import { useState } from "react";

export default function MainContent({ recipient }: { recipient: Recipient[] }) {
  const [recipients, setRecipients] = useState<Recipient[]>(recipient || []);

  return (
    <div>
      <Stats recipients={recipients} />
      <Table recipients={recipients} setRecipients={setRecipients} />
    </div>
  );
}
