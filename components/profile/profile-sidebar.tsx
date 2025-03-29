"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, ShoppingBag, MapPin, CreditCard, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    name: "Personal Information",
    href: "/profile",
    icon: <User className="h-4 w-4 mr-2" />,
  },
  {
    name: "Order History",
    href: "/profile/orders",
    icon: <ShoppingBag className="h-4 w-4 mr-2" />,
  },
  {
    name: "Address Book",
    href: "/profile/addresses",
    icon: <MapPin className="h-4 w-4 mr-2" />,
  },
  {
    name: "Payment Methods",
    href: "/profile/payments",
    icon: <CreditCard className="h-4 w-4 mr-2" />,
  },
]

export function ProfileSidebar() {
  const pathname = usePathname()

  return (
    <Card className="p-4">
      <div className="space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn("w-full justify-start", pathname === item.href && "bg-muted")}
            asChild
          >
            <Link href={item.href}>
              {item.icon}
              {item.name}
            </Link>
          </Button>
        ))}

        <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </Card>
  )
}

