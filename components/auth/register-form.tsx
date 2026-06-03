"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpAction, type AuthActionState } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState: AuthActionState = {};

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(signUpAction, initialState);

  return (
    <form action={formAction} className="grid gap-4 md:grid-cols-2">
      <Input name="fullName" placeholder="Full name" required />
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="password" type="password" placeholder="Password" required />
      <select
        name="role"
        defaultValue="attendee"
        className="h-11 rounded-2xl border border-border/70 bg-background/80 px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option value="attendee">Attendee / Student</option>
        <option value="organizer">Organizer / Creator</option>
        <option value="super_admin">Super Admin</option>
      </select>
      <Input name="username" placeholder="Username" />
      <Input name="phoneNumber" placeholder="Phone number" />
      <Input name="country" placeholder="Country" />
      <Input name="city" placeholder="City" />
      <Textarea name="bio" placeholder="Short bio" className="md:col-span-2" />
      {state.error ? (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive md:col-span-2">
          {state.error}
        </p>
      ) : null}
      <div className="flex items-center justify-between md:col-span-2">
        <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground">
          Already have an account?
        </Link>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create account"}
        </Button>
      </div>
    </form>
  );
}

