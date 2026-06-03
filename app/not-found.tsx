import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-4 text-center">
      <div>
        <p className="section-label">404</p>
        <h1 className="mt-4 font-serif text-5xl font-semibold">This page could not be found.</h1>
        <p className="mt-4 text-muted-foreground">The route may not exist yet or the slug may be incorrect.</p>
        <Button asChild className="mt-8">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </div>
  );
}

