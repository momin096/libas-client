import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { imageUpload } from '../api/imageUpload';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Fan } from 'lucide-react';

export default function AddProduct() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const imageUrls = await Promise.all(images.map(imageUpload));
            const productData = {
                ...data,
                price: parseFloat(data.price),
                discountedPrice: parseFloat(data.discountedPrice),
                quantity: parseInt(data.quantity),
                rating: parseInt(data.rating),
                images: imageUrls
            };

            const res = await axiosSecure.post('/products', productData);
            if (res.data.insertedId) {
                toast.success('Product added successfully!');
                reset();
                setImages([]);
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to add product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 border rounded-2xl mt-5 text-gray-800 border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-6">Add New Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                <div>
                    <label className="block text-sm font-medium text-gray-600">Product Name</label>
                    <input {...register('name', { required: 'Name is required' })} className="w-full mt-1 px-4 py-2 border border-gray-400 rounded" />
                    {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Description</label>
                    <textarea {...register('description', { required: 'Description is required' })} rows="4" className="w-full mt-1 px-4 py-2 border  border-gray-400 rounded" />
                    {errors.description && <p className="text-sm text-red-400">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Price ($)</label>
                        <input type="number" step="0.01" {...register('price', { required: 'Price is required' })} className="w-full mt-1 px-4 py-2 border  border-gray-400 rounded" />
                        {errors.price && <p className="text-sm text-red-400">{errors.price.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Category</label>
                        <select {...register('category', { required: 'Category is required' })} className="w-full mt-1 px-4 py-2 border border-gray-400 rounded">
                            <option value="" className='hidden'>Select category</option>
                            <option value="jeans">Jeans</option>
                            <option value="t-shirt">T-Shirt</option>
                            <option value="shirt">Shirt</option>
                            <option value="cargo">Cargo</option>
                            <option value="mobile">Mobile</option>
                        </select>
                        {errors.category && <p className="text-sm text-red-400">{errors.category.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Discounted Price</label>
                        <input type="number" step="0.01" {...register('discountedPrice')} className="w-full mt-1 px-4 py-2 border border-gray-400 rounded" />
                        {errors.discountedPrice && <p className="text-sm text-red-400">{errors.discountedPrice.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Showcase</label>
                        <select {...register('showcase', { required: 'Showcase is required' })} className="w-full mt-1 px-4 py-2 border border-gray-400 rounded">
                            <option value="" className='hidden'>Select</option>
                            <option value="normal">Normal</option>
                            <option value="new-arrivals">New Arrivals</option>
                            <option value="top-selling">Top Selling</option>
                        </select>
                        {errors.showcase && <p className="text-sm text-red-400">{errors.showcase.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Quantity</label>
                        <input type="number" {...register('quantity', { required: 'Quantity is required' })} className="w-full mt-1 px-4 py-2 border border-gray-400 rounded" />
                        {errors.quantity && <p className="text-sm text-red-400">{errors.quantity.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Rating</label>
                        <select {...register('rating', { required: 'Rating is required' })} className="w-full mt-1 px-4 py-2 border border-gray-400 rounded">
                            <option value="" className='hidden'>Select rating</option>
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                        {errors.rating && <p className="text-sm text-red-400">{errors.rating.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Upload Images</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-400 file:py-2 file:px-4 file:rounded-md file:bg-gray-700 file:text-white hover:file:bg-gray-600"
                    />
                    {images.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-4">
                            {images.map((img, idx) => (
                                <div key={idx} className="relative">
                                    <img src={URL.createObjectURL(img)} alt="" className="h-52 w-full object-cover rounded-lg" />
                                    <button onClick={() => removeImage(idx)} type="button" className="absolute top-1 right-1 bg-gray-500 text-white px-2 py-1 rounded-full text-xs">✕</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg text-white font-bold text-lg transition ${loading ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                    {loading ? <Fan className="animate-spin mx-auto" /> : 'Add Product'}
                </button>
            </form>
        </div>
    );
}
