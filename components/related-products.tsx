import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"

// Sample related products data
const products: Product[] = [
  {
    id: "5",
    name: "Premium Rice Seeds",
    description: "High-yield rice seeds for optimal crop production",
    price: 449,
    image: "/placeholder.svg?height=200&width=200",
    category: "Seeds",
    rating: 4.7,
    reviews: 98,
    isNew: true,
  },
  {
    id: "6",
    name: "Corn Seeds",
    description: "Quality corn seeds for better yield",
    price: 399,
    image: "/placeholder.svg?height=200&width=200",
    category: "Seeds",
    rating: 4.5,
    reviews: 76,
  },
  {
    id: "7",
    name: "Soybean Seeds",
    description: "Premium soybean seeds for commercial farming",
    price: 549,
    image: "/placeholder.svg?height=200&width=200",
    category: "Seeds",
    rating: 4.6,
    reviews: 62,
  },
  {
    id: "8",
    name: "Sunflower Seeds",
    description: "High oil content sunflower seeds",
    price: 499,
    image: "/placeholder.svg?height=200&width=200",
    category: "Seeds",
    rating: 4.4,
    reviews: 45,
    isBestSeller: true,
  },
]

export function RelatedProducts({
  category,
  currentProductId,
}: {
  category: string
  currentProductId: string
}) {
  // Filter out the current product
  const filteredProducts = products.filter((product) => product.id !== currentProductId)

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

