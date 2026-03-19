import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import SummarySection from "../components/SummarySection";
import useLocalStorage from "../hooks/useLocalStorage";
import { getAvailableYears, getMonthSummary } from "../utils/summary";

const STORAGE_KEY = "mahjong-records-v1";

function MonthSummaryPage() {
  const [records] = useLocalStorage(STORAGE_KEY, []);
  const [selectedYear, setSelectedYear] = useState("all");

  const availableYears = useMemo(() => getAvailableYears(records), [records]);
  const monthSummary = useMemo(
    () => getMonthSummary(records, selectedYear),
    [records, selectedYear]
  );

  return (
    <Layout title="Month Summary">
      <section className="panel">
        <h2>Filter by Year</h2>
        <div className="filter-row">
          <label>
            Year
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="all">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <SummarySection title="Monthly Summary Cards" items={monthSummary} type="month" />
    </Layout>
  );
}

export default MonthSummaryPage;