"use client";

import style from "../ProductCard.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductCardSkeleton({viewMode}: { viewMode: "list" | "grid" }) {
  return (
    <div className={`${style.product_card} ${style[viewMode]}`}>
      <div className={style.thumbnail}>
        <Skeleton width={120} height={120} />
      </div>
      <div className={style.info}>
        <h3 className={style.title}>
          <Skeleton width={`80%`} />
        </h3>
        <p className={style.desc}>
          <Skeleton count={2} />
        </p>
        <div className={style.meta}>
          <Skeleton width={`30%`} />
          <Skeleton width={`20%`} />
        </div>
      </div>
    </div>
  );
}
