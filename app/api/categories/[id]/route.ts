import { NextResponse } from "next/server"
import { categories } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const category = categories.find((c) => c.id === id)

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 })
  }

  // Add artificial delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(category)
}

