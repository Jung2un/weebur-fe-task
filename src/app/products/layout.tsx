import { ReactNode } from "react";
import style from "./page.module.css";
import { cookies, headers } from "next/headers";

export default async function Layout({ children }: { children: ReactNode }) {
  const cookie = await cookies();
  const header = await headers();

  const viewCookie = cookie.get("view_mode");
  const headerViewMode = header.get("x-view-mode");
  const viewMode = viewCookie?.value?.split(":")[0] ?? headerViewMode ?? "list";

  return (
    <div className={style.layout} data-view-mode={viewMode}>
      {children}
    </div>
  );
}