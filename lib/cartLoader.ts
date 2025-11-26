"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { loadCart } from "@/lib/cart/cartSlice";

export default function CartLoader() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      dispatch(loadCart(JSON.parse(saved)));
    }
  }, [dispatch]);

  return null;
}
