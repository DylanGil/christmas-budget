import { Recipient } from "@/app/types";
import { Card, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

export const Charts = ({
  recipients,
  choice,
}: {
  recipients: Recipient[];
  choice: 1 | 2;
}) => {
  const categoriesAmountObject = recipients.reduce(
    (acc, recipient) => {
      acc[recipient.category] = (acc[recipient.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const categoriesBudgetObject = recipients.reduce(
    (acc, recipient) => {
      acc[recipient.category] =
        (acc[recipient.category] || 0) + (recipient.budget ?? 0);
      return acc;
    },
    {} as Record<string, number>
  );

  const categoriesAmount = Object.keys(categoriesAmountObject).map((key) => ({
    category: key,
    value: categoriesAmountObject[key],
    fill: `var(--color-${key})`,
  }));
  const categoriesBudget = Object.keys(categoriesBudgetObject).map((key) => ({
    category: key,
    value: categoriesBudgetObject[key],
    fill: `var(--color-${key})`,
  }));

  const chartConfig = {
    Famille: {
      label: "Famille",
      color: "hsl(var(--chart-1))",
    },
    Ami: {
      label: "Ami",
      color: "hsl(var(--chart-2))",
    },
    Collegue: {
      label: "Collegue",
      color: "hsl(var(--chart-3))",
    },
    Animal: {
      label: "Animal",
      color: "hsl(var(--chart-4))",
    },
    Autre: {
      label: "Autre",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  return (
    <div className="">
      {choice === 1 && (
        <Card className="w-96 flex flex-col justify-center items-center">
          <CardTitle className="text-center pb-5">
            Nombre de cadeaux par catégorie
          </CardTitle>
          <ChartContainer config={chartConfig} className="h-64">
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="category" hideLabel />}
              />
              <Pie
                data={categoriesAmount}
                dataKey="value"
                // labelLine={false}
                label={({ payload, ...props }) => {
                  return (
                    <text
                      cx={props.cx}
                      cy={props.cy}
                      x={props.x}
                      y={props.y}
                      textAnchor={props.textAnchor}
                      dominantBaseline={props.dominantBaseline}
                      fill="hsla(var(--foreground))"
                    >
                      {payload.category} ({payload.value})
                    </text>
                  );
                }}
                nameKey="browser"
              />
            </PieChart>
          </ChartContainer>
        </Card>
      )}

      {choice === 2 && (
        <Card className="w-96 flex flex-col justify-center items-center">
          <CardTitle className="text-center pb-5">
            Budget total par catégorie
          </CardTitle>
          <ChartContainer config={chartConfig} className="h-64">
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="category" hideLabel />}
              />
              <Pie
                data={categoriesBudget}
                dataKey="value"
                // labelLine={false}
                label={({ payload, ...props }) => {
                  return (
                    <text
                      cx={props.cx}
                      cy={props.cy}
                      x={props.x}
                      y={props.y}
                      textAnchor={props.textAnchor}
                      dominantBaseline={props.dominantBaseline}
                      fill="hsla(var(--foreground))"
                    >
                      {payload.category} ({payload.value} €)
                    </text>
                  );
                }}
                nameKey="browser"
              />
            </PieChart>
          </ChartContainer>
        </Card>
      )}
    </div>
  );
};
