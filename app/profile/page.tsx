import { UserProfile } from "@/components/user-profile"

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <UserProfile />
    </div>
  )
}
