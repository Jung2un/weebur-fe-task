export interface ProductsParams {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews: Review[];
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
