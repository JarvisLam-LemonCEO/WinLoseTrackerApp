import { useMemo } from "react";
import Layout from "../components/Layout";
import SummarySection from "../components/SummarySection";
import useLocalStorage from "../hooks/useLocalStorage";
import { getYearSummary } from "../utils/summary";

const STORAGE_KEY = "mahjong-records-v1";

function YearSummaryPage() {
  const [records] = useLocalStorage(STORAGE_KEY, []);
  const yearSummary = useMemo(() => getYearSummary(records), [records]);

  return (
    <Layout title="Year Summary">
      <SummarySection title="Yearly Summary Cards" items={yearSummary} type="year" />
    </Layout>
  );
}

export default YearSummaryPage;