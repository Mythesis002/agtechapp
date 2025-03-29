import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="bg-gradient-to-r from-primary/90 to-accent/80 text-white">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 py-12 md:py-20">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Quality Agricultural Products for Better Farming
            </h1>
            <p className="text-lg opacity-90">
              Discover premium seeds, fertilizers, pesticides, and farming equipment at competitive prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/categories">Explore Categories</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden md:flex items-center justify-center">
            <Image
              src="https://res.cloudinary.com/dkr5qwdjd/image/upload/v1742750995/adarshsin9hh_agtechsollutions.webp"
              alt="Farmer in field"
              width={500}
              height={400}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}

