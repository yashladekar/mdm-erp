import React from "react";
import ReactECharts from "echarts-for-react";
import type {
  EChartsOption,
  DefaultLabelFormatterCallbackParams,
} from "echarts";

// The prop type now matches your incoming data structure
export interface GradeCount {
  [key: string]: number;
}
export interface RawPyramidDataItem {
  name: string;
  gradeCount: GradeCount;
}
export interface PyramidChartProps {
  data: RawPyramidDataItem[];
  height?: number | string;
  title?: string;
}

const COLORS = [
  "#60a5fa",
  "#fb923c",
  "#16a34a",
  "#22d3ee",
  "#facc15",
  "#a78bfa",
  "#f472b6",
];

export default function PyramidChart2({ data, title }: PyramidChartProps) {
  // Example: show Onsite grades (data[0]), or Offshore (data[1])
  // You can make this dynamic if needed
  const onsiteGrades =
    data && data[0]
      ? Object.entries(data[0].gradeCount).map(([name, value], idx) => ({
          name,
          value,
          itemStyle: { color: COLORS[idx % COLORS.length] },
        }))
      : [];

  const option: EChartsOption = {
    backgroundColor: "#fff",
    title: title
      ? {
          text: title,
          left: "center",
          top: 10,
          textStyle: { color: "#000000", fontSize: 18 },
        }
      : undefined,
    series: [
      {
        name: "Value",
        type: "funnel",
        sort: "ascending",
        left: "center",
        width: "80%",
        top: "5%",
        bottom: "5%",
        gap: 0,
        label: {
          show: true,
          position: "inside",
          color: "#fff",
          fontSize: 12,
          formatter: (params: DefaultLabelFormatterCallbackParams) =>
            `${params.value}`,
        },
        labelLine: {
          show: false,
        },
        data: onsiteGrades,
      },
      {
        name: "Name",
        type: "funnel",
        sort: "ascending",
        left: "center",
        width: "80%",
        top: "5%",
        bottom: "5%",
        gap: 0,
        label: {
          show: true,
          position: "outer",
          color: "#000",
          fontSize: 12,
          formatter: (params: DefaultLabelFormatterCallbackParams) =>
            `${params.name}`,
        },
        labelLine: {
          show: true,
          length: 20,
          length2: 10,
        },
        itemStyle: {
          color: "transparent",
        },
        data: onsiteGrades,
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ width: "100%", height: "400px" }} />
  );
  // return <ReactECharts option={option}  />;
}
