import { Card, CardContent } from "@/components/ui/card";

export function MetricCard({
  label,
  value,
  delta,
}: Readonly<{
  label: string;
  value: string;
  delta?: string;
}>) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
          {delta ? <p className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{delta}</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}

