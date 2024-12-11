import React from 'react';
import { Product } from '../../types/Product';
import ProductCard from "../cards/product-card";

interface ProductListProps {
    products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {

    if ( products.length === 0) return (
        <div className="no-results  min-h-52 flex  justify-center items-center">
            <h3 className="text-lg ">Not Product found.</h3>
        </div>
    );

    return (
        <div className="grid grid-cols-4 gap-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    );
};
