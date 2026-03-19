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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[month - 1];
}