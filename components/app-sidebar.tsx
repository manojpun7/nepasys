import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface AppSidebarProps {
  className?: string
}

const categories = ["All", "Smartphones", "Laptops", "Accessories"]
const prices = ["All", "$0 - $100", "$101 - $500", "$501 - $1000", "$1000+"]
const ratings = ["All", "4 Stars & Up", "3 Stars & Up", "2 Stars & Up", "1 Star & Up"]

export function AppSidebar({ className }: AppSidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPrice, setSelectedPrice] = useState("All")
  const [selectedRating, setSelectedRating] = useState("All")

  return (
    <Sidebar
      className={`fixed left-0 w-64 bg-card text-card-foreground shadow-md z-50 ${className}`}
    >
      <SidebarGroup className="mt-4">
        <SidebarGroupLabel>Filters</SidebarGroupLabel>
        <SidebarGroupContent className="space-y-4">
          {/* Category Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Choose Category</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                {categories.map((c) => (
                  <DropdownMenuRadioItem key={c} value={c}>
                    {c}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Price Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedPrice}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select Price Range</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={selectedPrice}
                onValueChange={setSelectedPrice}
              >
                {prices.map((p) => (
                  <DropdownMenuRadioItem key={p} value={p}>
                    {p}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Rating Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedRating}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select Minimum Rating</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={selectedRating}
                onValueChange={setSelectedRating}
              >
                {ratings.map((r) => (
                  <DropdownMenuRadioItem key={r} value={r}>
                    {r}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  )
}
