import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart } from "lucide-react"

// Sample product data
const products = [
  {
    id: 1,
    name: "Premium Wheat Seeds",
    description: "High-yield wheat seeds for optimal crop production",
    price: 499,
    image: "/placeholder.svg?height=200&width=200",
    category: "Seeds",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: 2,
    name: "Organic Fertilizer",
    description: "100% organic fertilizer for healthier crops",
    price: 349,
    image: "/placeholder.svg?height=200&width=200",
    category: "Fertilizers",
    rating: 4.6,
    reviews: 89,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: 3,
    name: "Bio Pesticide",
    description: "Eco-friendly pesticide for pest control",
    price: 599,
    image: "/placeholder.svg?height=200&width=200",
    category: "Pesticides",
    rating: 4.5,
    reviews: 76,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: 4,
    name: "Hand Tiller",
    description: "Durable hand tiller for small farms",
    price: 1299,
    image: "/placeholder.svg?height=200&width=200",
    category: "Equipment",
    rating: 4.7,
    reviews: 52,
    isNew: true,
    isBestSeller: false,
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl">
            Discover our top-selling agricultural products trusted by farmers across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden h-full">
              <div className="relative">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                >
                  <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                </Button>
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && <Badge className="bg-primary">New</Badge>}
                  {product.isBestSeller && <Badge className="bg-accent">Best Seller</Badge>}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center mb-2">
                  <div className="flex text-amber-500">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">({product.reviews})</span>
                </div>
                <div className="font-bold text-lg">₹{product.price}</div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

