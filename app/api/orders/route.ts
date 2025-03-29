import { NextResponse } from "next/server"
import type { Order } from "@/lib/types"

// Mock orders data
const orders: Order[] = [
  {
    id: "ORD12345",
    userId: "user1",
    items: [
      {
        productId: "1",
        quantity: 2,
        product: {
          id: "1",
          name: "Premium Wheat Seeds",
          description: "High-yield wheat seeds for optimal crop production",
          price: 499,
          image: "/placeholder.svg?height=80&width=80",
          category: "Seeds",
          rating: 4.8,
          reviews: 124,
        },
      },
      {
        productId: "2",
        quantity: 1,
        product: {
          id: "2",
          name: "Organic Fertilizer",
          description: "100% organic fertilizer for healthier crops",
          price: 349,
          image: "/placeholder.svg?height=80&width=80",
          category: "Fertilizers",
          rating: 4.6,
          reviews: 89,
        },
      },
    ],
    total: 1347,
    status: "delivered",
    paymentMethod: "card",
    createdAt: "2023-10-15T10:30:00Z",
    shippingAddress: {
      street: "123 Farm Road",
      city: "Amritsar",
      state: "Punjab",
      pincode: "143001",
    },
  },
  {
    id: "ORD12346",
    userId: "user1",
    items: [
      {
        productId: "3",
        quantity: 1,
        product: {
          id: "3",
          name: "Bio Pesticide",
          description: "Eco-friendly pesticide for pest control",
          price: 599,
          image: "/placeholder.svg?height=80&width=80",
          category: "Pesticides",
          rating: 4.5,
          reviews: 76,
        },
      },
    ],
    total: 599,
    status: "shipped",
    paymentMethod: "upi",
    createdAt: "2023-11-05T14:20:00Z",
    shippingAddress: {
      street: "456 Village Lane",
      city: "Amritsar",
      state: "Punjab",
      pincode: "143001",
    },
  },
  {
    id: "ORD12347",
    userId: "user1",
    items: [
      {
        productId: "4",
        quantity: 1,
        product: {
          id: "4",
          name: "Hand Tiller",
          description: "Durable hand tiller for small farms",
          price: 1299,
          image: "/placeholder.svg?height=80&width=80",
          category: "Equipment",
          rating: 4.7,
          reviews: 52,
        },
      },
    ],
    total: 1299,
    status: "processing",
    paymentMethod: "cod",
    createdAt: "2023-11-20T09:15:00Z",
    shippingAddress: {
      street: "789 Rural Avenue",
      city: "Amritsar",
      state: "Punjab",
      pincode: "143001",
    },
  },
]

export async function GET(request: Request) {
  // Get URL and parse query parameters
  const { searchParams } = new URL(request.url)

  // Parse filter parameters
  const userId = searchParams.get("userId")
  const status = searchParams.get("status")

  // Filter orders based on parameters
  let filteredOrders = [...orders]

  if (userId) {
    filteredOrders = filteredOrders.filter((order) => order.userId === userId)
  }

  if (status) {
    filteredOrders = filteredOrders.filter((order) => order.status === status)
  }

  // Add artificial delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(filteredOrders)
}

export async function POST(request: Request) {
  try {
    const orderData = await request.json()

    // Generate a unique order ID
    const orderId = `ORD${Date.now().toString().slice(-8)}`

    // Create a new order
    const newOrder: Order = {
      id: orderId,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: "pending",
    }

    // Add the order to the mock database
    orders.push(newOrder)

    // Add artificial delay to simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 800))

    return NextResponse.json(newOrder)
  } catch (error) {
    return NextResponse.json({ error: "An error occurred while creating the order" }, { status: 500 })
  }
}

