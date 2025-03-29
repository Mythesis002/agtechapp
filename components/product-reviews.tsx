import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"

// Sample reviews data
const reviews = [
  {
    id: 1,
    user: {
      name: "Rajesh Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Punjab",
    },
    rating: 5,
    date: "2023-10-15",
    title: "Excellent quality seeds",
    comment:
      "I've been using these wheat seeds for the past two seasons and the yield has been exceptional. The germination rate is very high and the plants are resistant to common diseases. Highly recommended for all farmers.",
    helpful: 24,
  },
  {
    id: 2,
    user: {
      name: "Anita Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Gujarat",
    },
    rating: 4,
    date: "2023-09-22",
    title: "Good product, fast delivery",
    comment:
      "The seeds arrived quickly and were well packaged. The quality seems good, though I've only just planted them. Based on the germination so far, I'm optimistic about the yield.",
    helpful: 12,
  },
  {
    id: 3,
    user: {
      name: "Suresh Reddy",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Andhra Pradesh",
    },
    rating: 5,
    date: "2023-08-30",
    title: "Best seeds in the market",
    comment:
      "These are by far the best wheat seeds I've used in my 15 years of farming. The yield was 40% higher than my previous crop. Will definitely purchase again next season.",
    helpful: 36,
  },
]

// Calculate rating distribution
const ratingCounts = [0, 0, 0, 0, 0]
reviews.forEach((review) => {
  ratingCounts[review.rating - 1]++
})

const totalReviews = reviews.length
const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews

export function ProductReviews({ productId }: { productId: string }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Rating Summary */}
        <div className="md:col-span-1">
          <div className="flex flex-col items-center p-6 border rounded-lg">
            <h3 className="text-2xl font-bold mb-2">{averageRating.toFixed(1)}</h3>
            <div className="flex text-amber-500 mb-2">
              {"★".repeat(Math.floor(averageRating))}
              {"☆".repeat(5 - Math.floor(averageRating))}
            </div>
            <p className="text-sm text-muted-foreground mb-6">Based on {totalReviews} reviews</p>

            <div className="w-full space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm w-2">{rating}</span>
                  <Star className="h-4 w-4 text-amber-500" />
                  <Progress value={(ratingCounts[rating - 1] / totalReviews) * 100} className="h-2" />
                  <span className="text-sm w-8">{ratingCounts[rating - 1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Write a Review */}
        <div className="md:col-span-2">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Rating</label>
                <div className="flex text-gray-300">
                  <Star className="h-6 w-6 cursor-pointer hover:text-amber-500" />
                  <Star className="h-6 w-6 cursor-pointer hover:text-amber-500" />
                  <Star className="h-6 w-6 cursor-pointer hover:text-amber-500" />
                  <Star className="h-6 w-6 cursor-pointer hover:text-amber-500" />
                  <Star className="h-6 w-6 cursor-pointer hover:text-amber-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Review Title</label>
                <input type="text" className="w-full p-2 border rounded-md" placeholder="Give your review a title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <Textarea placeholder="Write your review here..." className="min-h-[120px]" />
              </div>
              <Button>Submit Review</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-6">
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={review.user.avatar} alt={review.user.name} />
                  <AvatarFallback>
                    {review.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{review.user.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.user.location}</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(review.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            <div className="flex text-amber-500 mb-2">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>

            <h5 className="font-semibold mb-2">{review.title}</h5>
            <p className="text-muted-foreground mb-4">{review.comment}</p>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-muted-foreground">{review.helpful} people found this helpful</span>
              </div>
              <Button variant="outline" size="sm">
                Helpful
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

