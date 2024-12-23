// router.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "../layouts/default/layout";
import Home2Layout from "../layouts/home2/layout";

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
import ManagedToaster from "../component/common/toaster/toaster-provider";
import CompleteOrderPage from "../pages/complete-order";
import HomePage from "../pages/home";

//React-redux
import { Provider } from 'react-redux';
import store from "../component/todo-redux/redux/store";
import CompareBotomPanel from "../component/compare/compare-bottomPanel";
import BlogDetailPage from "../pages/blogDetails";

const routes = [
  {
    path: "/",
    element: (
		<AppProvider>
			    <DefaultLayout />
			    <ManagedModal />
            <ManagedDrawer/>
            <ManagedToaster/>
            <CompareBotomPanel/>
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
        path: "categories/:categoryName",
        element: <CategoriesProductPage />,
      },
      {
        path: "categories/:categoryName/:slug",
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
        path: "blogs/:slug",
        element: <BlogDetailPage />,
      },
      {
        path: "contact",
        element: (
          <Provider store={store}>
              <ContactPage />
          </Provider>
        ),
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: ( 
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
      ),
      },
      {
        path: "complete-order",
        element: <CompleteOrderPage />,
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
];

// Add more routes here if needed ];
const router = createBrowserRouter(routes, {
  future: {
    v7_skipActionErrorRevalidation: true,
    v7_partialHydration: true,
    v7_normalizeFormMethod: true,
    v7_fetcherPersist: true,
    v7_relativeSplatPath: true,
  },
});

export const AppRouter: React.FC = ({ children }: React.PropsWithChildren) => {
    return <RouterProvider router={router} />;
};