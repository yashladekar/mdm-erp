"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Dot, Line, LineChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart";

export const description =
  "Grade-wise employees line chart with dots and colors";

// Example grade-wise employee data
const chartData = [
  { grade: "grade1", employees: 50, fill: "var(--color-grade1)" },
  { grade: "grade2", employees: 40, fill: "var(--color-grade2)" },
  { grade: "grade3", employees: 35, fill: "var(--color-grade3)" },
  { grade: "grade4", employees: 30, fill: "var(--color-grade4)" },
  { grade: "grade5", employees: 20, fill: "var(--color-grade5)" },
];

const chartConfig = {
  employees: {
    label: "Employees",
    color: "var(--chart-2)",
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

export function ChartLineDotsColors() {
  return (
    <div className="w-full h-full flex flex-col p-2">
      <div className="text-center mb-2">
        <h3 className="text-sm font-semibold">Grade-wise Employees</h3>
        <p className="text-xs text-muted-foreground">
          Distribution across grades
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-0">
        <ChartContainer config={chartConfig} className="w-full h-[180px]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 12,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="employees"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="employees"
              type="natural"
              stroke="var(--color-employees)"
              strokeWidth={2}
              dot={({ payload, ...props }) => (
                <Dot
                  key={payload.grade}
                  r={4}
                  cx={props.cx}
                  cy={props.cy}
                  fill={payload.fill}
                  stroke={payload.fill}
                />
              )}
            />
          </LineChart>
        </ChartContainer>
      </div>
      <div className="flex flex-col gap-1 text-xs text-center mt-2">
        <div className="flex items-center justify-center gap-1 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-3 w-3" />
        </div>
        <div className="text-muted-foreground flex items-center justify-center gap-1 leading-none">
          Showing total employees across grades
        </div>
      </div>
    </div>
  );
}
