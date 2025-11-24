"use client";
import React from "react";
import Plot from "react-plotly.js";
import { Card, CardContent } from "@workspace/ui/components/card";

type GradeCount = Record<string, number>;
type PyramidData = { name: string; gradeCount: GradeCount }[];

interface PyramidChartProps {
  data: PyramidData;
}

const CHART_HEIGHT = 340;

const PyramidChart: React.FC<PyramidChartProps> = ({ data }) => {
  if (!data || data.length < 2) {
    return (
      <Card className="w-[420px] h-[340px] flex items-center justify-center shadow-none border-none">
        <CardContent className="p-0 h-full flex items-center justify-center">
          <span className="text-muted-foreground">No data available</span>
        </CardContent>
      </Card>
    );
  }

  // Extract all unique grade keys in order and sort them
  const gradeKeys = Array.from(
    new Set([
      ...Object.keys(data[0]?.gradeCount ?? {}),
      ...Object.keys(data[1]?.gradeCount ?? {}),
    ])
  ).sort();

  const onsiteData = gradeKeys.map((grade) => data[0]?.gradeCount[grade] ?? 0);
  const offshoreData = gradeKeys.map(
    (grade) => data[1]?.gradeCount[grade] ?? 0
  );

  const maxOnsite = Math.max(...onsiteData, 1);
  const maxOffshore = Math.max(...offshoreData, 1);

  const tickvals = [
    -maxOnsite,
    -Math.floor(maxOnsite / 2),
    0,
    Math.floor(maxOffshore / 2),
    maxOffshore,
  ];
  const ticktext = tickvals.map((v) => Math.abs(v).toString());

  return (
    <Card className="w-full max-w-full min-w-[320px] min-h-[300px] overflow-hidden shadow-none border-none">
      <CardContent className="p-0 h-full">
        <div className="w-full h-full min-h-[300px] min-w-[320px]">
          <Plot
            data={[
              {
                x: onsiteData.map((val) => -val),
                y: gradeKeys,
                name: data[0]?.name || "Onsite",
                orientation: "h",
                type: "bar",
                marker: { color: "#636EFA" },
                width: 0.95,
                text: onsiteData.map((val) => val.toString()),
                texttemplate: "%{text}",
                hovertemplate: `${data[0]?.name || "Onsite"}: %{text}<extra></extra>`,
              },
              {
                x: offshoreData,
                y: gradeKeys,
                name: data[1]?.name || "Offshore",
                orientation: "h",
                type: "bar",
                marker: { color: "#EF553B" },
                width: 0.95,
                text: offshoreData.map((val) => val.toString()),
                texttemplate: "%{text}",
                hovertemplate: `${data[1]?.name || "Offshore"}: %{text}<extra></extra>`,
              },
            ]}
            layout={{
              barmode: "relative",
              xaxis: {
                tickvals,
                ticktext,
                title: { text: "Count" },
                zeroline: true,
                zerolinecolor: "#888",
              },
              yaxis: { autorange: "reversed", title: { text: "Grade" } },
              bargap: 0.1,
              showlegend: true,
              margin: { t: 20, l: 60, r: 40, b: 20 },
              legend: {
                orientation: "h",
                x: 0.3,
                y: -0.3,
              },
              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",
            }}
            style={{
              width: "100%",
              height: CHART_HEIGHT,
              minWidth: 320,
              minHeight: 300,
            }}
            config={{ responsive: true }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

// ✅ Dummy data defined in the same file
const dummyData: PyramidData = [
  {
    name: "Onsite",
    gradeCount: { A: 10, B: 15, C: 8, D: 5 },
  },
  {
    name: "Offshore",
    gradeCount: { A: 12, B: 9, C: 14, D: 7 },
  },
];

// ✅ Demo wrapper to render chart with dummy data
export default function PyramidChartDemo() {
  return (
    <div className="p-4">
      <PyramidChart data={dummyData} />
    </div>
  );
}
