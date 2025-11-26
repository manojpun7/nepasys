"use client";

import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSearchTerm } from "@/lib/store/product/productsSlice";
import ModeToggle from "../theme/ModeToggle";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();  // ✅ Next.js router for navigation

  const { totalQuantity } = useAppSelector(state => state.cart);
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);
    dispatch(setSearchTerm(value)); // ✅ updates search filter in product slice
  };

  return (
    <div className="flex justify-evenly items-center m-1 sticky top-0 z-10 bg-background/95 backdrop-blur border-b">

      {/* ✅ LOGO / HEADING */}
      <h2  onClick={() => router.push("/")} className="text-3xl font-semibold tracking-tight cursor-pointer">
        NEPASYS Assignment!
      </h2>

      {/* ✅ SEARCH INPUT */}
      <div className="grid w-full max-w-sm gap-6">
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* ✅ Clickable Cart Icon that Redirects to /cart */}
      <div
        onClick={() => router.push("/cart")} // ✅ redirect on click
        className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition"
      >
        <ShoppingCart />
        <p className="text-lg font-medium">({totalQuantity})</p>
      </div>

      {/* ✅ Dark Mode Toggle */}
      <ModeToggle />
    </div>
  );
}
