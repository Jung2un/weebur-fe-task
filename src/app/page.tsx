import Link from "next/link";
import Image from 'next/image';
import { Metadata } from "next";
import style from "./page.module.css";

export const metadata: Metadata = {
  title: "WEEBUR",
  description: "FE 코딩과제",
  metadataBase: new URL("https://weebur-fe-task.vercel.app"),
  openGraph: {
    title: "WEEBUR",
    description: "FE 코딩과제",
    images: ["/logo.png"],
  }
}

export default function Home() {
  return (
    <div className={style.page}>
      <div className={style.wrapper}>
        <div className={style.header}>
          <div className={style.logo}>
            <Image src="/logo.png" alt="로고" width={50} height={50}/>
          </div>
          <h1 className={style.title}>WEEBUR FE 코딩 과제</h1>
          <p className={style.subtitle}>상품 조회 및 등록 가능한 페이지 입니다</p>
        </div>

        <div className={style.container}>
          <div className={style.card}>
            <div className={style.icon}>🗂️</div>
            <h2 className={style.card_title}>상품 목록</h2>
            <p className={style.description}>
              리스트 또는 그리드 형태로 표시됩니다
            </p>
            <Link href='/products' className={style.button}>목록 보기</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
