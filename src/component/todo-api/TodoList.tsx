import React from "react";
import { Product  } from "../../types/Todo";
import ProductItem from "./TodoItem";
import { useProductContext   } from "./context/ProductContext";
import { useProducts } from './api';
import { useDeleteProduct } from "./hooks/useDeleteProduct";


const ProductList: React.FC = () => {
    const { dispatch } = useProductContext();
    const { data: products, isPending, error } = useProducts();
    const deleteProductMutation = useDeleteProduct();


    if (isPending) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-4">Error: {error.message}</div>;

     const handleEdit = (product: Product) => {
        dispatch({ type: 'SET_EDITING_PRODUCT', payload: product });
    };

    const handleDelete = (productId: number) => {
        deleteProductMutation.mutate(productId);
    };
    
  return (
    <ul className="grid grid-cols-4  gap-3">
    {products.map((product) => (
        <ProductItem
        key = {product.id}
        product = {product}
        onEdit={handleEdit}
        onDelete={handleDelete}
        />
    ))}
    </ul>
  )
};
export default ProductList;
