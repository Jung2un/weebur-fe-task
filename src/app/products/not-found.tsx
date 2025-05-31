"use client";

import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logoWrapper}>
          <h1 className={styles.title}>WEEBUR FE 코딩 과제</h1>
          <p className={styles.subtitle}>죄송합니다. 페이지를 찾을 수 없습니다.</p>
        </div>

        <div className={styles.content}>
          <h2 className={styles.errorCode}>404</h2>
          <p className={styles.description}>
            요청하신 페이지가 존재하지 않거나<br />
            주소가 잘못 입력되었을 수 있습니다.
          </p>
          <Link href="/" className={styles.homeButton}>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
