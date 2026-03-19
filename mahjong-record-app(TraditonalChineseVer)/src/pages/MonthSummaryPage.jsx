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

  const monthSummary = useMemo(() => {
    return getMonthSummary(records, selectedYear);
  }, [records, selectedYear]);

  return (
    <Layout title="月份總結">
      <section className="panel">
        <h2>篩選年份</h2>

        <div className="filter-row">
          <label>
            年份
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="all">所有年份</option>
              {availableYears.map((year) => (
                <option key={year} value={String(year)}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <SummarySection
        title="每月總結"
        items={monthSummary}
        type="month"
      />
    </Layout>
  );
}

export default MonthSummaryPage;