import { useParams, Link } from "react-router-dom";
import React, {useEffect } from 'react';

import { useQuery } from "@tanstack/react-query";
import { Product } from "../type/Product";
import { fetchProductDetails } from "../api/fetchProductDetails";

const ProductDetailsPage = () => {
    const { slug } = useParams<{ slug: string }>();

    // Parse product ID from the slug. Ensure this is done only once.
    const productId = slug ? parseInt(slug.split('-')[0]) : null;
    
    // Use `useQuery` to fetch product details, ensuring a single request
    const { data: product, isLoading, error } = useQuery<Product>({
        queryKey: ['product', productId],
        queryFn: () => fetchProductDetails(productId as number),
        enabled: !!productId,
       
    });
   
     // Log productId only once when component mounts
    useEffect(() => {
        console.log("Fetched productId:", productId);
    }, [productId]);
    
    if (isLoading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full h-96 object-cover rounded"
            />
            <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-xl text-gray-600 mb-4">${product.price}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="inline-block bg-gray-100 px-3 py-1 rounded">
                {product.category}
            </div>
            </div>
        </div>
        </div>
    );
    };
  
export default ProductDetailsPage;
  