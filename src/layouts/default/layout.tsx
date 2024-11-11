import React from "react";
import {  Outlet } from "react-router-dom";
import Header from "./header";

const DefaultLayout: React.FC = () => {
    
    return (
        <>
            <Header/>
            <main className="max-w-7xl mx-auto mt-10 min-h-[560px]">
                <Outlet />
            </main>
            <div className="bg-gray-800 text-white text-center p-4 mt-20">Footer Content</div>
        </>
    );
};

export default DefaultLayout;