import Link from "next/link";
import { Metadata } from "next";
import style from "./page.module.css";
import { cookies } from "next/headers";
import { PlusIcon } from "@/components/Icon";
import { ProductsParams } from "@/types/product";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "상품 목록",
  description: "상품 리스트 페이지",
  openGraph: {
    title: "상품 목록",
    description: "상품 리스트 페이지",
  }
}

export default async function Page() {
  const res = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>상품 데이터를 불러오지 못했습니다 다시 시도해주세요</div>;
  }

  const data = await res.json();
  const products: ProductsParams[] = data.products.slice(0, 20);

  // 쿠키에서 뷰 모드 추출
  const cookie = await cookies();
  const rawCookie = cookie.get("view_mode")?.value;
  const viewMode = (rawCookie?.split(":")[0]) as "list" | "grid" | undefined;

  return (
    <div className={style.page}>
      <div className={style.container}>
        <div className={style.left}>
          <h2>상품 목록</h2>
          <div className={style.view}>{viewMode === 'list' ? '리스트 뷰' : '그리드 뷰'}</div>
          <div className={style.fix}>24시간 고정</div>
        </div>
        <div className={style.right}>
          <Link href="/products/new" className={style.button}>
            <PlusIcon /> 상품 생성하기
          </Link>
        </div>
      </div>

      <div className={`${viewMode === "list" ? style.list : style.grid}`}>
        {viewMode &&
          products.map((item) => (
            <ProductCard key={item.id} product={item} viewMode={viewMode} />
          ))}
      </div>
    </div>
  );
}
