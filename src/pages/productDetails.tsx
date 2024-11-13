import { Link, useParams } from "react-router-dom";
import {useEffect } from 'react';

import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/Product";
import {getIdFromSlug} from "../utils/get-id-from-slug";
import { fetchProductDetails } from "../api/fetchProductDetails";
import AddToCart from "../component/product/add-to-cart";
import { IoIosCheckmarkCircle, IoIosHeart, IoIosHeartEmpty, IoIosSync } from "react-icons/io";
import { useCart, useCompare, useWishlist } from "../contexts";
interface Props {
    product : Product;
}
const ProductDetailsPage = () => {
    
    const { slug } = useParams<{ slug: string }>();

    // Parse product ID from the slug. Ensure this is done only once.
    const productId = getIdFromSlug(slug as string);
    
    // Use `useQuery` to fetch product details, ensuring a single request
    const { data: product, isLoading } = useQuery<Product>({
        queryKey: ['product', productId],
        queryFn: () => fetchProductDetails(productId as number),
        enabled: !!productId,
       
    });

    const {id ,title, category, price, description, thumbnail } = product  ?? {};
    
    const {addToCompare, compareList,removeFromCompare} = useCompare();
    const {addToWishlist, wishlistList,removeFromWishlist} = useWishlist();
    
    const isInCompare = (productId: number) => compareList.some((product) => product.id === productId);
    const isWishlist = (productId: number) => wishlistList.some((product) => product.id === productId);
    
     // Log productId only once when component mounts
    useEffect(() => {
        console.log("Fetched productId:", productId);
    }, [productId]);
    
    if (isLoading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    const RenderAddToCart: React.FC<Props> = ({ product }) => {
        const {id, stock, availabilityStatus} = product ;
        const {isInCart, isInStock} = useCart();
        const outOfStock = isInCart(id) && !isInStock(id);
       

        if (Number(stock) < 1 || outOfStock) {
            return (
                <span className="block text-sm leading-6 px-4 py-2 bg-red-400 rounded-full text-white text-[13px] items-center justify-center">
                    Out Of Stock
                </span>
            );
        }
       
        return <AddToCart product={product} />;
    }
    return (
        <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-96 object-cover rounded"
            />
            <div>
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                <p className="text-xl text-gray-600 mb-4">${price}</p>
                <Link 
                        key={category}
                        to={`/category/${category}`}
                        className="inline-block bg-gray-100 px-3 py-1 rounded mb-4"
                        >
                        {category}
                </Link>
                <p className="text-gray-700 mb-4">{description}</p>
                <div className="flex gap-2">
               
                    <RenderAddToCart product={product}/>

                    {isInCompare(product?.id) ? (
                        <button
                        onClick={() => removeFromCompare(product?.id)}
                        className="bg-slate-500 text-white  px-3 py-3  rounded-full"
                        >
                        
                            <IoIosCheckmarkCircle/>
                        </button>
                    ) : (
                        <button
                        onClick={() => addToCompare(product)}
                        className="bg-slate-500 text-white px-3 py-3  rounded-full"
                        >
                            <IoIosSync/>
                        </button>
                    )}

                    {isWishlist(product?.id) ? (
                        <button onClick={() => removeFromWishlist(product?.id)} className="bg-slate-500 text-white  px-3 py-3  rounded-full">
                            <IoIosHeart/>
                        </button>
                    ) : (
                        <button
                        onClick={() => addToWishlist(product)}
                        className="bg-slate-500 text-white px-3 py-3  rounded-full"
                        >
                            <IoIosHeartEmpty/>
                        </button>
                    )}
            
                </div>
            </div>
        </div>
        </div>
    );
    };
  
export default ProductDetailsPage;
  