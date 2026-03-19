function FilterPanel({
  selectedYear,
  selectedMonth,
  availableYears,
  onYearChange,
  onMonthChange,
}) {
  return (
    <section className="panel filter-panel">
      <h2>篩選</h2>

      <div className="filter-row">
        <label>
          年份
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
          >
            <option value="all">所有年份</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label>
          月份
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
          >
            <option value="all">所有月份</option>
            <option value="1">1月</option>
            <option value="2">2月</option>
            <option value="3">3月</option>
            <option value="4">4月</option>
            <option value="5">5月</option>
            <option value="6">6月</option>
            <option value="7">7月</option>
            <option value="8">8月</option>
            <option value="9">9月</option>
            <option value="10">10月</option>
            <option value="11">11月</option>
            <option value="12">12月</option>
          </select>
        </label>
      </div>
    </section>
  );
}

export default FilterPanel;