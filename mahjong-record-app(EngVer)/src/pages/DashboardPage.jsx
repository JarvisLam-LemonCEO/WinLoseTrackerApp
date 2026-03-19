import { useMemo } from "react";
import Layout from "../components/Layout";
import SummaryCard from "../components/SummaryCard";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  EMPTY_SUMMARY,
  getMonthSummary,
  getOverallSummary,
  getYearSummary,
} from "../utils/summary";
import { getMonthName } from "../utils/format";

const STORAGE_KEY = "mahjong-records-v1";

function DashboardPage() {
  const [records] = useLocalStorage(STORAGE_KEY, []);

  const overallSummary = useMemo(() => getOverallSummary(records), [records]);
  const yearSummary = useMemo(() => getYearSummary(records), [records]);
  const monthSummary = useMemo(() => getMonthSummary(records), [records]);

  const latestYear = yearSummary[0]
    ? yearSummary[0]
    : {
        year: "No Data",
        ...EMPTY_SUMMARY,
      };

  const latestMonth = monthSummary[0]
    ? monthSummary[0]
    : {
        key: "empty-month",
        year: "No Data",
        month: 1,
        ...EMPTY_SUMMARY,
      };

  const latestMonthTitle =
    monthSummary.length > 0
      ? `Latest Month: ${getMonthName(latestMonth.month)} ${latestMonth.year}`
      : "Latest Month: No Data";

  return (
    <Layout title="Dashboard">
      <section className="dashboard-grid">
        <SummaryCard title="Overall Summary" summary={overallSummary} />
        <SummaryCard title={`Latest Year: ${latestYear.year}`} summary={latestYear} />
        <SummaryCard title={latestMonthTitle} summary={latestMonth} />
      </section>
    </Layout>
  );
}

export default DashboardPage;