import { NextResponse } from "next/server"
import { products } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const product = products.find((p) => p.id === id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  // Add artificial delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(product)
}

