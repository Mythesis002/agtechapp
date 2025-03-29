import { NextResponse } from "next/server"
import { categories } from "@/lib/data"

export async function GET() {
  // Add artificial delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(categories)
}

