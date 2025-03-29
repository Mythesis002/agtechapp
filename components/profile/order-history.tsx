"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchData } from "@/lib/api-utils"
import { getCurrentUser } from "@/lib/auth-utils"
import type { Order } from "@/lib/types"

export function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const user = getCurrentUser()
        if (!user) return

        // Fetch orders for the current user
        const data = await fetchData<Order[]>(`orders?userId=${user.id}`)
        setOrders(data)
      } catch (error) {
        console.error("Error loading orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [])

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View and manage your orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-muted rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View and manage your orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.map((order) => <OrderCard key={order.id} order={order} getStatusColor={getStatusColor} />)
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                  <Button asChild>
                    <Link href="/products">Start Shopping</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="processing">
            <div className="space-y-4">
              {orders
                .filter((order) => order.status === "processing")
                .map((order) => (
                  <OrderCard key={order.id} order={order} getStatusColor={getStatusColor} />
                ))}
              {orders.filter((order) => order.status === "processing").length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No orders in processing.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="shipped">
            <div className="space-y-4">
              {orders
                .filter((order) => order.status === "shipped")
                .map((order) => (
                  <OrderCard key={order.id} order={order} getStatusColor={getStatusColor} />
                ))}
              {orders.filter((order) => order.status === "shipped").length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No shipped orders.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="delivered">
            <div className="space-y-4">
              {orders
                .filter((order) => order.status === "delivered")
                .map((order) => (
                  <OrderCard key={order.id} order={order} getStatusColor={getStatusColor} />
                ))}
              {orders.filter((order) => order.status === "delivered").length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No delivered orders.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="cancelled">
            <div className="space-y-4">
              {orders
                .filter((order) => order.status === "cancelled")
                .map((order) => (
                  <OrderCard key={order.id} order={order} getStatusColor={getStatusColor} />
                ))}
              {orders.filter((order) => order.status === "cancelled").length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No cancelled orders.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function OrderCard({ order, getStatusColor }: { order: Order; getStatusColor: (status: Order["status"]) => string }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Order #{order.id}</h3>
            <Badge variant="outline" className={getStatusColor(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="mt-2 sm:mt-0">
          <p className="font-semibold">₹{order.total}</p>
          <p className="text-sm text-muted-foreground">
            {order.paymentMethod === "cod"
              ? "Cash on Delivery"
              : order.paymentMethod === "card"
                ? "Credit/Debit Card"
                : "UPI"}
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {order.items.map((item) => (
          <div key={item.productId} className="flex items-center gap-3">
            <Image
              src={item.product.image || "/placeholder.svg"}
              alt={item.product.name}
              width={50}
              height={50}
              className="rounded-md"
            />
            <div className="flex-grow">
              <p className="font-medium">{item.product.name}</p>
              <p className="text-sm text-muted-foreground">
                Qty: {item.quantity} × ₹{item.product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href={`/order-confirmation/${order.id}`}>View Details</Link>
        </Button>

        {order.status === "delivered" && (
          <Button size="sm" variant="outline">
            Write Review
          </Button>
        )}

        {(order.status === "pending" || order.status === "processing") && (
          <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
            Cancel Order
          </Button>
        )}

        {order.status === "delivered" && (
          <Button size="sm" variant="outline">
            Buy Again
          </Button>
        )}
      </div>
    </div>
  )
}

