import React from "react";
import {  Outlet } from "react-router-dom";
import Header from "./header";
import useCart from "../../hooks/useCart";

const DefaultLayout: React.FC = () => {
    useCart();
    return (
        <>
            <Header/>
            <main className="mt-10 min-h-[560px] pb-10">
                <Outlet />
            </main>
            <div className="bg-gray-800 text-white text-center p-6 ">Footer Content</div>
        </>
    );
};

export default DefaultLayout;