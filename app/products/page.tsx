import { Suspense } from "react"
import { ProductList } from "@/components/product-list"
import { ProductFilters } from "@/components/product-filters"
import { ProductsLoading } from "@/components/products-loading"

export default function ProductsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProductFilters />
        </div>
        <div className="md:col-span-3">
          <Suspense fallback={<ProductsLoading />}>
            <ProductList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

