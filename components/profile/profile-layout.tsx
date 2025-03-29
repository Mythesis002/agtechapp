import type React from "react"
import { ProfileSidebar } from "@/components/profile/profile-sidebar"

export function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="hidden md:block">
          <ProfileSidebar />
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  )
}

