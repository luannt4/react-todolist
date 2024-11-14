export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface Product {
  id: number ;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  category: string;
  thumbnail: string;
  stock?: number;
  availabilityStatus?: string;
  quantity?: number;
  rating?:number;
  reviews?:Review[];
}

interface Review {
  rating: number;
  comment: string;
  date: string; // Use `Date` if you plan to convert this to a Date object in code
  reviewerName: string;
  reviewerEmail: string;
}

export interface Category {
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