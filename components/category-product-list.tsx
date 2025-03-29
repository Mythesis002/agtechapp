"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getProductsByCategory } from "@/lib/data"
import { Grid, List } from "lucide-react"

export function CategoryProductList({ categoryId }: { categoryId: string }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 9

  const products = getProductsByCategory(categoryId)

  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage)
  const currentProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">
          Showing {(currentPage - 1) * productsPerPage + 1}-{Math.min(currentPage * productsPerPage, products.length)}{" "}
          of {products.length} products
        </p>

        <div className="flex items-center gap-2">
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Select defaultValue="9">
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Show" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="18">18</SelectItem>
              <SelectItem value="36">36</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {currentProducts.map((product) => (
            <ProductCardList key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              &lt;
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              &gt;
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function ProductCardList({ product }: { product: any }) {
  return (
    <div className="border rounded-lg p-4 flex flex-col md:flex-row gap-4">
      <div className="md:w-1/4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-48 md:h-full object-cover rounded-md"
        />
      </div>

      <div className="md:w-3/4 flex flex-col">
        <div className="flex-grow">
          <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
            <a href={`/products/${product.id}`}>{product.name}</a>
          </h3>

          <div className="flex items-center mb-2">
            <div className="flex text-amber-500">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-xs text-muted-foreground ml-2">({product.reviews})</span>
          </div>

          <p className="text-muted-foreground mb-4">{product.description}</p>

          {product.features && (
            <ul className="list-disc list-inside text-sm text-muted-foreground mb-4">
              {product.features.slice(0, 3).map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="font-bold text-lg">₹{product.price}</div>
          <div className="flex gap-2">
            <Button variant="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              Wishlist
            </Button>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

