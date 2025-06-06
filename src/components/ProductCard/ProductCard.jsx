import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Link } from 'react-router-dom';

export default function ProductCard({ item }) {
    const { _id, name, price, images, discountedPrice, rating } = item || {};

    // const hasDiscount = discountedPrice < price;
    // const discountPercent = hasDiscount
    //     ? Math.round(((price - discountedPrice) / price) * 100)
    //     : 0;


    return (
        <Link to={`/products/${_id}`}>
            <div className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition w-full max-w-xs">
                <div className="overflow-hidden rounded-xl mb-4">
                    <img
                        src={images?.[0] || '/placeholder.jpg'}
                        alt={name}
                        className="w-full h-72 object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
                    />
                </div>

                <h3 className="text-base font-semibold text-gray-800 mb-1">{name}</h3>

                <div className="flex items-center text-sm text-gray-600 mb-2 space-x-1">
                    <Rating style={{ maxWidth: 150 }} value={rating || 0} readOnly />
                </div>


                <div className="flex items-center gap-2 ">

                    $ <p className='text-xl font-medium text-gray-900'>{discountedPrice && discountedPrice}</p>
                    <span className={`${discountedPrice ? 'line-through text-gray-400 ' : 'text-gray-900 font-medium'} text-xl ml-2`}>{price}</span>{' '}
                    {
                        discountedPrice ? <span className="text-sm text-red-500 font-medium">
                            -{Math.round(((price - discountedPrice) / price) * 100)}%
                        </span> : ''
                    }
                </div>


            </div>
        </Link>
    );
}
