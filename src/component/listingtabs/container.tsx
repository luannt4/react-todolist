import cn from 'classnames';
import {useState} from "react";
import ProductItem from './productItem';
import { Product } from '../../type/Todo';

interface Props{
    className?: string;
    products: any;
    isLoading: any;
    error?: any;
}

const ListingTabsContainer: React.FC<Props> = ({products, isLoading, error}) => {
    
    return (
        <ul className="grid grid-cols-4  gap-3 bg-white">
            {products.map((product: any) => (
                <ProductItem
                key = {product.id}
                product = {product}
                />
            ))}
        </ul>
    );
}
export default ListingTabsContainer;