import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageProducts = () => {
    const axiosPublic = useAxiosPublic();

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products');
            return res.data;
        }
    });

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = await axiosPublic.delete(`/products/${id}`);
                console.log(data);
                if (data.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch();
                }

            }
        });

    };

    if (isLoading) return <div className="text-center py-10">Loading products...</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...products].reverse().map((product, idx) => (
                            <tr key={product._id}>
                                <td>{idx + 1}</td>
                                <td>
                                    <img src={product.images?.[0]} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                </td>
                                <td>{product.name}</td>
                                <td>
                                    {product.discountedPrice && product.discountedPrice < product.price ? (
                                        <>
                                            <span className="font-medium">${product.discountedPrice}</span>{' '}
                                            <span className="line-through text-sm text-gray-400">${product.price}</span>
                                        </>
                                    ) : (
                                        <span className="font-medium">${product.price}</span>
                                    )}
                                </td>

                                <td>{product.rating}/5</td>
                                <td className="space-x-2">
                                    <Link to={`/update-product/${product._id}`} className="btn btn-sm btn-outline">
                                        <FaEdit />
                                    </Link>
                                    <button onClick={() => handleDelete(product._id)} className="btn btn-sm btn-error text-white">
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;
