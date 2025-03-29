"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Truck, Calendar, MapPin } from "lucide-react"
import { fetchData } from "@/lib/api-utils"
import type { Order } from "@/lib/types"

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchData<Order>(`orders/${params.id}`)
        setOrder(data)
      } catch (err) {
        setError("Failed to load order details. Please try again.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrder()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container py-12 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-muted rounded mx-auto"></div>
          <div className="h-4 w-32 bg-muted rounded mx-auto"></div>
          <div className="h-64 max-w-md bg-muted rounded mx-auto"></div>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-muted-foreground mb-6">{error || "Order not found"}</p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    )
  }

  // Calculate estimated delivery date (5 days from order date)
  const orderDate = new Date(order.createdAt)
  const deliveryDate = new Date(orderDate)
  deliveryDate.setDate(deliveryDate.getDate() + 5)

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          Thank you for your order. Your order has been received and is being processed.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order #{order.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-medium">
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : order.paymentMethod === "card"
                    ? "Credit/Debit Card"
                    : "UPI"}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Estimated Delivery</p>
              <p className="font-medium flex items-center">
                <Truck className="h-4 w-4 mr-2 text-primary" />
                {deliveryDate.toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Order Status</p>
              <p className="font-medium capitalize">{order.status}</p>
            </div>
          </div>

          <div className="space-y-1 mb-6">
            <p className="text-sm text-muted-foreground">Shipping Address</p>
            <p className="font-medium flex items-start">
              <MapPin className="h-4 w-4 mr-2 text-primary mt-1 shrink-0" />
              <span>
                {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                {order.shippingAddress.pincode}
              </span>
            </p>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="font-semibold">Order Items</h3>

            {order.items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-12 h-12 relative mr-3">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ₹{item.product.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-medium">₹{item.product.price * item.quantity}</p>
              </div>
            ))}

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{order.total - 100}</span> {/* Approximation */}
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>₹100</span> {/* Approximation */}
              </div>

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline">
          <Link href="/">Continue Shopping</Link>
        </Button>

        <Button asChild>
          <Link href="/profile/orders">View All Orders</Link>
        </Button>
      </div>
    </div>
  )
}

