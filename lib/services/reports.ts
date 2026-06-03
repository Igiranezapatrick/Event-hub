export async function fetchReports(format: "csv" | "json" = "json") {
  const response = await fetch(`/api/reports?format=${format}`);
  if (!response.ok) throw new Error("Report export failed");
  return format === "json" ? response.json() : response.text();
}

