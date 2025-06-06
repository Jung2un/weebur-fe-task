# [Weebur FE Task](https://weebur-fe-task.vercel.app/)

React + Next.js + TypeScript 기반의 프론트엔드 과제 프로젝트입니다.

<br>

## 📝 과제 설명

- 상품 데이터를 기반으로 상품 목록 페이지와 생성 페이지를 구현
- 뷰 모드는 첫 방문 시 50% 확률로 list 또는 grid로 랜덤 설정되며, 24시간 유지
- 상품 생성 페이지는 유효성 검사와 함께 최종 가격이 실시간으로 표시되도록 처리

## 🧪 기술 스택

| 항목       | 내용                     |
|------------|--------------------------|
| Framework  | React, Next.js (App Router) |
| Language   | TypeScript               |
| Styling    | CSS Modules              |
| Infra      | Vercel                   |


## ⚙️ View 모드 처리 방식과 고민들

#### 요구사항: 뷰 모드 랜덤 지정 + 유지

본 프로젝트는 **Next.js App Router** 기반 SSR 환경에서 동작하므로, 서버와 클라이언트 모두 접근 가능한 쿠키 기반 방식으로 View 모드를 처리했습니다.

`middleware.ts`에서 쿠키가 없거나 만료된 경우, `view_mode` 값을 랜덤 지정하고, 24시간 유효 기간을 가진 쿠키로 설정해 이후 동일한 모드를 유지할 수 있도록 구현했습니다.

---

- 서버에서 렌더링할 때 middleware.ts에서 설정한 쿠키가 즉시 반영되지 않아 적용되지 않는 문제 발생

💡 `Layout.tsx`에서는 쿠키를 우선 확인하고, 값이 없을 경우 `headers()`에서 설정한 값을 fallback으로 활용하는 로직을 추가해 안정적으로 처리할 수 있도록 구성했습니다.

<br>

- 상태 관리 및 서버 부하 최소화

💡 View 모드는 24시간 고정되므로, 클라이언트에서는 상태 변경 없이 유지되도록 처리했고, 서버에서는 유효한 쿠키에 대해 재설정을 방지하여 불필요한 쿠키 발급과 서버 부하를 최소화했습니다.

---

### 2025-06-01 업데이트

- `/product`: skeleton UI로 로딩 UX 개선
- `/product/new`: useActionState로 form 중복 제출 방지, 버튼 상태 동적 처리