"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface CategoryFiltersProps {
  category: any // Using any for simplicity, but should be properly typed
}

export function CategoryFilters({ category }: CategoryFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("featured")

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory) ? prev.filter((item) => item !== subcategory) : [...prev, subcategory],
    )
  }

  const clearFilters = () => {
    setPriceRange([0, 5000])
    setSelectedSubcategories([])
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-wrap gap-2">
            {selectedSubcategories.map((subcategory) => (
              <Badge key={subcategory} variant="secondary" className="flex items-center gap-1">
                {subcategory}
                <button
                  className="ml-1 rounded-full hover:bg-muted p-0.5"
                  onClick={() => handleSubcategoryChange(subcategory)}
                >
                  ✕
                </button>
              </Badge>
            ))}
            {(selectedSubcategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 5000) && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort">Sort By</Label>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger id="sort">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Accordion type="multiple" defaultValue={["subcategories", "price", "brands", "ratings"]}>
        <AccordionItem value="subcategories">
          <AccordionTrigger>Subcategories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {category.subcategories.map((subcategory: any) => (
                <div key={subcategory.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={`subcategory-${subcategory.name}`}
                    checked={selectedSubcategories.includes(subcategory.name)}
                    onCheckedChange={() => handleSubcategoryChange(subcategory.name)}
                  />
                  <Label
                    htmlFor={`subcategory-${subcategory.name}`}
                    className="text-sm font-normal cursor-pointer flex items-center justify-between w-full"
                  >
                    <span>{subcategory.name}</span>
                    <span className="text-xs text-muted-foreground">({subcategory.count})</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                max={5000}
                step={100}
                onValueChange={(value) => setPriceRange(value as number[])}
              />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="min-price">Min</Label>
                  <Input
                    id="min-price"
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                    className="w-24"
                  />
                </div>
                <div>
                  <Label htmlFor="max-price">Max</Label>
                  <Input
                    id="max-price"
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-24"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["AgTech Solutions", "FarmEx", "GreenLife", "CropMaster", "SoilRich"].map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox id={`brand-${brand}`} />
                  <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ratings">
          <AccordionTrigger>Ratings</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="text-sm font-normal cursor-pointer flex items-center">
                    <span className="text-amber-500 mr-1">
                      {"★".repeat(rating)}
                      {"☆".repeat(5 - rating)}
                    </span>
                    {rating === 5 ? "& up" : "& up"}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

