import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { imageUpload } from '../api/imageUpload';

export default function AddProduct() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => [...prev, ...files]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const imageUrls = await Promise.all(images.map((img) => imageUpload(img)));

            const productData = {
                ...data,
                price: parseFloat(data.price),
                images: imageUrls,
            };

            await axios.post('/api/products', productData);
            alert('Product added successfully!');
            reset();
            setImages([]);
        } catch (error) {
            console.error(error);
            alert('Failed to add product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 text-gray-800 rounded-2xl border border-gray-200 mt-5">
            <h2 className="text-3xl font-bold mb-6 text-center">Add New Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Product Name</label>
                    <input
                        {...register('name', { required: 'Name is required' })}
                        className="w-full mt-1 px-4 py-2  text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter product name"
                    />
                    {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Description</label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        rows="4"
                        placeholder="Enter description"
                        className="w-full mt-1 px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    {errors.description && <p className="text-sm text-red-400">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register('price', { required: 'Price is required' })}
                            className="w-full mt-1 px-4 py-2  text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="0.00"
                        />
                        {errors.price && <p className="text-sm text-red-400">{errors.price.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Category</label>
                        <select
                            {...register('category', { required: 'Category is required' })}
                            className="w-full mt-1 px-4 py-2  text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            <option value="">Select category</option>
                            <option value="jeans">Jeans</option>
                            <option value="t-shirt">T Shirt</option>
                            <option value="shirt">Shirt</option>
                            <option value="cargo">Cargo</option>
                            <option value="mobile">Mobile</option>
                        </select>
                        {errors.category && <p className="text-sm text-red-400">{errors.category.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Quantity</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register('quantity', { required: 'Quantity is required' })}
                            className="w-full mt-1 px-4 py-2  text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="00"
                        />
                        {errors.price && <p className="text-sm text-red-400">{errors.price.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Show Case</label>
                        <select
                            {...register('showcase', { required: 'ShowCase is required' })}
                            className="w-full mt-1 px-4 py-2  text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            <option value="" className='hidden'>Select</option>
                            <option value="normal">Normal</option>
                            <option value="new-arrivals">New Arrivals</option>
                            <option value="top-selling">Top Selling</option>
                        </select>
                        {errors.category && <p className="text-sm text-red-400">{errors.category.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Upload Images</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-100 hover:file:bg-gray-600"
                    />
                    {images.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-4">
                            {images.map((img, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`preview-${index}`}
                                        className="h-52 w-full object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-gray-500 text-white text-xs px-3 py-2 rounded-full"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg text-white font-bold text-lg transition ${loading
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                >
                    {loading ? 'Submitting...' : 'Submit Product'}
                </button>
            </form>
        </div>
    );
}
