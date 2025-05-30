'use client';

import Image from 'next/image';
import style from './ProductCard.module.css';
import { ProductsParams } from '@/types/product';

type ProductCardProps = {
  product: ProductsParams;
  viewMode: 'list' | 'grid';
};

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  return (
    <div className={`${style.product_card} ${style[viewMode]}`}>
      <div className={style.thumbnail}>
        <Image src={product.thumbnail} alt={product.title} width={120} height={120} />
      </div>

      <div className={style.info}>
        <h3 className={style.title}>{product.title}</h3>
        <p className={style.desc}>{product.description}</p>
        <div className={style.meta}>
          <span>⭐ {product.rating.toFixed(1)}</span>
          <span>{product.reviews.length > 0 ? `💬 (${product.reviews.length})` : '리뷰 없음'}</span>
        </div>
      </div>
    </div>
  );
}
