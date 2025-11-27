"use client";

import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setCategoryFilter,
  setPriceFilter,
  setRatingSort,
} from "@/lib/store/product/productsSlice";

interface AppSidebarProps {
  className?: string;
}

const prices = ["All", "$0 - $100", "$101 - $500", "$501 - $1000", "$1000+"];
const ratingSortOptions = ["All", "High to Low", "Low to High"]; // ✅ 3 UI options

export function AppSidebar({ className }: AppSidebarProps) {
  const { categoryOptions } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  // ✅ Use extracted real categories
  const categoryList = ["All", ...categoryOptions];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedRatingSort, setSelectedRatingSort] = useState("All");

  return (
    <Sidebar
      className={`fixed left-0 w-64 bg-card text-card-foreground shadow-md z-50 ${className}`}
    >
      <SidebarGroup className="mt-4">
        <SidebarGroupLabel>Filters</SidebarGroupLabel>
        <DropdownMenuSeparator />

        <SidebarGroupContent className="space-y-4">
          {/* CATEGORY DROP */}
          <DropdownMenu>
            <DropdownMenuLabel>Category</DropdownMenuLabel>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={selectedCategory}
                onValueChange={(value: string) => {
                  setSelectedCategory(value);
                  dispatch(setCategoryFilter(value)); // ✅ works now
                }}
              >
                {categoryList.map((c) => (
                  <DropdownMenuRadioItem key={c} value={c}>
                    {c}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenuSeparator />

          {/* PRICE DROP */}
          <DropdownMenu>
            <DropdownMenuLabel>Price</DropdownMenuLabel>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedPrice}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={selectedPrice}
                onValueChange={(value: string) => {
                  setSelectedPrice(value);
                  dispatch(setPriceFilter(value));
                }}
              >
                {prices.map((p) => (
                  <DropdownMenuRadioItem key={p} value={p}>
                    {p}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenuSeparator />

          {/* RATING SORT DROP */}
          <DropdownMenu>
            <DropdownMenuLabel>Rating</DropdownMenuLabel>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {selectedRatingSort}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={selectedRatingSort}
                onValueChange={(value: string) => {
                  setSelectedRatingSort(value);

                  if (value === "High to Low")
                    dispatch(setRatingSort("high-to-low"));
                  else if (value === "Low to High")
                    dispatch(setRatingSort("low-to-high"));
                  else dispatch(setRatingSort(null)); // ✅ "All" case
                }}
              >
                {ratingSortOptions.map((option) => (
                  <DropdownMenuRadioItem key={option} value={option}>
                    {option}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  );
}
