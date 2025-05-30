"use client";

import React, {useCallback, useState} from "react";
import { useRouter } from "next/navigation";
import style from "./ProductForm.module.css";
import { AddProduct } from "@/types/addProduct";
import { CheckIcon, CrossIcon } from "@/components/Icon";

export default function ProductForm() {
  const [name, setName] = useState(""); // 상품명
  const [desc, setDesc] = useState(""); // 상품 설명
  const [price, setPrice] = useState(""); // 가격
  const [discount, setDiscount] = useState(""); // 할인율
  const [brand, setBrand] = useState(""); // 브랜드
  const brandType = ['Apple', 'Samsung', 'Weebur'] as const;
  type Brand = typeof brandType[number];

  const router = useRouter();

  // 화면 유효성
  const isValid = {
    name: name.trim().length > 0 && name.length <= 15,
    price: Number(price) >= 1000,
    brand: brand.trim() !== "",
    discount: Number(discount) <= 100,
  };
  const validation = [
    { key: "name", valid: isValid.name, label: "상품명 입력 (15자 이내)" },
    { key: "price", valid: isValid.price, label: "가격 입력 (1,000원 이상)" },
    { key: "brand", valid: isValid.brand, label: "브랜드 선택" },
    { key: "discount", valid: isValid.discount, label: "할인율 (100%이하)" },
  ];
  const canSubmit = Object.values(isValid).every(Boolean);

  // 유효성 검사
  const validateFormData = () => {
    const priceNum = Number(price);
    const discountNum = Number(discount);

    if (!name.trim() || name.length > 15) {
      alert("상품명은 15자 이내로 입력되어야 합니다.");
      return false;
    }

    if (isNaN(priceNum) || priceNum < 1000) {
      alert("가격은 1000원 이상으로 입력해야 합니다.");
      return false;
    }

    if (!brandType.includes(brand as Brand)) {
      alert("Apple, Samsung, Weebur 중 하나가 선택 되어야 합니다.");
      return false;
    }

    if (discount && (isNaN(discountNum) || discountNum > 100)) {
      alert("할인율은 100이내로 입력해야 합니다.");
      return false;
    }

    return true;
  };

  // API 호출
  const submitProduct = useCallback(async (payload: AddProduct) => {
    try {
      const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      router.push('/products');
    } catch (err) {
      console.error("상품 생성 실패:", err);
      alert("상품 등록에 실패했습니다.");
    }
  }, [router]);

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFormData()) return;

    const payload: AddProduct = {
      title: name,
      description: desc || undefined,
      price: Number(price),
      discountPercentage: discount ? Number(discount) : undefined,
      brand: brand as Brand,
    };

    await submitProduct(payload);
  };

  // 최종 가격 계산
  const finalPrice = (): number => {
    const priceNum = Number(price);
    const discountNum = Number(discount);
    if (isNaN(priceNum) || isNaN(discountNum)) return 0;
    return Math.max(0, Math.floor(priceNum * (1 - discountNum / 100)));
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.group}>
        <label>상품명 <span className={style.required}>*</span></label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="상품명을 입력하세요"
        />
      </div>

      <div className={style.group}>
        <label>상품 설명</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="상품에 대한 설명을 입력해주세요"
        />
      </div>

      <div className={style.group}>
        <label>가격 <span className={style.required}>*</span></label>
        <div className={style.inline}>
          <input
            type="number"
            value={price}
            placeholder="1000"
            onChange={(e) => setPrice(e.target.value)}
          />
          <span>원</span>
        </div>
      </div>

      <div className={style.group}>
        <label>할인율</label>
        <div className={style.inline}>
          <input
            type="number"
            value={discount}
            placeholder="0"
            onChange={(e) => setDiscount(e.target.value)}
          />
          <span>%</span>
        </div>
      </div>

      <div className={style.group}>
        <label>브랜드 <span className={style.required}>*</span></label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">브랜드를 선택해주세요</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Weebur">Weebur</option>
        </select>
      </div>

      {Number(price) >= 1000 && (
        <div className={style.final_box}>
          <div
            className={`${style.final_row} ${discount ? style.align_end : style.align_center}`}
          >
          <p className={style.final_label}>최종 가격</p>
            <div className={style.price_line}>
              <span className={style.original_price}>{Number(price).toLocaleString()}원</span>
              <span className={style.final_price}>{finalPrice().toLocaleString()}원</span>
            </div>
          </div>
          {discount && (
            <p className={style.discount_info}>{discount}% 할인 적용</p>
          )}
        </div>
      )}

      <button type="submit" className={style.submit} disabled={!canSubmit}>
        상품 생성하기
      </button>

      <ul className={style.validation}>
        {validation.map(({ key, valid, label }) => (
          <li key={key} className={valid ? style.valid : style.invalid}>
            {valid ? <CheckIcon /> : <CrossIcon />} {label}
          </li>
        ))}
      </ul>
    </form>
  );
}
