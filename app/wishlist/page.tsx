"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Trash2 } from "lucide-react"
import { useWishlistStore } from "@/lib/store"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { useToast } from "@/hooks/use-toast"

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId)
    toast({
      title: "Item removed",
      description: `${productName} has been removed from your wishlist.`,
    })
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add items to your wishlist to keep track of products you're interested in.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <Card key={product.id} className="overflow-hidden">
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
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full text-red-500"
                  onClick={() => handleRemoveItem(product.id, product.name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
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
                <div className="font-bold text-lg mb-4">₹{product.price}</div>

                <AddToCartButton product={product} className="w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

