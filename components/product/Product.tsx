"use client";

import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchProducts, increaseLimit } from "@/lib/store/product/productsSlice";
import ProductCard from "@/components/product/ProductCard";
import { SkeletonCard } from "../SkeletonCard";
import { Button } from "@/components/ui/button";
import { fetchCategories } from "@/lib/store/product/category/categorySlice";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const {
    filteredItems,
    limit,
    hasMore,
    loadingInitial,
    loadingMore,
  } = useAppSelector((state) => state.products);

  // Fetch products when limit changes
  useEffect(() => {
    dispatch(fetchProducts(limit));
  }, [dispatch, limit]);

  // Fetch categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingMore) {
        dispatch(increaseLimit());
      }
    });

    const current = bottomRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [dispatch, hasMore, loadingMore]);

  const isInitialLoad = filteredItems.length === 0 && loadingInitial;
  const skeletonCount =
    filteredItems.length === 0
      ? 8
      : loadingMore
        ? 4
        : 0;
  return (
    <div className="p-6">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {/* Skeletons */}
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={`skeleton-${i}`} />
        ))}

      </div>

      {/* Load More Button */}
      {hasMore && !isInitialLoad && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={() => dispatch(increaseLimit())}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "loading"}
          </Button>
        </div>
      )}

      {/* Observer div for infinite scroll */}
      {hasMore && <div ref={bottomRef} className="h-10" />}
    </div>
  );
}
