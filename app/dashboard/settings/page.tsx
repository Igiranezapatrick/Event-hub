import { updateProfileAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/section-heading";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <SectionHeading
        eyebrow="Settings"
        title="Profile, access, and media"
        description="Update your personal details and upload a profile photo for better trust across the marketplace."
      />
      <Card>
        <CardHeader>
          <CardTitle>Profile settings</CardTitle>
          <CardDescription>Supports full name, username, email, phone, bio, country, city, and image upload.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateProfileAction} className="grid gap-4 md:grid-cols-2">
            <Input name="fullName" placeholder="Full name" />
            <Input name="username" placeholder="Username" />
            <Input name="phoneNumber" placeholder="Phone number" />
            <Input name="country" placeholder="Country" />
            <Input name="city" placeholder="City" />
            <Input name="profileImage" type="file" className="md:col-span-2" />
            <Textarea name="bio" placeholder="Bio" className="md:col-span-2" />
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">Update profile</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

