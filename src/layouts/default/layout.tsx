import React from "react";
import { Link, Outlet } from "react-router-dom";
import {useCompare } from '../../context/compare.context';
import { useWishlist } from "../../context/wishlist.context";

const DefaultLayout: React.FC = () => {
    const {compareList} = useCompare();
    const {wishlistList} = useWishlist();
    return (
        <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 p-4 text-white">
            <nav className="container mx-auto">
                <Link to="/" className="mr-4">Home</Link>
                <Link to="/categories" className="mr-4">Categories </Link>
            <Link to="/compare" className="mr-4">Compare ({compareList.length})</Link>
            <Link to="/wishlist" className="mr-4">Wishlist ({wishlistList.length})</Link>
            <Link to="/blogs" className="mr-4">Blogs</Link>
            <Link to="/contact" className="mr-4">Contact</Link>
            </nav>
        </header>
        <main className="container mx-auto p-4">
            <Outlet />
        </main>
        <footer className="bg-gray-800 text-white text-center p-4 mt-8">Footer Content</footer>
        </div>
    );
};

export default DefaultLayout;