export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  quantity?: number;
}