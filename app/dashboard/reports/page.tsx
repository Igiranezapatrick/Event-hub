import Link from "next/link";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";

const reportTypes = [
  { label: "Revenue report", href: "/api/reports?format=csv", icon: FileSpreadsheet },
  { label: "Sales report", href: "/api/reports?format=json", icon: FileText },
  { label: "Attendance report", href: "/api/reports?format=csv", icon: FileSpreadsheet },
  { label: "Organizer report", href: "/api/reports?format=json", icon: FileText },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Reports"
        title="Export revenue, sales, attendance, and organizer reporting"
        description="CSV and JSON endpoints are scaffolded here so you can wire PDF or Excel generation behind the API layer."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.label}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{report.label}</p>
                    <p className="text-sm text-muted-foreground">{report.href.includes("csv") ? "Downloadable CSV export" : "Structured JSON summary"}</p>
                  </div>
                </div>
                <Button asChild variant="outline">
                  <Link href={report.href}>
                    <Download className="h-4 w-4" />
                    Export
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

