"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { getCurrentUser, setCurrentUser } from "@/lib/auth-utils"
import type { User } from "@/lib/types"

export function ProfileInfo() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState<User | null>(null)

  // Load user data on mount
  useEffect(() => {
    const user = getCurrentUser()
    setUserData(user)
  }, [])

  const handleSave = () => {
    if (!userData) return

    // In a real app, this would call an API to update the user data
    setCurrentUser(userData)

    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })

    setIsEditing(false)
  }

  if (!userData) {
    return (
      <div className="space-y-6 animate-pulse">
        <Card>
          <CardHeader>
            <div className="h-7 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
              <div className="h-24 w-24 bg-muted rounded-full"></div>
              <div className="space-y-2 w-full">
                <div className="h-6 bg-muted rounded w-1/3"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-10 bg-muted rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Manage your personal information and how it is displayed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg?height=100&width=100" alt={userData.name} />
              <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold">{userData.name}</h3>
              <p className="text-muted-foreground">Member since January 2022</p>

              {!isEditing && (
                <Button variant="outline" size="sm" className="mt-2" onClick={() => setIsEditing(true)}>
                  Change Profile Picture
                </Button>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          {isEditing ? (
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={userData.phone || ""}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p>{userData.name}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                  <p>{userData.email}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                  <p>{userData.phone || "Not provided"}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>Manage your password and account security settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Password</p>
              <p>••••••••</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Two-Factor Authentication</p>
              <p className="text-red-500">Not Enabled</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">Change Password</Button>
          <Button>Enable Two-Factor Authentication</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Communication Preferences</CardTitle>
          <CardDescription>Manage how we contact you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive order updates and promotions</p>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="email-notifications" className="sr-only">
                  Email Notifications
                </Label>
                <input type="checkbox" id="email-notifications" className="toggle" defaultChecked />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Receive order updates via SMS</p>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="sms-notifications" className="sr-only">
                  SMS Notifications
                </Label>
                <input type="checkbox" id="sms-notifications" className="toggle" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

