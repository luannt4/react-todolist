import React, {useEffect} from "react";
import {  Outlet } from "react-router-dom";
import Header from "./header";
import BackToTopButton from "../../component/ui/back-to-top";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchCart} from "../../features/cart/cartThunks";

const DefaultLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isLoggedIn, user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        isLoggedIn && dispatch(fetchCart(user?.id!));
    }, [dispatch, isLoggedIn, user?.id]);

    return (
        <>
            <Header/>
            <main className="mt-10 min-h-[560px] pb-10">
                <Outlet />
            </main>
            <div className="bg-gray-800 text-white text-center p-6 ">Footer Content</div>
            <BackToTopButton/>
        </>
    );
};

export default DefaultLayout;