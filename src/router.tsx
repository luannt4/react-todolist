// router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layouts/default/layout";
import Home2Layout from "./layouts/home2/layout";

import HomePage from "./pages/home";
import Home2Page from "./pages/home2";
import ComparePage from "./pages/compare";
import WishlistPage from "./pages/wishlist";
import NoPage from "./pages/noPage";
import BlogsPage from "./pages/blogs";
import ContactPage from "./pages/contact";
import CategoriesPage from "./pages/Categories";
import CategoriesProductPage from "./pages/Category";
import ProductDetailsPage from "./pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "compare",
        element: <ComparePage />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "category/:categoryName",
        element: <CategoriesProductPage />,
      },
      {
        path: "product/:productId",
        element: <ProductDetailsPage />,
      },
      {
        path: "blogs",
        element: <BlogsPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "*",
        element: <NoPage />,
      },
    ],
  },
  {
    path: "home2",
    element: <Home2Layout />,
    children: [
      {
        path: "/home2",
        element: <Home2Page />,
      },
      
    ],
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};