import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Truck, Shield, RotateCcw, Star } from "lucide-react"
import { ProductReviews } from "@/components/product-reviews"
import { RelatedProducts } from "@/components/related-products"

// This would normally come from an API or database
const product = {
  id: "1",
  name: "Premium Wheat Seeds",
  description:
    "High-yield wheat seeds for optimal crop production. These premium quality seeds are carefully selected to ensure maximum germination rates and robust plant growth. Ideal for various soil types and climate conditions.",
  price: 499,
  discountPrice: 449,
  image: "/placeholder.svg?height=500&width=500",
  category: "Seeds",
  brand: "AgTech",
  rating: 4.8,
  reviews: 124,
  stock: 50,
  isNew: true,
  features: [
    "High germination rate (95%+)",
    "Disease resistant variety",
    "Suitable for all soil types",
    "Drought tolerant",
    "High yield potential (40-45 quintals per acre)",
  ],
  specifications: {
    "Seed Type": "Hybrid",
    "Germination Rate": "95%+",
    "Seed Treatment": "Fungicide treated",
    Packaging: "5kg moisture-resistant bag",
    "Shelf Life": "12 months when stored properly",
    Certification: "ISI Certified",
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-muted/30 rounded-lg p-6 flex items-center justify-center">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={500}
            height={500}
            className="object-contain max-h-[400px]"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.category}</Badge>
              {product.isNew && <Badge className="bg-primary">New</Badge>}
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex text-amber-500 mr-2">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            {product.discountPrice ? (
              <>
                <span className="text-2xl font-bold">₹{product.discountPrice}</span>
                <span className="text-lg text-muted-foreground line-through">₹{product.price}</span>
                <Badge className="ml-2 bg-green-600">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </Badge>
              </>
            ) : (
              <span className="text-2xl font-bold">₹{product.price}</span>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-2">
            <div className="flex items-center">
              <span className="font-medium w-24">Brand:</span>
              <span>{product.brand}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-24">Availability:</span>
              {product.stock > 0 ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  In Stock ({product.stock} available)
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="gap-2">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Heart className="h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm">Free shipping over ₹1000</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Secure payment</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span className="text-sm">30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs defaultValue="features" className="mb-12">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="features"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
          >
            Features
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
          >
            Reviews ({product.reviews})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="pt-6">
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Star className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="specifications" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex">
                <span className="font-medium w-40">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6">
          <ProductReviews productId={params.id} />
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <RelatedProducts category={product.category} currentProductId={params.id} />
    </div>
  )
}

