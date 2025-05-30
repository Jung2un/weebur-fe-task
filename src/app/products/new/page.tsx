import Link from "next/link";
import { Metadata } from "next";
import style from "./page.module.css";
import { BackIcon } from "@/components/Icon";
import ProductForm from "@/components/ProductForm";

export const metadata: Metadata = {
  title: "상품 생성",
  description: "상품 생성 페이지",
  openGraph: {
    title: "상품 생성",
    description: "상품 생성 페이지",
  }
}

export default function Page() {
  return (
    <div className={style.page}>
      <div className={style.header}>
        <Link href="/products" className={style.back}>{<BackIcon />}</Link>
        <h1 className={style.title}>상품 생성</h1>
      </div>
      <ProductForm />
    </div>
  );
}