export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  category: string;
  thumbnail: string;
}

export interface CompareContextType {
    compareList: Product[];
    addToCompare: (product: Product) => void;
    removeFromCompare: (productId: number) => void;
    clearCompare: () => void;
}