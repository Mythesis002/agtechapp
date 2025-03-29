"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCartStore } from "@/lib/store"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  showIcon?: boolean
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function AddToCartButton({
  product,
  quantity = 1,
  showIcon = true,
  variant = "default",
  size = "default",
  className = "",
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { toast } = useToast()
  const addToCart = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    setIsAdding(true)

    // Simulate API call or processing
    setTimeout(() => {
      addToCart({
        productId: product.id,
        quantity: quantity,
        product: product,
      })

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })

      setIsAdding(false)
    }, 600)
  }

  return (
    <Button onClick={handleAddToCart} variant={variant} size={size} className={className} disabled={isAdding}>
      {isAdding ? (
        <>
          {showIcon && <Check className="h-4 w-4 mr-2 animate-pulse" />}
          Adding...
        </>
      ) : (
        <>
          {showIcon && <ShoppingCart className="h-4 w-4 mr-2" />}
          Add to Cart
        </>
      )}
    </Button>
  )
}

