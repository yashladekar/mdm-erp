"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart";

export const description = "Grade-wise bar chart";

const chartData = [
  { grade: "grade1", Employees: 50, fill: "var(--color-grade1)" },
  { grade: "grade2", Employees: 40, fill: "var(--color-grade2)" },
  { grade: "grade3", Employees: 35, fill: "var(--color-grade3)" },
  { grade: "grade4", Employees: 30, fill: "var(--color-grade4)" },
  { grade: "grade5", Employees: 20, fill: "var(--color-grade5)" },
];

// Config with Grade labels
const chartConfig = {
  Employees: {
    label: "Employees",
  },
  grade1: {
    label: "Grade 1",
    color: "var(--chart-1)",
  },
  grade2: {
    label: "Grade 2",
    color: "var(--chart-2)",
  },
  grade3: {
    label: "Grade 3",
    color: "var(--chart-3)",
  },
  grade4: {
    label: "Grade 4",
    color: "var(--chart-4)",
  },
  grade5: {
    label: "Grade 5",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ChartBarMixed() {
  return (
    <div className="w-full h-full flex flex-col px-2 py-0">
      <div className="flex-1 flex items-center justify-center min-h-0">
        <ChartContainer config={chartConfig} className="h-[180px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 0 }}
          >
            <YAxis
              dataKey="grade"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
              tick={{ fontSize: 10 }}
            />
            <XAxis dataKey="Employees" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="Employees" radius={3} barSize={25} />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="flex gap-1 leading-none font-medium text-sm pt-2 items-center">
        Trending up by 5.2% this month <TrendingUp className="h-3 w-3" />
      </div>
    </div>
  );
}
