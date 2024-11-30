import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const Slideshow = () => {
    return (
        <div>
            {/* Swiper chính */}
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
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
                <SwiperSlide>
                    <img
                        src="https://www.riotgames.com/darkroom/1440/b540da2b9afe5ec83e842a2d84f6dbb1:e95535ecd35e48592908762c9353926a/arcane-final-poster-16x9-no-text-no-border.jpg"
                        alt="Slide 1"
                        className="w-full h-90 object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://genk.mediacdn.vn/139269124445442048/2020/4/29/9-15881673058231914020243.jpg"
                        alt="Slide 2"
                        className="w-full h-90 object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://gstatic.gvn360.com/2023/06/Spider-Man_-11-1920x1080.jpg"
                        alt="Slide 3"
                        className="w-full h-90 object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://photo2.tinhte.vn/data/attachment-files/2021/12/5771031_Squid-Game-2021-Netflix-Wallpapers-full-HD-Free-Download-Wallpaperxyz.com-2.jpg"
                        alt="Slide 4"
                        className="w-full h-90 object-cover"
                    />
                </SwiperSlide>
            </Swiper>
            <Swiper
                spaceBetween={4}  
                navigation
                pagination={{ clickable: true }}
            >
                <SwiperSlide>
                    <div className="p-4 rounded-lg overflow-hidden">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Product 1"
                            className="w-full h-auto object-cover rounded-md"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="p-4 rounded-lg overflow-hidden">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Product 2"
                            className="w-full h-auto object-cover rounded-md"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="p-4 rounded-lg overflow-hidden">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Product 3"
                            className="w-full h-auto object-cover rounded-md"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="p-4 rounded-lg overflow-hidden">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Product 4"
                            className="w-full h-auto object-cover rounded-md"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="p-4 rounded-lg overflow-hidden">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Product 5"
                            className="w-full h-auto object-cover rounded-md"
                        />
                    </div>
                </SwiperSlide>
            </Swiper>

        </div>
    );
};

export default Slideshow;
