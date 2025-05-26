import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Slider = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="flex flex-col lg:flex-row items-center justify-between h-full px-6 lg:px-20 py-10">
                        {/* Left Content */}
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-black mb-6">
                                FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
                            </h1>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto lg:mx-0">
                                Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                            </p>
                            <button className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold mb-8 lg:mb-12">
                                Shop Now
                            </button>

                            {/* Stats */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                                <div className="text-center">
                                    <p className="text-2xl font-bold">200+</p>
                                    <p className="text-gray-500 text-sm">International Brands</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">2,000+</p>
                                    <p className="text-gray-500 text-sm">High-Quality Products</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">30,000+</p>
                                    <p className="text-gray-500 text-sm">Happy Customers</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Image */}
                        <div className="lg:w-1/2 mt-10 lg:mt-0 relative">
                            <img
                                src="/banner.png"
                                alt="Models"
                                className="w-full max-w-lg mx-auto"
                            />
                            {/* Decorative stars (optional) */}
                            <div className="absolute top-10 left-10 text-4xl text-black animate-pulse">✦</div>
                            <div className="absolute bottom-10 right-10 text-4xl text-black animate-pulse">✦</div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="flex flex-col lg:flex-row items-center justify-between h-full px-6 lg:px-20 py-10">
                        {/* Left Content */}
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-black mb-6">
                                FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
                            </h1>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto lg:mx-0">
                                Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                            </p>
                            <button className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold mb-8 lg:mb-12">
                                Shop Now
                            </button>

                            {/* Stats */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                                <div className="text-center">
                                    <p className="text-2xl font-bold">200+</p>
                                    <p className="text-gray-500 text-sm">International Brands</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">2,000+</p>
                                    <p className="text-gray-500 text-sm">High-Quality Products</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">30,000+</p>
                                    <p className="text-gray-500 text-sm">Happy Customers</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Image */}
                        <div className="lg:w-1/2 mt-10 lg:mt-0 relative">
                            <img
                                src="/banner.png"
                                alt="Models"
                                className="w-full max-w-lg mx-auto"
                            />
                            {/* Decorative stars (optional) */}
                            <div className="absolute top-10 left-10 text-4xl text-black animate-pulse">✦</div>
                            <div className="absolute bottom-10 right-10 text-4xl text-black animate-pulse">✦</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex flex-col lg:flex-row items-center justify-between h-full px-6 lg:px-20 py-10">
                        {/* Left Content */}
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-black mb-6">
                                FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
                            </h1>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto lg:mx-0">
                                Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                            </p>
                            <button className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold mb-8 lg:mb-12">
                                Shop Now
                            </button>

                            {/* Stats */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                                <div className="text-center">
                                    <p className="text-2xl font-bold">200+</p>
                                    <p className="text-gray-500 text-sm">International Brands</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">2,000+</p>
                                    <p className="text-gray-500 text-sm">High-Quality Products</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">30,000+</p>
                                    <p className="text-gray-500 text-sm">Happy Customers</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Image */}
                        <div className="lg:w-1/2 mt-10 lg:mt-0 relative">
                            <img
                                src="/banner.png"
                                alt="Models"
                                className="w-full max-w-lg mx-auto"
                            />
                            {/* Decorative stars (optional) */}
                            <div className="absolute top-10 left-10 text-4xl text-black animate-pulse">✦</div>
                            <div className="absolute bottom-10 right-10 text-4xl text-black animate-pulse">✦</div>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>

        </>
    );
};

export default Slider;