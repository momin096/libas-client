import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ProductCard from "../components/ProductCard/ProductCard";

const Products = () => {
    const axiosPublic = useAxiosPublic()

    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/products')
            return data
        }
    })

    if (isLoading) return <h2>Loading..........</h2>




    return (
        <div className="container mx-auto">
            <h2>All Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {
                    [...products].reverse().map(item => <ProductCard item={item} />)
                }
            </div>
        </div>
    );
};

export default Products;