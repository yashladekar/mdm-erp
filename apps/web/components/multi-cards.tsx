"use client";

import * as React from "react";
import { useState } from "react";
import { LucideIcon } from "lucide-react";

import { cn } from "@workspace/ui/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@workspace/ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Loader2 } from "lucide-react";
import { ChartBarMixed } from "./charts/barChart";

// --- Types ---

export interface ChartViewOption {
  /** Unique value for the select dropdown */
  value: string;
  /** Label to display in the dropdown */
  label: string;
  /** Optional icon to display next to the label */
  icon?: LucideIcon | React.ElementType;
  /** The actual component to render when this option is selected */
  content: React.ReactNode;
}

export interface ChartSwitcherCardProps {
  title: string;
  description?: string;
  /** List of chart views to switch between */
  options: ChartViewOption[];
  /** The 'value' of the option to show by default. If omitted, uses the first option. */
  defaultOption?: string;
  className?: string;
  contentClassName?: string; // For specific styling of the content area (e.g. height)
}

// --- Main Component ---

export function ChartSwitcherCard({
  title,
  description,
  options,
  defaultOption,
  className,
  contentClassName,
}: ChartSwitcherCardProps) {
  // Initialize state with defaultOption or the first option's value
  const [currentViewValue, setCurrentViewValue] = useState<string>(
    defaultOption || options[0]?.value || ""
  );

  if (!options || options.length === 0) {
    return null;
  }

  // Find the currently selected view object
  const currentView =
    options.find((opt) => opt.value === currentViewValue) || options[0];

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-col gap-2 space-y-0 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <CardTitle className="line-clamp-1 text-sm font-medium capitalize lg:text-base">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-xs">{description}</CardDescription>
          )}
        </div>

        {/* View Switcher */}
        <div className="w-full max-w-xs lg:w-[180px]">
          <Select value={currentViewValue} onValueChange={setCurrentViewValue}>
            <SelectTrigger className="h-8 w-full text-xs">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  <div className="flex items-center text-xs">
                    {opt.icon && (
                      <opt.icon className="mr-2 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    )}
                    <span className="line-clamp-1">{opt.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className={cn("px-2", contentClassName)}>
        {/* Render the selected content */}
        <div className="w-full animate-in fade-in-50 duration-300">
          {currentView?.content}
        </div>
      </CardContent>
    </Card>
  );
}

// --- Loading State Component ---

export const ChartSwitcherLoading = ({ height = 350 }: { height?: number }) => (
  <Card className="w-full border-none drop-shadow-sm">
    <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-8 w-full lg:w-[120px]" />
    </CardHeader>
    <CardContent>
      <div
        className="flex w-full items-center justify-center bg-muted/10"
        style={{ height }}
      >
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    </CardContent>
  </Card>
);



import { Pyramid, Radar, AreaChart } from "lucide-react";
import { ChartLineDotsColors } from "./charts/lineChart";

export const MyGradePage = ({ data }: { data: any[] }) => {
  const chartOptions: ChartViewOption[] = [
    {
      value: "bar",
      label: "Bar Chart",
      icon: Pyramid,
      content: (
        <div className="aspect-video">
          <ChartBarMixed data={data} />
        </div>
      ),
    },
    {
      value: "pyramid",
      label: "Pyramid Chart",
      icon: AreaChart,
      content: (
        <div className="aspect-video">
          <ChartLineDotsColors />
        </div>
      ),
    },
    {
      value: "line",
      label: "Line Chart",
      icon: Radar,
      content: (
        <div className="aspect-video">
          <ChartLineDotsColors />
        </div>
      ),
    },
  ];
  return (
    <ChartSwitcherCard
      title="Grade wise Onsite/Offshore"
      options={chartOptions}
      defaultOption="pyramid"
    />
  );
};


// "use client";
// import { useState } from "react";
// import { Pyramid, AreaChart, Loader2, Radar } from "lucide-react";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectValue,
//   SelectItem,
// } from "@workspace/ui/components/select";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@workspace/ui/components/card";
// import dynamic from "next/dynamic";
// import { ChartLineMultiple } from "./charts/lineChart";
// import { Skeleton } from "@workspace/ui/components/skeleton";
// import PyramidChart2 from "./charts/pyramidChart";
// // import PyramidChart from "@/components/charts/pyramid/pyramid";
// const PyramidChart = dynamic(
//   () => import("./charts/pyramid"),
//   { ssr: false }
// );

// const CHART_HEIGHT = 350;
// interface GradeCount {
//   [key: string]: number;
// }
// interface DataItem {
//   name: string;
//   gradeCount: GradeCount;
// }
// interface ChartMultiCardProps {
//   data: DataItem[];
// }

// export const ChartMultiCard = (data: ChartMultiCardProps) => {
//   const [chartType, setChartType] = useState("pyramid");
//   const onChartTypeChange = (value: string) => setChartType(value);
//   const title = "Grade wise Onsite/Offshore";

//   return (
//     <Card className="border-none shadow-none w-full max-w-full pb-2">
//       <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
//         <CardTitle className="line-clamp-1 capitalize text-sm w-full lg:w-auto">
//           {title}
//         </CardTitle>
//         <div className="w-full max-w-xs lg:max-w-[150px]">
//           <Select defaultValue={chartType} onValueChange={onChartTypeChange}>
//             <SelectTrigger className="w-full h-9 rounded-md px-3 text-xs">
//               <SelectValue placeholder="Chart Type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="BarChart">
//                 <div className="flex items-center text-xs">
//                   <Pyramid className="size-4 mr-2 shrink-0" />
//                   <p className="line-clamp-1">Bar Chart</p>
//                 </div>
//               </SelectItem>
//               <SelectItem value="lineChart">
//                 <div className="flex items-center text-xs">
//                   <Radar className="size-4 mr-2 shrink-0" />
//                   <p className="line-clamp-1">Line Chart</p>
//                 </div>
//               </SelectItem>
//               <SelectItem value="pyramid">
//                 <div className="flex items-center text-xs">
//                   <AreaChart className="size-4 mr-2 shrink-0" />
//                   <p className="line-clamp-1">Pyramid Chart</p>
//                 </div>
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="w-full">
//           {chartType === "BarChart" && (
//             <div
//               style={{ width: "100%", height: CHART_HEIGHT }}
//               className="flex justify-center items-center"
//             >
//               <PyramidChart data={data.data} />
//             </div>
//           )}
//           {chartType === "pyramid" && (
//             <div style={{ width: "100%", height: CHART_HEIGHT }}>
//               <PyramidChart2 data={data.data} />
//             </div>
//           )}
//           {chartType === "lineChart" && (
//             <div
//               className="pt-10"
//               style={{ width: "auto", height: CHART_HEIGHT }}
//             >
//               <ChartLineMultiple data={data.data} />
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export const ChartLoading = () => (
//   <Card className="border-none drop-shadow-sm w-full max-w-[900px] mx-auto">
//     <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
//       <Skeleton className="h-8 w-48" />
//       <Skeleton className="h-8 lg:w-[120px] w-full" />
//     </CardHeader>
//     <CardContent>
//       <div
//         className="w-full flex items-center justify-center"
//         style={{ height: CHART_HEIGHT }}
//       >
//         <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
//       </div>
//     </CardContent>
//   </Card>
// );

