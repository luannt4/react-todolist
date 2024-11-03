import React from "react";
import { Product  } from "../../type/Todo";
import ProductItem from "./TodoItem";
import { useProductContext   } from "./context/ProductContext";
import { useProducts } from './api';


const ProductList: React.FC = () => {
   const { data: products, isPending, error } = useProducts();

   if (isPending) return <div>Loading...</div>;
   if (error) return <div>Error: {error.message}</div>;

  return (
    <ul className="grid grid-cols-4  gap-3">
    {products.map((product) => (
        <ProductItem
        key = {product.id}
        product = {product}
        />
    ))}
    </ul>
  )
};
export default ProductList;
