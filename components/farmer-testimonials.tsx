import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Punjab",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "AgTech has transformed my farming experience. Their high-quality seeds have increased my crop yield by 30%!",
  },
  {
    id: 2,
    name: "Anita Patel",
    location: "Gujarat",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The organic fertilizers from AgTech have improved my soil health significantly. My vegetables are now more nutritious and tastier.",
  },
  {
    id: 3,
    name: "Suresh Reddy  My vegetables are now more nutritious and tastier.",
  },
  {
    id: 3,
    name: "Suresh Reddy",
    location: "Andhra Pradesh",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The customer service at AgTech is exceptional. They helped me choose the right pesticides for my crops and provided valuable farming advice.",
  },
]

export function FarmerTestimonials() {
  return (
    <section className="py-12 bg-muted/50 rounded-lg my-12">
      <div className="container">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What Farmers Say</h2>
          <p className="text-muted-foreground max-w-2xl">
            Hear from farmers who have transformed their agricultural practices with our products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary mb-4 opacity-50" />
                <p className="mb-6 italic text-muted-foreground">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

