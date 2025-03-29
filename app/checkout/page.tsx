"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useCartStore } from "@/lib/store"
import { getCurrentUser } from "@/lib/auth-utils"
import { postData } from "@/lib/api-utils"
import type { CheckoutFormData, User } from "@/lib/types"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, subtotal, clearCart } = useCartStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<CheckoutFormData>({
    shippingAddress: {
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    paymentMethod: "cod",
    saveAddress: true,
  })

  // Calculate totals
  const cartSubtotal = subtotal()
  const shipping = cartSubtotal > 1000 ? 0 : 100
  const tax = Math.round(cartSubtotal * 0.18) // 18% GST
  const total = cartSubtotal + shipping + tax

  // Load user data on mount
  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setCurrentUser(user)
      // Pre-fill form with user data if available
      if (user.address) {
        setFormData((prev) => ({
          ...prev,
          shippingAddress: {
            name: user.name,
            phone: user.phone || "",
            street: user.address?.street || "",
            city: user.address?.city || "",
            state: user.address?.state || "",
            pincode: user.address?.pincode || "",
          },
        }))
      }
    }
  }, [])

  // Redirect to login if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentUser) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to complete your order.",
        variant: "destructive",
      })
      router.push("/auth/login?redirect=/checkout")
      return
    }

    setIsSubmitting(true)

    try {
      // Create order object
      const orderData = {
        userId: currentUser.id,
        items: items,
        total: total,
        paymentMethod: formData.paymentMethod,
        shippingAddress: {
          street: formData.shippingAddress.street,
          city: formData.shippingAddress.city,
          state: formData.shippingAddress.state,
          pincode: formData.shippingAddress.pincode,
        },
      }

      // Submit order to API
      const order = await postData("orders", orderData)

      // Clear cart
      clearCart()

      // Show success message
      toast({
        title: "Order placed successfully!",
        description: `Your order #${order.id} has been placed.`,
      })

      // Redirect to order confirmation page
      router.push(`/order-confirmation/${order.id}`)
    } catch (error) {
      console.error("Error placing order:", error)
      toast({
        title: "Error placing order",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shippingAddress.name">Full Name</Label>
                    <Input
                      id="shippingAddress.name"
                      name="shippingAddress.name"
                      value={formData.shippingAddress.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shippingAddress.phone">Phone Number</Label>
                    <Input
                      id="shippingAddress.phone"
                      name="shippingAddress.phone"
                      value={formData.shippingAddress.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="shippingAddress.street">Street Address</Label>
                    <Input
                      id="shippingAddress.street"
                      name="shippingAddress.street"
                      value={formData.shippingAddress.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shippingAddress.city">City</Label>
                    <Input
                      id="shippingAddress.city"
                      name="shippingAddress.city"
                      value={formData.shippingAddress.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shippingAddress.state">State</Label>
                    <Input
                      id="shippingAddress.state"
                      name="shippingAddress.state"
                      value={formData.shippingAddress.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shippingAddress.pincode">PIN Code</Label>
                    <Input
                      id="shippingAddress.pincode"
                      name="shippingAddress.pincode"
                      value={formData.shippingAddress.pincode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox
                    id="saveAddress"
                    checked={formData.saveAddress}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, saveAddress: checked as boolean }))}
                  />
                  <Label htmlFor="saveAddress">Save this address for future orders</Label>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, paymentMethod: value as "cod" | "card" | "upi" }))
                  }
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="cod" id="payment-cod" />
                    <Label htmlFor="payment-cod" className="flex items-center">
                      <Image
                        src="/placeholder.svg?height=30&width=30"
                        alt="COD"
                        width={30}
                        height={30}
                        className="mr-2"
                      />
                      Cash on Delivery
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="card" id="payment-card" />
                    <Label htmlFor="payment-card" className="flex items-center">
                      <Image
                        src="/placeholder.svg?height=30&width=30"
                        alt="Card"
                        width={30}
                        height={30}
                        className="mr-2"
                      />
                      Credit/Debit Card
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="payment-upi" />
                    <Label htmlFor="payment-upi" className="flex items-center">
                      <Image
                        src="/placeholder.svg?height=30&width=30"
                        alt="UPI"
                        width={30}
                        height={30}
                        className="mr-2"
                      />
                      UPI
                    </Label>
                  </div>
                </RadioGroup>

                {formData.paymentMethod === "card" && (
                  <div className="mt-4 p-4 border rounded-md bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-2">
                      This is a demo application. No actual payment will be processed.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input id="cardName" placeholder="Name as it appears on card" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "upi" && (
                  <div className="mt-4 p-4 border rounded-md bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-2">
                      This is a demo application. No actual payment will be processed.
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="yourname@upi" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between mt-6">
              <Button variant="outline" asChild>
                <Link href="/cart">Back to Cart</Link>
              </Button>

              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 relative mr-2">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium">₹{item.product.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{cartSubtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (18% GST)</span>
                    <span>₹{tax}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="bg-muted/30 p-3 rounded-md mt-4">
                  <p className="text-sm font-medium mb-1">Estimated Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

