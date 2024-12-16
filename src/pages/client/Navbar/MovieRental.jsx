import React from 'react';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { Button } from '@mui/material';
const MovieRental = () => {
    return (
        <div className="bg-black text-white min-h-screen">
            {/* Header Section */}
            <div className="relative">
                <img
                    src="/path/to/your/image.jpg"
                    alt="The Forge"
                    className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8">
                    <h1 className="text-4xl font-bold">THE FORGE</h1>
                    <h2 className="text-xl mt-2">CHIẾN THUẬT CUỘC ĐỜI</h2>
                    <p className="text-sm mt-4">
                        Cậu chàng Isaiah bê tha, không học đại học, không lý tưởng, chỉ biết vui
                        đầu vào game và bóng rổ. Và chỉ với ba câu hỏi của giám đốc Joshua Moore,
                        cậu dần tìm được động lực cho cuộc sống.
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                        <span className="bg-gray-800 py-1 px-2 rounded">2024</span>
                        <span className="bg-gray-800 py-1 px-2 rounded">T13</span>
                        <span className="bg-gray-800 py-1 px-2 rounded">118 phút</span>
                        <span className="bg-gray-800 py-1 px-2 rounded">HD</span>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AiOutlinePlayCircle />}
                        className="mt-4"
                    >
                        Thuê phim 50.000đ
                    </Button>
                </div>
            </div>

            {/* Related Movies Section */}
            <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Phim Liên Quan</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Example of a single movie card */}
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                            <img
                                src={`/path/to/related-movie-${index + 1}.jpg`}
                                alt={`Related movie ${index + 1}`}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h4 className="text-lg font-semibold">Movie Title {index + 1}</h4>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className="mt-2 w-full"
                                >
                                    Phim Thuê
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieRental;
