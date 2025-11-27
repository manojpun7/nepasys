"use client";

import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useAppDispatch } from "@/lib/store/hooks";
import { addToCart } from "@/lib/cart/cartSlice";
import { toast } from "sonner"; 
type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export default function ProductCard({ product }: { product: ProductType }) {
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        category: product.category,
      })
    );

    toast.success("Cart item added successfully !");
  };

  return (
    <Card className=" flex flex-col h-full rounded-xl overflow-hidden bg-card text-card-foreground border hover:shadow-xl transition-all duration-300">

      {/* Thumbnail */}
      <CardHeader className="p-0">
        <div className="relative h-48 w-full bg-muted">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover"
          />

          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground shadow-md">
            {product.category}
          </Badge>
        </div>
      </CardHeader>

      {/* Body */}
      <CardContent className="flex flex-col grow p-4 space-y-2">
        <h2 className="font-semibold text-lg truncate">{product.title}</h2>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* ⭐ Rating */}
        <div className="flex items-center gap-1 text-yellow-500 mt-1">
          <Star size={16} fill="currentColor" />
          <span className="text-sm font-medium">{product.rating}</span>
        </div>

        {/* 💰 Price Section */}
        <div className="flex items-center justify-between mt-3">
          <p className="text-xl font-bold">${product.price}</p>

          <Badge className="bg-destructive text-destructive-foreground">
            -{product.discountPercentage}%
          </Badge>
        </div>

        {/* Spacer */}
        <div className="mt-auto"></div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-4">
        <Button className="w-full" variant="default" onClick={handleAdd}>
          Add to Cart
        </Button>
      </CardFooter>

    </Card>
  );
}
