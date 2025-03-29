import { CategoryCard } from "@/components/category-card"
import { Leaf, Droplet, Bug, Tractor, Wheat, Sprout, Flower, Zap, Thermometer } from "lucide-react"

// Main categories with subcategories
const categories = [
  {
    id: "seeds",
    name: "Seeds",
    icon: <Wheat className="h-12 w-12" />,
    description: "High-quality seeds for various crops with excellent germination rates",
    color: "bg-green-100 dark:bg-green-900",
    textColor: "text-green-700 dark:text-green-300",
    image: "/placeholder.svg?height=300&width=300",
    subcategories: [
      { name: "Wheat Seeds", count: 12 },
      { name: "Rice Seeds", count: 15 },
      { name: "Corn Seeds", count: 8 },
      { name: "Vegetable Seeds", count: 24 },
      { name: "Fruit Seeds", count: 10 },
      { name: "Cotton Seeds", count: 6 },
    ],
  },
  {
    id: "fertilizers",
    name: "Fertilizers",
    icon: <Leaf className="h-12 w-12" />,
    description: "Organic and chemical fertilizers to enhance soil fertility and crop yield",
    color: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-700 dark:text-blue-300",
    image: "/placeholder.svg?height=300&width=300",
    subcategories: [
      { name: "Organic Fertilizers", count: 18 },
      { name: "NPK Fertilizers", count: 14 },
      { name: "Micronutrients", count: 9 },
      { name: "Biofertilizers", count: 7 },
      { name: "Liquid Fertilizers", count: 11 },
    ],
  },
  {
    id: "pesticides",
    name: "Pesticides",
    icon: <Bug className="h-12 w-12" />,
    description: "Effective pest control solutions to protect your crops from harmful insects",
    color: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-700 dark:text-red-300",
    image: "/placeholder.svg?height=300&width=300",
    subcategories: [
      { name: "Insecticides", count: 16 },
      { name: "Fungicides", count: 12 },
      { name: "Herbicides", count: 9 },
      { name: "Organic Pesticides", count: 8 },
      { name: "Rodenticides", count: 5 },
    ],
  },
  {
    id: "equipment",
    name: "Equipment",
    icon: <Tractor className="h-12 w-12" />,
    description: "Modern farming equipment and tools to increase efficiency and productivity",
    color: "bg-amber-100 dark:bg-amber-900",
    textColor: "text-amber-700 dark:text-amber-300",
    image: "/placeholder.svg?height=300&width=300",
    subcategories: [
      { name: "Tractors & Accessories", count: 8 },
      { name: "Hand Tools", count: 22 },
      { name: "Sprayers", count: 14 },
      { name: "Harvesting Equipment", count: 9 },
      { name: "Plows & Tillers", count: 11 },
      { name: "Storage Equipment", count: 7 },
    ],
  },
  {
    id: "irrigation",
    name: "Irrigation",
    icon: <Droplet className="h-12 w-12" />,
    description: "Water-efficient irrigation systems for optimal water management",
    color: "bg-cyan-100 dark:bg-cyan-900",
    textColor: "text-cyan-700 dark:text-cyan-300",
    image: "/placeholder.svg?height=300&width=300",
    subcategories: [
      { name: "Drip Irrigation", count: 15 },
      { name: "Sprinkler Systems", count: 12 },
      { name: "Water Pumps", count: 9 },
      { name: "Pipes & Fittings", count: 24 },
      { name: "Water Tanks", count: 8 },
      { name: "Irrigation Controllers", count: 6 },
    ],
  },
  {
    id: "organic",
    name: "Organic",
    icon: <Sprout className="h-12 w-12" />,
    description: "Certified organic products for sustainable and chemical-free farming",
    color: "bg-emerald-100 dark:bg-emerald-900",
    textColor: "text-emerald-700 dark:text-emerald-300",
    image: "/placeholder.svg?height=300&width=300",
    subcategories: [
      { name: "Organic Seeds", count: 18 },
      { name: "Organic Fertilizers", count: 14 },
      { name: "Organic Pesticides", count: 9 },
      { name: "Organic Soil Amendments", count: 11 },
      { name: "Organic Certification", count: 3 },
    ],
  },
  {
    id: "horticulture",
    name: "Horticulture",
    icon: <Flower className="h-12 w-12" />,
    description: "Specialized products for fruit, vegetable, and ornamental plant cultivation",
    color: "bg-pink-100 dark:bg-pink-900",
    textColor: "text-pink-700 dark:text-pink-300",
    image: "/placeholder.svg?height=300&width=300",
    subcategories: [
      { name: "Greenhouse Supplies", count: 12 },
      { name: "Grafting Tools", count: 8 },
      { name: "Plant Growth Regulators", count: 6 },
      { name: "Nursery Containers", count: 15 },
      { name: "Pruning Tools", count: 9 },
    ],
  },
  {
    id: "livestock",
    name: "Livestock",
    icon: <Zap className="h-12 w-12" />,
    description: "Products for animal husbandry and livestock management",
    color: "bg-orange-100 dark:bg-orange-900",
    textColor: "text-orange-700 dark:text-orange-300",
    image: "/placeholder.svg?height=300&width=300",
    subcategories: [
      { name: "Animal Feed", count: 16 },
      { name: "Veterinary Supplies", count: 12 },
      { name: "Housing Equipment", count: 8 },
      { name: "Breeding Supplies", count: 5 },
      { name: "Dairy Equipment", count: 7 },
    ],
  },
  {
    id: "climate-control",
    name: "Climate Control",
    icon: <Thermometer className="h-12 w-12" />,
    description: "Solutions for managing climate conditions in farms and greenhouses",
    color: "bg-purple-100 dark:bg-purple-900",
    textColor: "text-purple-700 dark:text-purple-300",
    image: "/placeholder.svg?height=300&width=300",
    subcategories: [
      { name: "Greenhouse Heaters", count: 8 },
      { name: "Cooling Systems", count: 7 },
      { name: "Humidity Controllers", count: 5 },
      { name: "Weather Stations", count: 4 },
      { name: "Shade Systems", count: 6 },
    ],
  },
]

export default function CategoriesPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col items-center mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Product Categories</h1>
        <p className="text-muted-foreground max-w-2xl">
          Explore our comprehensive range of agricultural products organized by category to find exactly what you need
          for your farm.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}

