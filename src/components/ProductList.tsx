"use client";

import { useEffect, useState } from "react";
import { ProductsParams } from "@/types/product";
import style from "../app/products/page.module.css";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";

type ProductListProps = {
  products: ProductsParams[];
  viewMode: "list" | "grid";
};

export default function ProductList({ products, viewMode }: ProductListProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // 0.5초 delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${viewMode === "list" ? style.list : style.grid}`}>
      {loading
        ? Array.from({ length: 8 }).map((_, idx) => (
          <ProductCardSkeleton key={`skeleton-${idx}`} viewMode={viewMode} />
        ))
        : products.map((item) => (
          <ProductCard key={item.id} product={item} viewMode={viewMode} />
        ))}
    </div>
  );
}
