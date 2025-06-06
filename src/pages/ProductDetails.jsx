import { Rating } from '@smastrom/react-rating';
import { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const [selectedSize, setSelectedSize] = useState('Large');
    const [quantity, setQuantity] = useState(1);

    const axiosPublic = useAxiosPublic();
    const { id } = useParams();

    const { data: product, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/product/${id}`);
            return data;
        },
        enabled: !!id,
    });

    if (isLoading || !product) return <div className="text-center py-10">Loading...</div>;

    const { name, rating, description, price, discountedPrice, images = [] } = product;

    const galleryImages = images.map((imgUrl) => ({
        original: imgUrl,
        thumbnail: imgUrl,
    }));

    const handleQuantityChange = (type) => {
        setQuantity((prev) => {
            if (type === 'decrease') return prev > 1 ? prev - 1 : 1;
            if (type === 'increase') return prev + 1;
            return prev;
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-6xl mx-auto">
            <div>
                <ImageGallery items={galleryImages} showPlayButton={false} />
            </div>

            <div>
                <h2 className="text-2xl font-bold">{name}</h2>
                <div className="flex items-center mt-2 space-x-2">
                    <Rating style={{ maxWidth: 150 }} value={rating} readOnly />
                    <span className="text-sm text-gray-500">{rating.toFixed(1)}/5</span>
                </div>

                <p className="text-xl mt-3 font-semibold text-black">
                    ${discountedPrice}{' '}
                    <span className={`${discountedPrice ? 'line-through text-gray-400' : 'text-gray-900'}  ml-2`}>{price}</span>{' '}
                    {
                        discountedPrice ? <span className="text-red-500 ml-2">
                            -{Math.round(((price - discountedPrice) / price) * 100)}%
                        </span> : ''
                    }
                </p>

                <p className="text-sm mt-4 text-gray-600">{description}</p>

                <div className="mt-4">
                    <p className="mb-2 font-medium">Choose Size</p>
                    <div className="flex space-x-2">
                        {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
                            <button
                                key={size}
                                className={`btn btn-sm ${selectedSize === size ? 'btn-neutral' : 'btn-outline'}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex items-center space-x-4">
                    <div className="join">
                        <button className="btn join-item" onClick={() => handleQuantityChange('decrease')}>-</button>
                        <input
                            type="number"
                            value={quantity}
                            className="input input-bordered w-16 text-center join-item"
                            readOnly
                        />
                        <button className="btn join-item" onClick={() => handleQuantityChange('increase')}>+</button>
                    </div>
                    <button className="btn btn-lg btn-neutral">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
