import React, { useContext, useState, useEffect } from 'react';
import { addDocument, deleteDocument, updateDocument } from '../../../services/firebaseService';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { FaPlay, FaBookmark, FaHeart, FaPlus } from "react-icons/fa";
import { ContextMovies } from "../../../context/MovieProvider"
import { getObjectById } from '../../../services/repository';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
function SlideShowmovie(props) {
    const movies = useContext(ContextMovies);

    return (
        <div>
            <h2 className="text-2xl font-bold mt-2 mb-2 ml-3">Phim thịnh Hành</h2>
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={20}
                slidesPerView={5}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 },
                }}
            >
                {movies?.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className="relative rounded-lg overflow-hidden group">

                            <img
                                src={product.imgUrl}
                                alt={product.nameMovie}
                                className="w-full h-[280px] object-cover rounded-md"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-md">
                                <div className="flex justify-end gap-4">
                                    <button
                                        title="Add to Favorite"
                                        className="text-white hover:text-gray-300 transition-colors text-2xl"
                                    >
                                        <FaHeart />
                                    </button>
                                    <button
                                        title="Save to Watch Later"
                                        className="text-white hover:text-gray-300 transition-colors text-2xl"
                                    >
                                        <FaBookmark />
                                    </button>
                                    <button
                                        title="Add"
                                        className="text-white hover:text-gray-300 transition-colors text-2xl"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                                <div className="text-center text-white">
                                    <p className="text-lg font-bold">{product.nameMovie}</p>
                                    <p className="text-sm">{product.description}</p>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        title="Play"
                                        className="text-white hover:text-gray-300 transition-colors text-4xl"
                                    >
                                        <FaPlay />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SlideShowmovie;