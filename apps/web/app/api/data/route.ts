import { NextResponse } from "next/server";

type DataType = {
  id: string;
  month: string;
  value: number;
};

// --- MOCK SOURCE DATA (100 rows) ---
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MOCK_DATA: DataType[] = Array.from({ length: 100 }).map((_, i) => ({
  id: String(i + 1),
  month: months[i % 12] ?? "Jan",
  value: Math.round(100 + Math.random() * 200),
}));

// GET /api/data?page=&pageSize=&months=
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 20);
  const monthsFilter = searchParams.get("months");

  let filtered = MOCK_DATA;

  // Apply filter if months are selected
  if (monthsFilter) {
    const arr = monthsFilter.split(",").filter(Boolean); // ["Jan", "Feb"]
    filtered = filtered.filter((item) => arr.includes(item.month));
  }

  // Pagination
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const items = filtered.slice(start, end);
  const nextPage = end < filtered.length ? page + 1 : null;

  return NextResponse.json({
    items,
    nextPage,
  });
}
