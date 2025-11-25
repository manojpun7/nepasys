"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchProducts, increaseLimit } from "@/lib/store/productsSlice";
import ProductCard from "@/components/product/ProductCard";
import { SkeletonCard } from "../SkeletonCard";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const dispatch = useAppDispatch();

  const { items, limit, loading, hasMore } = useAppSelector(
    (state) => state.products
  );

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Fetch products
  useEffect(() => {
    dispatch(fetchProducts(limit));
  }, [dispatch, limit]);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        dispatch(increaseLimit());
      }
    });

    const current = bottomRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [dispatch, hasMore, loading]);


  const isInitialLoad = items.length == 0 && loading;
  const skeletonCount = loading ? 4 : 0;

  return (
    <div className="p-6">

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {/* Skeletons */}
        {loading &&
          Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))}
      </div>

      {hasMore && !isInitialLoad && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={() => dispatch(increaseLimit())}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      {hasMore && <div ref={bottomRef} className="h-10" />}
    </div>
  );
}
