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
  stock: number;
  availabilityStatus?: string;
  quantity: number;
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
  total?: number;
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

export type UserAddress = {
  id: number;
  firstName: string;
  lastName: string;
  address: Address['address'];
};

interface Address {
  address: {
    address: string;
    city: string;
    postalCode: string;
    state: string;
  };
}
export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export interface Order {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
}