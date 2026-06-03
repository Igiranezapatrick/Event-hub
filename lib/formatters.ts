export function formatCurrency(amount: number, currency: "RWF" | "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateTimeRange(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return `${new Intl.DateTimeFormat("en-GB", { month: "short", day: "numeric" }).format(start)} - ${new Intl.DateTimeFormat("en-GB", { month: "short", day: "numeric" }).format(end)}`;
}

export function formatLongDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

