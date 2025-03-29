import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { AddToWishlistButton } from "@/components/wishlist/add-to-wishlist-button"
import type { Product } from "@/lib/types"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden h-full">
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
        <AddToWishlistButton
          product={product}
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
        />
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
        <AddToCartButton product={product} className="w-full" />
      </CardFooter>
    </Card>
  )
}

