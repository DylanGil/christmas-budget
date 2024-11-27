import { Recipient } from "@/app/types";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Charts } from "./Charts";

const Stat = ({ title, value }: { title: string; value: number | string }) => {
  return (
    <Card className="flex flex-col text-center xl:w-40 h-15 border-2">
      <div className="flex flex-col bg-accent text-secondary max-md:px-1 font-semibold rounded-t-md">
        {title}
      </div>
      <p className="text-xl font-bold text-primary">{value}</p>
    </Card>
  );
};

export const Stats = ({ recipients }: { recipients: Recipient[] }) => {
  return (
    <div className="flex max-xl:flex-col items-center justify-center gap-2">
      <Charts recipients={recipients} choice={1} />
      <div className="flex max-xl:order-first pb-5 items-center flex-col w-11/12">
        <Star color="#ffe436" fill="#ffe436" size={58} className="mb-5" />
        <Stat
          title="Jour avant Noël"
          value={(() => {
            const year = new Date().getFullYear();
            return Math.ceil(
              (new Date(`${year}-12-25`).getTime() - new Date().getTime()) /
                (1000 * 3600 * 24)
            );
          })()}
        />
        <div className="flex gap-2 mt-5">
          <Stat
            title="Cadeau achetés"
            value={(() => {
              return recipients.filter((recipient) => recipient.is_purchased)
                .length;
            })()}
          />
          <Stat
            title="Cadeau embalés"
            value={(() => {
              return recipients.filter((recipient) => recipient.is_wrapped)
                .length;
            })()}
          />
        </div>
        <div className="flex gap-2 mt-5">
          <Stat
            title="Budget total"
            value={(() => {
              return (
                recipients.reduce(
                  (acc, recipient) => acc + (recipient.budget ?? 0),
                  0
                ) + " €"
              );
            })()}
          />
          <Stat
            title="Budget dépensé"
            value={(() => {
              return (
                recipients.reduce(
                  (acc, recipient) => acc + (recipient.actual_budget ?? 0),
                  0
                ) + " €"
              );
            })()}
          />
          <Stat
            title="Budget restant"
            value={(() => {
              return (
                recipients.reduce(
                  (acc, recipient) =>
                    acc +
                    (recipient.budget ?? 0) -
                    (recipient.actual_budget ?? 0),
                  0
                ) + " €"
              );
            })()}
          />
        </div>
      </div>
      <Charts recipients={recipients} choice={2} />
    </div>
  );
};
