"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useWishlistStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"

interface AddToWishlistButtonProps {
  product: Product
  variant?: "ghost" | "outline" | "default"
  size?: "default" | "sm" | "lg" | "icon"
  showText?: boolean
  className?: string
}

export function AddToWishlistButton({
  product,
  variant = "ghost",
  size = "icon",
  showText = false,
  className = "",
}: AddToWishlistButtonProps) {
  const { addItem, removeItem, isInWishlist } = useWishlistStore()
  const { toast } = useToast()

  const inWishlist = isInWishlist(product.id)

  const toggleWishlist = () => {
    if (inWishlist) {
      removeItem(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addItem(product)
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  return (
    <Button variant={variant} size={size} onClick={toggleWishlist} className={className}>
      <Heart className={`h-5 w-5 ${inWishlist ? "fill-red-500 text-red-500" : ""}`} />
      {showText && <span className="ml-2">{inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</span>}
    </Button>
  )
}

