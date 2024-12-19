import React, {useEffect} from 'react';
import ImageFill from "../ui/image";
import Button from "../ui/button";
import Container from "../ui/container";
import {Product} from "../../types/Product";
import {Link} from "react-router-dom";
import {ROUTES} from "../../utils/routes";
import usePrice from "../product/use-price";

interface Props {
    product : Product;
    addToCartLoader: boolean;
    handleAddToCart: () => void;
    targetButtonRef: React.RefObject<HTMLButtonElement>;
    isCartVisible:boolean ;
    setCartVisible: (visible: boolean) => void;
};

const TopbarShowCart: React.FC<Props> = ({product,addToCartLoader,handleAddToCart, targetButtonRef,isCartVisible, setCartVisible }) => {
    const {id,title, category, price :productPrice,  discountPercentage,  thumbnail, } = product;
    
    // Create slug from title
    const slug = product.title.toLowerCase().replace(/\s+/g, '-');
    const productPriceOld = Number(Number(product?.price / (1 - (discountPercentage / 100))).toFixed(2));
    
    const {price, basePrice} = usePrice({
        amount: productPrice ? productPrice : productPriceOld,
        baseAmount: productPriceOld,
        currencyCode: 'USD'
    });
    
    
    
    // Function to check scroll position and show box
    const checkScrollPosition = () => {
        const siteHeader  = document.getElementById('header');
        if (targetButtonRef.current && siteHeader) {
            const headerHeight = siteHeader.offsetHeight; // Get the height of the header
            // Get the position of the button relative to the top of the document
            const rectShowCart  = targetButtonRef.current.getBoundingClientRect();
           
            // Check if the button is within the viewport
            if (rectShowCart.top - headerHeight >= 0) {
                setCartVisible(false);
                siteHeader.classList.remove('hidden');
            } else {
                setCartVisible(true);
                siteHeader.classList.add('hidden');
            }
        }
    };
    
    // Set up event listener to track scroll position
    useEffect(() => {
        // Attach scroll event listener
        window.addEventListener('scroll', checkScrollPosition);
        
        // Cleanup the event listener when component unmounts
        return () => {
            window.removeEventListener('scroll', checkScrollPosition);
        };
    }, []);
    
    if(!isCartVisible) return null;
    
    return (
        <div className="w-full backdrop-blur-sm z-40 bg-white/75 fixed top-0 border-b border-black/10 py-2">
            <Container>
                <div className={"flex gap-5  "}>
                    <ImageFill src={thumbnail || 'Product Image'} width={50} height={50} alt={title || 'Product Image'}/>
                    <div>
                        <p className={`w-full cursor-pointer font-medium `}>
                            <Link
                                key={id}
                                to={`${ROUTES.CATEGORIES}/${category}/${slug}-${id}`}
                                className="hover:text-blue-500"
                            >
                                {title}
                            </Link>
                        </p>
                        <div className="text-gray-500 text-base ">
                            <div className="flex gap-x-2 ">
                                <div className="text-black ">{price}</div>
                                {basePrice && (
                                    <div className="line-through text-gray-400">
                                        {basePrice}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Button
                        onClick={handleAddToCart}
                        className="  lg:py-0 lg:h-10 ml-auto"
                        loading={addToCartLoader}
                    >
                        Add To Cart
                    </Button>
                </div>
            </Container>
        </div>
    
    
    );
}
export default TopbarShowCart;
