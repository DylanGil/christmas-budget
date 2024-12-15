import { Recipient } from "@/app/types";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Charts } from "./Charts";

const Stat = ({ title, value }: { title: string; value: number | string }) => {
  return (
    <Card className="h-15 flex w-40 flex-col border-2 text-center max-sm:w-32">
      <div className="flex flex-col rounded-t-md bg-accent font-semibold text-secondary max-md:px-1 max-sm:text-sm">
        {title}
      </div>
      <p className="text-xl font-bold text-primary">{value}</p>
    </Card>
  );
};

export const Stats = ({ recipients }: { recipients: Recipient[] }) => {
  return (
    <div className="flex items-center justify-center gap-1 max-xl:flex-col">
      <Charts recipients={recipients} choice={1} />
      <div className="flex flex-col items-center pb-5 max-xl:order-first">
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
        <div className="mt-5 flex gap-2">
          <Stat
            title="Cadeaux achetés"
            value={(() => {
              return recipients.filter((recipient) => recipient.is_purchased)
                .length;
            })()}
          />
          <Stat
            title="Cadeaux embalés"
            value={(() => {
              return recipients.filter((recipient) => recipient.is_wrapped)
                .length;
            })()}
          />
        </div>
        <div className="mt-5 flex gap-2">
          <Stat
            title="Budget total"
            value={(() => {
              return (
                (recipients.reduce(
                  (acc, recipient) => acc + (recipient.budget ?? 0),
                  0
                )).toFixed(2) + " €"
              );
            })()}
          />
          <Stat
            title="Budget dépensé"
            value={(() => {
              return (
                (recipients.reduce(
                  (acc, recipient) => acc + (recipient.actual_budget ?? 0),
                  0
                )).toFixed(2) + " €"
              );
            })()}
          />
          <Stat
            title="Budget restant"
            value={(() => {
              return (
                (recipients.reduce(
                  (acc, recipient) =>
                    acc +
                    (recipient.budget ?? 0) -
                    (recipient.actual_budget ?? 0),
                  0
                )).toFixed(2) + " €"
              );
            })()}
          />
        </div>
      </div>
      <Charts recipients={recipients} choice={2} />
    </div>
  );
};
