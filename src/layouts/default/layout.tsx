import React from "react";
import {  Outlet } from "react-router-dom";
import Header from "./header";

const DefaultLayout: React.FC = () => {
    
    return (
        <>
            <Header/>
            <main className="mt-10 min-h-[560px]">
                <Outlet />
            </main>
            <div className="bg-gray-800 text-white text-center p-6 ">Footer Content</div>
        </>
    );
};

export default DefaultLayout;