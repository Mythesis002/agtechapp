import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface Subcategory {
  name: string
  count: number
}

interface Category {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  color: string
  textColor: string
  image: string
  subcategories: Subcategory[]
}

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      <div className="relative">
        <Image
          src={category.image || "/placeholder.svg"}
          alt={category.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-4 left-4 ${category.color} ${category.textColor} p-3 rounded-full`}>
          {category.icon}
        </div>
      </div>
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
        <p className="text-muted-foreground mb-4">{category.description}</p>

        <div className="space-y-1">
          <h4 className="text-sm font-medium mb-2">Popular Subcategories:</h4>
          <div className="flex flex-wrap gap-2">
            {category.subcategories.slice(0, 4).map((subcategory) => (
              <Badge key={subcategory.name} variant="outline" className="flex items-center gap-1">
                {subcategory.name}
                <span className="text-xs bg-muted rounded-full px-1.5 py-0.5 ml-1">{subcategory.count}</span>
              </Badge>
            ))}
            {category.subcategories.length > 4 && (
              <Badge variant="outline">+{category.subcategories.length - 4} more</Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/categories/${category.id}`} className="flex items-center justify-between">
            <span>Browse {category.name}</span>
            <ChevronRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

