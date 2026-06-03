import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description,
  badge,
}: Readonly<{
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: string;
}>) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3">
        {eyebrow ? <p className="section-label">{eyebrow}</p> : null}
        {badge ? <Badge variant="outline">{badge}</Badge> : null}
      </div>
      <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p> : null}
    </div>
  );
}

