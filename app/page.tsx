import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CategorySection } from "@/components/category-section"
import { FarmerTestimonials } from "@/components/farmer-testimonials"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6">
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <FarmerTestimonials />
    </div>
  )
}

