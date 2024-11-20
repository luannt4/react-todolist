import React, {useReducer, useCallback,useEffect } from 'react';
import { cartReducer, initialState } from './cartReducer';
import { CartContext } from './CartContext';
import { useLocalStorage } from 'react-use';
import { getItem, inStock } from './cartActions';
import { Item } from './types';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [savedCart, SetSavedCart] = useLocalStorage(`shopy-cart`,JSON.stringify(initialState));
    const [state, dispatch] = useReducer(cartReducer,JSON.parse(savedCart!));

    /*useEffect(() => {
        SetSavedCart(JSON.stringify(state));
    }, [state, SetSavedCart]);*/

    const addItemToCart = (item: Item, quantity: number) => dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity });

    const removeItemFromCart = (id: Item['id']) => dispatch({ type: 'REMOVE_ITEM_OR_QUANTITY', id });
    const clearItemFromCart  = (id: Item['id']) => dispatch({ type: 'REMOVE_ITEM', id });
    const isInCart = useCallback(
        (id: Item['id']) => !!getItem(state.items, id),
        [state.items],
    );
    const getItemFromCart = useCallback(
        (id: Item['id']) => getItem(state.items, id),
        [state.items],
    );
    const isInStock = useCallback(
        (id: Item['id']) => inStock(state.items, id),
        [state.items],
    );
    const resetCart = () => dispatch({ type: 'RESET_CART' });

    const value = React.useMemo(
        () => ({
            ...state,
            addItemToCart,
            removeItemFromCart,
            clearItemFromCart,
            getItemFromCart,
            isInCart,
            isInStock,
            resetCart,
        }),
        [getItemFromCart, isInCart, isInStock, state],
    );

    return (
        <CartContext.Provider value={value}>
        {children}
        </CartContext.Provider>
    );
};

