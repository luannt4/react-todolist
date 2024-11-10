// router.tsx
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import DefaultLayout from "../layouts/default/layout";
import Home2Layout from "../layouts/home2/layout";

import HomePage from "../pages/home";
import Home2Page from "../pages/home2";
import ComparePage from "../pages/compare";
import WishlistPage from "../pages/wishlist";
import NoPage from "../pages/noPage";
import BlogsPage from "../pages/blogs";
import ContactPage from "../pages/contact";
import CategoriesPage from "../pages/categories";
import CategoriesProductPage from "../pages/category";
import ProductDetailsPage from "../pages/productDetails";
import SearchPage from "../pages/search";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import ForgotPasswordPage from "../pages/auth/forgot-password";
import Dashboard from "../pages/dashboard";
import { useAuth } from '../contexts';
import PrivateRoute from "../component/PrivateRoute";

/*const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const {  isLoading } = useAuth();
  const isAuthenticated = !!localStorage.getItem('auth_token');
   if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};*/

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = !!localStorage.getItem('auth_token');
    return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomePage /> ,
      },
      {
        path: "dashboard",
        element: ( <PrivateRoute><Dashboard /></PrivateRoute>),
      },
      {
        path: "login",
        element: (
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
            <PublicRoute>
                <RegisterPage />
            </PublicRoute>
        ),
      },
       {
        path: "forgot",
        element: (
            <PublicRoute>
                <ForgotPasswordPage />
            </PublicRoute>
        ),
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
        path: "product/:slug",
        element: <ProductDetailsPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
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

export const AppRouter: React.FC = ({ children }: React.PropsWithChildren) => {
  return <RouterProvider router={router} />;
};