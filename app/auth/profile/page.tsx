import { updateProfileAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Update profile</CardTitle>
          <CardDescription>Full name, username, phone, bio, country, city, and profile image upload support.</CardDescription>
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
              <Button type="submit">Save profile</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

