import { NextResponse } from "next/server"
import { products } from "@/lib/data"

export async function GET(request: Request) {
  // Get URL and parse query parameters
  const { searchParams } = new URL(request.url)

  // Parse filter parameters
  const category = searchParams.get("category")
  const subcategory = searchParams.get("subcategory")
  const minPrice = searchParams.get("minPrice") ? Number.parseInt(searchParams.get("minPrice")!) : undefined
  const maxPrice = searchParams.get("maxPrice") ? Number.parseInt(searchParams.get("maxPrice")!) : undefined
  const sort = searchParams.get("sort") || "featured"

  // Filter products based on parameters
  let filteredProducts = [...products]

  if (category) {
    filteredProducts = filteredProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())
  }

  if (subcategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.subcategory?.toLowerCase() === subcategory.toLowerCase(),
    )
  }

  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.price >= minPrice)
  }

  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice)
  }

  // Sort products
  switch (sort) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "newest":
      filteredProducts.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
      break
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating)
      break
    // Default is 'featured', no sorting needed
  }

  // Add artificial delay to simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(filteredProducts)
}

