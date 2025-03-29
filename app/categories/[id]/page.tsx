import { Suspense } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { CategoryProductList } from "@/components/category-product-list"
import { CategoryFilters } from "@/components/category-filters"
import { ProductsLoading } from "@/components/products-loading"
import { getCategoryById } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function CategoryPage({ params }: { params: { id: string } }) {
  const category = getCategoryById(params.id)

  if (!category) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="mb-6">The category you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/categories">Browse All Categories</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link href="/categories" className="text-muted-foreground hover:text-foreground">
          Categories
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="font-medium">{category.name}</span>
      </nav>

      <div className="flex flex-col items-start mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className={`${category.color} ${category.textColor} p-3 rounded-full`}>{category.icon}</div>
          <h1 className="text-3xl font-bold">{category.name}</h1>
        </div>
        <p className="text-muted-foreground max-w-3xl">{category.description}</p>
      </div>

      <Separator className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="md:col-span-1">
          <CategoryFilters category={category} />
        </div>

        {/* Product Listing */}
        <div className="md:col-span-3">
          <Suspense fallback={<ProductsLoading />}>
            <CategoryProductList categoryId={params.id} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

