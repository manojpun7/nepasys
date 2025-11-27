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
    <div className="flex flex-wrap justify-around items-center p-2 sticky top-0 z-10 bg-background/95 backdrop-blur border-b gap-2">

      {/* LOGO */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <h2
              onClick={() => router.push("/")}
              className="text-md sm:text-2xl md:text-3xl font-semibold tracking-tight cursor-pointer truncate max-w-[200px] sm:max-w-[300px]"
              title="NEPASYS"
            >
              NEPASYS
            </h2>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to Home</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* SEARCH */}
      <div className="flex-1 max-w-full sm:max-w-xs md:max-w-sm">
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

      {/* CART & THEME */}
      <div className="flex items-center gap-4">
        <TooltipProvider>
          {/* CART */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                onClick={() => router.push("/cart")}
                className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:opacity-70 transition text-sm sm:text-base"
              >
                <ShoppingCart />
                <span>({totalQuantity})</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cart items</p>
            </TooltipContent>
          </Tooltip>

          {/* THEME TOGGLE */}
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

    </div>
  );
}
