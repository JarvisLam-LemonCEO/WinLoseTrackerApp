import { getYearMonth, sortRecordsByDateDesc } from "./format";

export const EMPTY_SUMMARY = {
  totalWinAmount: 0,
  totalLossAmount: 0,
  winCount: 0,
  lossCount: 0,
  net: 0,
};

export function getAvailableYears(records) {
  const years = [...new Set(records.map((record) => getYearMonth(record.date).year))];
  return years.sort((a, b) => b - a);
}

export function getFilteredRecords(records, selectedYear, selectedMonth) {
  return sortRecordsByDateDesc(records).filter((record) => {
    const { year, month } = getYearMonth(record.date);

    const yearMatch = selectedYear === "all" || Number(selectedYear) === year;
    const monthMatch = selectedMonth === "all" || Number(selectedMonth) === month;

    return yearMatch && monthMatch;
  });
}

export function getOverallSummary(records) {
  return records.reduce(
    (acc, record) => {
      const amount = Number(record.amount) || 0;

      if (record.type === "win") {
        acc.totalWinAmount += amount;
        acc.winCount += 1;
        acc.net += amount;
      } else {
        acc.totalLossAmount += amount;
        acc.lossCount += 1;
        acc.net -= amount;
      }

      return acc;
    },
    { ...EMPTY_SUMMARY }
  );
}

export function getYearSummary(records) {
  const grouped = {};

  records.forEach((record) => {
    const { year } = getYearMonth(record.date);

    if (!grouped[year]) {
      grouped[year] = {
        year,
        totalWinAmount: 0,
        totalLossAmount: 0,
        winCount: 0,
        lossCount: 0,
        net: 0,
      };
    }

    const amount = Number(record.amount) || 0;

    if (record.type === "win") {
      grouped[year].totalWinAmount += amount;
      grouped[year].winCount += 1;
      grouped[year].net += amount;
    } else {
      grouped[year].totalLossAmount += amount;
      grouped[year].lossCount += 1;
      grouped[year].net -= amount;
    }
  });

  return Object.values(grouped).sort((a, b) => b.year - a.year);
}

export function getMonthSummary(records, selectedYear = "all") {
  const grouped = {};

  records.forEach((record) => {
    const { year, month, yearMonthKey } = getYearMonth(record.date);

    if (!grouped[yearMonthKey]) {
      grouped[yearMonthKey] = {
        key: yearMonthKey,
        year,
        month,
        totalWinAmount: 0,
        totalLossAmount: 0,
        winCount: 0,
        lossCount: 0,
        net: 0,
      };
    }

    const amount = Number(record.amount) || 0;

    if (record.type === "win") {
      grouped[yearMonthKey].totalWinAmount += amount;
      grouped[yearMonthKey].winCount += 1;
      grouped[yearMonthKey].net += amount;
    } else {
      grouped[yearMonthKey].totalLossAmount += amount;
      grouped[yearMonthKey].lossCount += 1;
      grouped[yearMonthKey].net -= amount;
    }
  });

  let result = Object.values(grouped).sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return b.month - a.month;
  });

  if (selectedYear !== "all") {
    result = result.filter((item) => item.year === Number(selectedYear));
  }

  return result;
}