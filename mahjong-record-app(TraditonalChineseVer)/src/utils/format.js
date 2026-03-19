export function formatCurrency(value) {
  const number = Number(value) || 0;
  return `$${number.toFixed(2)}`;
}

export function getYearMonth(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return {
    year,
    month,
    yearMonthKey: `${year}-${String(month).padStart(2, "0")}`,
  };
}

export function sortRecordsByDateDesc(records) {
  return [...records].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getMonthName(month) {
  const monthNames = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  return monthNames[month - 1];
}