import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ProductCard from "../ProductCard/ProductCard";

const NewArrivals = () => {
    const axiosPublic = useAxiosPublic()
    const { data: newArrivals } = useQuery({
        queryKey: ['new-arrivals'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/new-arrivals')
            return data
        }
    })
    console.log(newArrivals);

    return (
        <div className="my-10">
            <h2 className="text-4xl font-semibold text-center mb-5">New Arrivals</h2>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 place-items-center place-content-center ">
                {
                    [...newArrivals]?.reverse().slice(0, 5).map(item => <ProductCard key={item._id} item={item} />)
                }
            </div>
        </div>
    );
};

export default NewArrivals;