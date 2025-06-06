import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Fan } from 'lucide-react';
import { imageUpload } from '../api/imageUpload';

export default function UpdateProduct() {
    const [images, setImages] = useState([]);
    const [existingImageUrls, setExistingImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axiosSecure.get(`/product/${id}`);
                const { _id, ...formData } = data; 
                reset(formData)
                setExistingImageUrls(data.images || []);
            } catch (err) {
                toast.error('Failed to fetch product data.');
                console.error(err);
            }
        };

        fetchProduct();
    }, [axiosSecure, id, reset]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
    };

    const removeImageUrl = (index) => {
        setExistingImageUrls(prev => prev.filter((_, i) => i !== index));
    };

    const removeNewImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const newImageUrls = await Promise.all(images.map(imageUpload));
            const allImages = [...existingImageUrls, ...newImageUrls];

            const updatedProduct = {
                ...data,
                price: parseFloat(data.price),
                discountedPrice: parseFloat(data.discountedPrice),
                quantity: parseInt(data.quantity),
                rating: parseInt(data.rating),
                images: allImages
            };

            const res = await axiosSecure.patch(`/products/${id}`, updatedProduct);
            console.log(res);
            if (res.data.modifiedCount > 0) {
                toast.success('Product updated successfully!');
            } else {
                toast.error('No changes were made.');
            }
        } catch (err) {
            toast.error('Update failed.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 border rounded-2xl mt-5 text-gray-800 border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-6">Update Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Product Name</label>
                    <input {...register('name', { required: 'Name is required' })} className="w-full mt-1 px-4 py-2 border rounded" />
                    {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Description</label>
                    <textarea {...register('description', { required: 'Description is required' })} rows="4" className="w-full mt-1 px-4 py-2 border rounded" />
                    {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Price ($)</label>
                        <input type="number" step="0.01" {...register('price')} className="w-full px-4 py-2 border rounded" />
                    </div>
                    <div>
                        <label>Category</label>
                        <select {...register('category')} className="w-full px-4 py-2 border rounded">
                            <option value="">Select category</option>
                            <option value="jeans">Jeans</option>
                            <option value="t-shirt">T-Shirt</option>
                            <option value="shirt">Shirt</option>
                            <option value="cargo">Cargo</option>
                            <option value="mobile">Mobile</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Discounted Price</label>
                        <input type="number" step="0.01" {...register('discountedPrice')} className="w-full px-4 py-2 border rounded" />
                    </div>
                    <div>
                        <label>Showcase</label>
                        <select {...register('showcase')} className="w-full px-4 py-2 border rounded">
                            <option value="">Select</option>
                            <option value="normal">Normal</option>
                            <option value="new-arrivals">New Arrivals</option>
                            <option value="top-selling">Top Selling</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Quantity</label>
                        <input type="number" {...register('quantity')} className="w-full px-4 py-2 border rounded" />
                    </div>
                    <div>
                        <label>Rating</label>
                        <select {...register('rating')} className="w-full px-4 py-2 border rounded">
                            {[1, 2, 3, 4, 5].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
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
                </div>

                {/* Existing Images */}
                {existingImageUrls.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {existingImageUrls.map((url, idx) => (
                            <div key={idx} className="relative">
                                <img src={url} className="h-52 w-full object-cover rounded-lg" alt="" />
                                <button type="button" onClick={() => removeImageUrl(idx)} className="absolute top-1 right-1 bg-gray-500 text-white px-2 py-1 rounded-full text-xs">✕</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* New Images */}
                {images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative">
                                <img src={URL.createObjectURL(img)} className="h-52 w-full object-cover rounded-lg" alt="" />
                                <button type="button" onClick={() => removeNewImage(idx)} className="absolute top-1 right-1 bg-gray-500 text-white px-2 py-1 rounded-full text-xs">✕</button>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg text-white font-bold text-lg transition ${loading ? 'bg-gray-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                    {loading ? <Fan className="animate-spin mx-auto" /> : 'Update Product'}
                </button>
            </form>
        </div>
    );
}
