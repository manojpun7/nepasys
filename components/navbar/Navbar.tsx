"use client";

import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSearchTerm } from "@/lib/store/product/productsSlice";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import ModeToggle from "../theme/ModeToggle";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");

  // 👇 Select cart totals from cart slice
  const { totalQuantity, totalPrice } = useAppSelector((state) => state.cart);

  const handleSearch = (value: string) => {
    setQuery(value);
    dispatch(setSearchTerm(value));
  };

  return (
    <div className="flex justify-evenly items-center m-1 sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        NEPASYS Assignment!
      </h2>

      <div className="grid w-full max-w-sm gap-6">
        <InputGroup>
          <InputGroupInput
            placeholder="Search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              dispatch(setSearchTerm(e.target.value));
            }}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* 👇 Replace static (3) with dynamic totalQuantity */}
      <div className="flex items-center gap-2">
        <ShoppingCart />
        <p>({totalQuantity})</p>
      </div>

      <ModeToggle />
    </div>
  );
}
