import type React from "react"
import Link from "next/link"
import { Leaf, Droplet, Bug, Tractor, Sprout } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Seeds",
    icon: <Seed className="h-8 w-8" />,
    href: "/categories/seeds",
    color: "bg-green-100 dark:bg-green-900",
    textColor: "text-green-700 dark:text-green-300",
  },
  {
    name: "Fertilizers",
    icon: <Leaf className="h-8 w-8" />,
    href: "/categories/fertilizers",
    color: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-700 dark:text-blue-300",
  },
  {
    name: "Pesticides",
    icon: <Bug className="h-8 w-8" />,
    href: "/categories/pesticides",
    color: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-700 dark:text-red-300",
  },
  {
    name: "Equipment",
    icon: <Tractor className="h-8 w-8" />,
    href: "/categories/equipment",
    color: "bg-amber-100 dark:bg-amber-900",
    textColor: "text-amber-700 dark:text-amber-300",
  },
  {
    name: "Irrigation",
    icon: <Droplet className="h-8 w-8" />,
    href: "/categories/irrigation",
    color: "bg-cyan-100 dark:bg-cyan-900",
    textColor: "text-cyan-700 dark:text-cyan-300",
  },
  {
    name: "Organic",
    icon: <Sprout className="h-8 w-8" />,
    href: "/categories/organic",
    color: "bg-emerald-100 dark:bg-emerald-900",
    textColor: "text-emerald-700 dark:text-emerald-300",
  },
]

function Seed(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V7l-8-5-8 5v5c0 6 8 10 8 10" />
      <path d="M12 6v6" />
      <path d="M9 10h6" />
    </svg>
  )
}

export function CategorySection() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl">
            Explore our wide range of agricultural products organized by category to find exactly what you need for your
            farm.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                  <div className={`${category.color} ${category.textColor} p-3 rounded-full mb-4`}>{category.icon}</div>
                  <h3 className="font-medium">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

