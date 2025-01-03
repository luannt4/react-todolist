import { Link, useParams } from "react-router-dom";
import {useEffect, useState } from 'react';

import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/Product";
import {getIdFromSlug} from "../utils/get-id-from-slug";
import { fetchProductDetails } from "../api/fetchProductDetails";
import { useCart, useCompare, useWishlist } from "../contexts";
import StarIcon from "../component/icons/star-icon";
import usePrice from "../component/product/use-price";
import CompareButton from "../component/compare/compare-button";
import WishlistButton from "../component/wishlist/wishlist-button";
import Counter from "../component/ui/counter";
import Button from "../component/ui/button";
import CartIcon from "../component/icons/cart-icon";
import { toast } from "react-toastify";
import ImageFill from "../component/ui/image";
import Container from "../component/ui/container";

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
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const {id,title, category, price :productPrice,  discountPercentage, thumbnail,rating, reviews, description }  = product  ?? {};
     const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
   
    //productPriceOld
    let productPriceOld: number | undefined; // Declare `productPriceOld` outside the if block
    if(productPrice !== undefined && discountPercentage !== undefined){
        productPriceOld = Number(Number(productPrice / (1 - (discountPercentage / 100))).toFixed(2));
    }
    
    const {price, basePrice, discount} = usePrice({
        amount: productPrice ? productPrice : productPriceOld!, // Uses `productPriceOld` if `productPrice` is undefined
        baseAmount: productPriceOld,
        currencyCode: 'USD'
    });

    // Bỏ qua selectedVariation do API ko có
    const item = product!;
    const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

    const  addToCart = () => {
        
        // to show btn feedback while product carting
        setAddToCartLoader(true);
        setTimeout(() => {
          setAddToCartLoader(false);
        }, 1500);
    
        //const item = product!;
        addItemToCart(item, selectedQuantity);
        toast('Added to the bag', {
            progressClassName: 'fancy-progress-bar',
            position: 'bottom-right',
            autoClose: 3000,
         });
    }

    // Log productId only once when component mounts
    /*useEffect(() => {
        console.log("Fetched productId:", productId);
    }, [productId]);*/
    
    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[300px] bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
    );

    if (!product) return (
        <div className="no-results  min-h-52 flex  justify-center items-center">
            <h3 className="text-lg ">Not Product found.</h3>
        </div>
    );

    return (
        <Container>
            <div className="grid-cols-10 lg:grid gap-8">
                <div className="col-span-5 mb-6 overflow-hidden">
                   
                    <ImageFill src={thumbnail|| 'Product Image'} height={530}   alt={title || 'Product Image'}/>
                </div>
                <div className="col-span-5 shrink-0 ">
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                    <div className="flex text-gray-500 space-x-1 mb-4">
                        <div className="flex items-center">
                        {rating !== undefined && [...Array(5)].map((_,idx) => (
                            <StarIcon
                            key={idx}
                            color={idx < rating ? '#F3B81F' : '#DFE6ED'}
                            className="w-3 h-3 mx-0.5"
                            />
                        ))}
                        </div>
                        
                        {reviews !== undefined && (
                            <span className="text-[13px] leading-4">
                            ({reviews.length} review)
                            </span>
                        )}
                    </div>
                    
                    <div className="text-gray-500 text-3xl  my-8">
                        <div className="flex gap-x-2 ">
                            <div className="text-black font-bold">{price}</div>
                            {basePrice && (
                            <div className="line-through text-gray-400">
                                {basePrice}
                            </div>
                            )}
                        </div>
                        <div className="text-lg text-red-600">Save up to  {discount}</div>
                    </div>
                    <Link 
                            key={category}
                            to={`/category/${category}`}
                            className="inline-block bg-gray-100 px-3 py-1 rounded mb-4"
                            >
                            {category}
                    </Link>
                    <p className="text-gray-700 mb-5">{description}</p>
                    <div className="pt-4 space-y-7">
                        <Counter
                                variant="single"
                                value={selectedQuantity}
                                onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
                                onDecrement={() =>
                                    setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                                }
                                disabled={
                                    isInCart(item.id)
                                    ? getItemFromCart(item.id).quantity + selectedQuantity >=
                                        Number(item.stock)
                                    : selectedQuantity >= Number(item.stock)
                                }
                        />
                        <div className="flex gap-2 ">
                            <Button
                                onClick={addToCart}
                                className=" w-64 px-1.5"
                                loading={addToCartLoader}
                            >
                                <CartIcon color="#ffffff" className="mr-3" />
                                Add To Cart
                            </Button>

                        
                            <CompareButton product={product} className="w-14 flex items-center justify-center"/>
                            <WishlistButton product={product} className="w-14 flex items-center justify-center"/>
                    
                        </div>
                    </div>
                    
                </div>
            

            </div>
        </Container>
    );
    };
  
export default ProductDetailsPage;
  