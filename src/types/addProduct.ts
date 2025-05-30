export interface AddProduct {
  title: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  brand: 'Apple' | 'Samsung' | 'Weebur';
}
