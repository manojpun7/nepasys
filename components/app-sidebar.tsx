"use client";

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
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setCategoryFilter } from "@/lib/store/product/productsSlice";

interface AppSidebarProps {
    className?: string
}

const prices = ["All", "$0 - $100", "$101 - $500", "$501 - $1000", "$1000+"]
const ratings = ["All", "4 Stars & Up", "3 Stars & Up", "2 Stars & Up", "1 Star & Up"]

export function AppSidebar({ className }: AppSidebarProps) {
    const { categories } = useAppSelector((state) => state.categories)

    const dispatch  = useAppDispatch()

    const categoryList = ["All", ...categories] // prepend "All"

    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedPrice, setSelectedPrice] = useState("All")
    const [selectedRating, setSelectedRating] = useState("All")

    return (
        <Sidebar
            className={`fixed left-0 w-64 bg-card text-card-foreground shadow-md z-50 ${className}`}
        >
            <SidebarGroup className="mt-4">
                <SidebarGroupLabel>Filters</SidebarGroupLabel>
                <DropdownMenuSeparator />

                <SidebarGroupContent className="space-y-4">
                    {/* Category Dropdown */}
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
                                onValueChange={(value) => {
                                    setSelectedCategory(value);
                                    dispatch(setCategoryFilter(value));  // 🚀 FILTER PRODUCTS HERE
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

                    {/* Price Dropdown */}
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

                    <DropdownMenuSeparator />

                    {/* Rating Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuLabel>Rating</DropdownMenuLabel>

                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                                {selectedRating}
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
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
