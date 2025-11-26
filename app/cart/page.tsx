"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { X } from "lucide-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { loadCart, removeFromCart } from "@/lib/cart/cartSlice";

export default function TableDemo() {
  const dispatch = useAppDispatch();
  const { cart, totalQuantity, totalPrice } = useAppSelector(state => state.cart);

  // ✅ Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      dispatch(loadCart(JSON.parse(saved)));
    }
  }, [dispatch]);

  // ✅ Remove item completely from Redux + localStorage
  const handleDelete = (id: number) => {
    dispatch(removeFromCart(id));

    const saved = localStorage.getItem("cart");
    if (saved) {
      const parsed: typeof cart = JSON.parse(saved);
      const updated = parsed.filter(item => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      dispatch(loadCart(updated)); // sync again after delete
    }
  };

  return (
    <Table>
      <TableCaption>Your Cart Items</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Item Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {cart.map(item => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>${item.price.toFixed(2)}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell className="text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </TableCell>

            <TableCell className="text-right">
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {/* ✅ Updated Footer Without any errors */}
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Items: {totalQuantity}</TableCell>
          <TableCell className="text-right font-semibold">
            Total Price: ${totalPrice.toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
