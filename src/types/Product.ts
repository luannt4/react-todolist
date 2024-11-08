export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  category: string;
  thumbnail: string;
}
export interface category {
  slug: string;
  name: string;
  url: string;
}

export interface SearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
export type QueryOptionsType = {
  text: string;
  category?: string;
  status?: string;
  limit?: number;
};