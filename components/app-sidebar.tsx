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
import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
    setCategoryFilter,
    setPriceFilter,
    setRatingSort,
} from "@/lib/store/product/productsSlice";
import { Separator } from "./ui/separator";

interface AppSidebarProps {
    className?: string;
}

const prices = ["All", "$0 - $100", "$101 - $500", "$501 - $1000", "$1000+"];
const ratingSortOptions = ["All", "High to Low", "Low to High"];

export function AppSidebar({ className }: AppSidebarProps) {
    const { categoryOptions } = useAppSelector((state) => state.products);
    const dispatch = useAppDispatch();

    const categoryList = useMemo(() => ["All", ...categoryOptions], [categoryOptions]);

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState("All");
    const [selectedRatingSort, setSelectedRatingSort] = useState("All");

    // 🚀 Decide which filter is active (locked)
    const activeLock = useMemo(() => {
        if (selectedCategory !== "All") return "category";
        if (selectedPrice !== "All") return "price";
        if (selectedRatingSort !== "All") return "rating";
        return null;
    }, [selectedCategory, selectedPrice, selectedRatingSort]);

    const handleResetOthers = (lockType: "category" | "price" | "rating") => {
        if (lockType !== "category") {
            setSelectedCategory("All");
            dispatch(setCategoryFilter("All"));
        }
        if (lockType !== "price") {
            setSelectedPrice("All");
            dispatch(setPriceFilter("All"));
        }
        if (lockType !== "rating") {
            setSelectedRatingSort("All");
            dispatch(setRatingSort(null));
        }
    };

    return (
        <Sidebar className={`fixed left-0 w-64 bg-card text-card-foreground shadow-md z-50 flex flex-col justify-between ${className}`}>
            {/* Top Filters */}
            <div>
                <SidebarGroup>
                    <SidebarGroupLabel>Filters</SidebarGroupLabel>
                    <DropdownMenuSeparator />
                    <SidebarGroupContent className="space-y-4">
                        {/* CATEGORY FILTER */}
                        <DropdownMenu>
                            <DropdownMenuLabel>Category</DropdownMenuLabel>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    disabled={Boolean(activeLock && activeLock !== "category")}
                                    className="w-full justify-between"
                                >
                                    {selectedCategory}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuRadioGroup
                                    value={selectedCategory}
                                    onValueChange={(value) => {
                                        if (activeLock && activeLock !== "category") return;
                                        setSelectedCategory(value);
                                        dispatch(setCategoryFilter(value));
                                        if (value !== "All") handleResetOthers("category");
                                    }}
                                >
                                    {categoryList.map((c) => (
                                        <DropdownMenuRadioItem key={c} value={c}>{c}</DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenuSeparator />

                        {/* PRICE FILTER */}
                        <DropdownMenu>
                            <DropdownMenuLabel>Price</DropdownMenuLabel>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    disabled={Boolean(activeLock && activeLock !== "price")}
                                    className="w-full justify-between"
                                >
                                    {selectedPrice}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuRadioGroup
                                    value={selectedPrice}
                                    onValueChange={(value) => {
                                        if (activeLock && activeLock !== "price") return;
                                        setSelectedPrice(value);
                                        dispatch(setPriceFilter(value));
                                        if (value !== "All") handleResetOthers("price");
                                    }}
                                >
                                    {prices.map((p) => (
                                        <DropdownMenuRadioItem key={p} value={p}>{p}</DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenuSeparator />

                        {/* RATING SORT */}
                        <DropdownMenu>
                            <DropdownMenuLabel>Rating</DropdownMenuLabel>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    disabled={Boolean(activeLock && activeLock !== "rating")}
                                    className="w-full justify-between"
                                >
                                    {selectedRatingSort}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuRadioGroup
                                    value={selectedRatingSort}
                                    onValueChange={(value) => {
                                        if (activeLock && activeLock !== "rating") return;
                                        setSelectedRatingSort(value);
                                        if (value === "High to Low") dispatch(setRatingSort("high-to-low"));
                                        else if (value === "Low to High") dispatch(setRatingSort("low-to-high"));
                                        else dispatch(setRatingSort(null));

                                        if (value !== "All") handleResetOthers("rating");
                                    }}
                                >
                                    {ratingSortOptions.map((option) => (
                                        <DropdownMenuRadioItem key={option} value={option}>{option}</DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </SidebarGroupContent>
                </SidebarGroup>
            </div>

            {/* Bottom Info Section */}
            <SidebarGroup className="mt-auto mb-15">
                <div className="flex-col">
                    <div className="space-y-2 pt-10 mb-auto">
                        <h5 className="text-sm leading-none font-medium">About Me</h5>
                        <p className="text-muted-foreground text-sm">
                            Manoj Pun - Web Developer !!
                        </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex h-5 items-center space-x-4 text-sm">
                        <a
                            href="https://github.com/manojpun7/nepasys"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            Project Github Link
                        </a>
                        <Separator orientation="vertical" />
                        <a
                            href="/cv/manojpun__webdeveloper.pdf"
                            download
                            className="hover:underline"
                        >
                            Download CV
                        </a>
                    </div>
                </div>
            </SidebarGroup>
        </Sidebar>

    );
}
