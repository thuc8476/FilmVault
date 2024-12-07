import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { FaPlay } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const Slideshow = () => {
    return (
        <div className="relative w-full h-[700px]">
            <Swiper
                modules={[Navigation, Pagination, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="relative group">
                        <img
                            src="https://www.riotgames.com/darkroom/1440/b540da2b9afe5ec83e842a2d84f6dbb1:e95535ecd35e48592908762c9353926a/arcane-final-poster-16x9-no-text-no-border.jpg"
                            alt="Slide 1"
                            className="w-full h-[700px] object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 transition-all duration-300"></div>
                        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h1 className="text-5xl font-bold">Arcane</h1>
                            <p className="text-lg mt-4">
                                Jinx's attack on the Council sets the stage for a dire escalation of
                                the conflict between Piltover and Zaun.
                            </p>
                            <button className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-800 rounded-full flex items-center text-white font-semibold text-xl shadow-lg">
                                <FaPlay className="mr-2" />
                                Watch
                            </button>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="relative group">
                        <img
                            src="https://genk.mediacdn.vn/139269124445442048/2020/4/29/9-15881673058231914020243.jpg"
                            alt="Slide 1"
                            className="w-full h-[700px] object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 transition-all duration-300"></div>
                        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h1 className="text-5xl font-bold">One Piece</h1>
                            <p className="text-lg mt-4">
                            Follow Luffy and his crew as they embark on the ultimate treasure hunt!
                            </p>
                            <button className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-800 rounded-full flex items-center text-white font-semibold text-xl shadow-lg">
                                <FaPlay className="mr-2" />
                                Watch
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative group">
                        <img
                            src="https://gstatic.gvn360.com/2023/06/Spider-Man_-11-1920x1080.jpg"
                            alt="Slide 1"
                            className="w-full h-[700px] object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 transition-all duration-300"></div>
                        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h1 className="text-5xl font-bold">Spider-Man</h1>
                            <p className="text-lg mt-4">
                            Swing into action with everyone's favorite web-slinger in his latest adventure.
                            </p>
                            <button className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-800 rounded-full flex items-center text-white font-semibold text-xl shadow-lg">
                                <FaPlay className="mr-2" />
                                Watch
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative group">
                        <img
                            src="https://photo2.tinhte.vn/data/attachment-files/2021/12/5771031_Squid-Game-2021-Netflix-Wallpapers-full-HD-Free-Download-Wallpaperxyz.com-2.jpg"
                            alt="Slide 1"
                            className="w-full h-[700px] object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 transition-all duration-300"></div>
                        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h1 className="text-5xl font-bold">Squid Game</h1>
                            <p className="text-lg mt-4">
                            Dive into a deadly competition with high stakes and gripping drama.
                            </p>
                            <button className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-800 rounded-full flex items-center text-white font-semibold text-xl shadow-lg">
                                <FaPlay className="mr-2" />
                                Watch
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slideshow;
