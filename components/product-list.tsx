import type { Product } from "@/lib/types"
import { ProductCard } from "@/components/product-card"

// This would normally come from an API or database
const products: Product[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
  {
    id: "5",
    name: "Drip Irrigation Kit",
    description: "Water-saving drip irrigation system for efficient farming",
    price: 2499,
    image: "/placeholder.svg?height=200&width=200",
    category: "Irrigation",
    rating: 4.9,
    reviews: 38,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: "6",
    name: "Organic Compost",
    description: "Nutrient-rich organic compost for soil enrichment",
    price: 299,
    image: "/placeholder.svg?height=200&width=200",
    category: "Fertilizers",
    rating: 4.4,
    reviews: 65,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: "7",
    name: "Rice Seeds",
    description: "High-quality rice seeds for better yield",
    price: 449,
    image: "/placeholder.svg?height=200&width=200",
    category: "Seeds",
    rating: 4.6,
    reviews: 92,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: "8",
    name: "Garden Hoe",
    description: "Durable garden hoe for weeding and soil preparation",
    price: 399,
    image: "/placeholder.svg?height=200&width=200",
    category: "Equipment",
    rating: 4.3,
    reviews: 47,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: "9",
    name: "Natural Insect Repellent",
    description: "Chemical-free insect repellent for organic farming",
    price: 349,
    image: "/placeholder.svg?height=200&width=200",
    category: "Pesticides",
    rating: 4.2,
    reviews: 53,
    isNew: false,
    isBestSeller: false,
  },
]

export function ProductList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

