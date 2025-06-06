import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import AddProduct from "../pages/AddProduct";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductDetails from "../pages/ProductDetails";
import ManageProducts from "../pages/ManageProducts";
import UpdateProduct from "../pages/UpdateProduct";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import Products from "../pages/Products";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/add-product',
                element: <AddProduct />
            },
            {
                path: '/products/:id',
                element: <ProductDetails />
            },
            {
                path: '/manage-products',
                element: <ManageProducts />
            },
            {
                path: '/update-product/:id',
                element: <UpdateProduct />
            },
            {
                path: '/new-arrivals',
                element: <NewArrivals />
            },
            {
                path: '/products',
                element: <Products />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
]);


export default router