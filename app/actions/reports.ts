"use server";

export async function exportReportAction(formData: FormData) {
  return {
    ok: true,
    kind: String(formData.get("kind") ?? "revenue"),
  };
}

