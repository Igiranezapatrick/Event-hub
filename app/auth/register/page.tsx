import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-4 px-4 py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Join as an organizer, student, teacher, or super admin.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
      <div className="w-full rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
        <p className="text-sm font-medium text-blue-600">📧 Verify your email</p>
        <p className="mt-2 text-sm text-muted-foreground">
          After creating your account, check your email inbox for a verification link. Click the link to confirm your email address and unlock full access to the platform.
        </p>
      </div>
    </div>
  );
}
