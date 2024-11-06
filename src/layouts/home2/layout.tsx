import React from "react";
import { Link, Outlet } from "react-router-dom";

const Home2Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4 text-white">
        <nav className="container mx-auto">
        <Link to="/" className="mr-4">Home</Link>
          <Link to="/home2" className="mr-4">Home 2</Link>
          <Link to="/compare" className="mr-4">Compare</Link>
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

export default Home2Layout;