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

// ✅ Import tooltip components
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { totalQuantity } = useAppSelector((state) => state.cart);
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);
    dispatch(setSearchTerm(value));
  };

  return (
    <div className="flex justify-evenly items-center pb-3 m-2 sticky top-0 z-10 bg-background/95 backdrop-blur border-b">

      {/* ✅ LOGO */}
      <TooltipProvider>

       <Tooltip>
        <TooltipTrigger>
           <h2
          onClick={() => router.push("/")}
          className="text-3xl font-semibold tracking-tight cursor-pointer"
        >
          NEPASYS Assignment!
        </h2>

        </TooltipTrigger>
        <TooltipContent>
          <p>Click to Home</p>
        </TooltipContent>
       </Tooltip>

      </TooltipProvider>

      {/* ✅ SEARCH */}
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

      {/* ✅ Tooltip for CART */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onClick={() => router.push("/cart")}
              className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition"
            >
              <ShoppingCart />
              <p className="text-lg font-medium">({totalQuantity})</p>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cart items</p>
          </TooltipContent>
        </Tooltip>

        {/* ✅ Tooltip for THEME TOGGLE */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-pointer">
              <ModeToggle />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Change Theme</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
