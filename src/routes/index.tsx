// router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import {PrivateRoute, PublicRoute} from "../component/PrivateRoute";
import { AppProvider } from "../contexts/AppContextProvider";
import ManagedModal from "../component/common/modal/managed-modal";
import ManagedDrawer from "../component/common/drawer/managed-drawer";
import CartPage from "../pages/cart";
import CheckoutPage from "../pages/checkout";

/*const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const {  isLoading } = useAuth();
  const isAuthenticated = !!localStorage.getItem('authUser');
   if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};*/
/*
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = !!localStorage.getItem('authUser');
    return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />;
};*/

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
		<AppProvider>
			<DefaultLayout />
			<ManagedModal />
            <ManagedDrawer/>
		</AppProvider>
	),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "dashboard",
        element: ( 
			<PrivateRoute>
				<Dashboard />
        	</PrivateRoute>
		),
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
        path: "forgot-password",
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
        element: ( 
			<PrivateRoute>
				<WishlistPage />
        	</PrivateRoute>
		),
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
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
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