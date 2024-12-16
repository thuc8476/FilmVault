import React from 'react';

const GalaxyPlayInfo = () => {
    return (
        <div className="bg-black text-white py-10 px-5">
            <h2 className="text-2xl font-semibold text-center mb-6">Bạn có 2 cách để thưởng thức Galaxy Play</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
                {/* Buffet */}
                <div className="flex-1 bg-gray-800 p-5 rounded-lg">
                    <img
                        src="https://link-to-bong-hong-lua-image.jpg"
                        alt="Bông Hồng Lửa"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">TIỆC “BUFFET”</h3>
                    <button className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-md mb-4 hover:bg-yellow-500">
                        XEM PHIM GÓI
                    </button>
                    <p>Chỉ 70K/tháng, thỏa thích xem hàng ngàn bộ phim...</p>
                </div>

                {/* Thuê phim lẻ */}
                <div className="flex-1 bg-gray-800 p-5 rounded-lg">
                    <img
                        src="https://link-to-bo-gia-image.jpg"
                        alt="Bố Già"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">CHỌN MÓN</h3>
                    <button className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-md mb-4 hover:bg-yellow-500">
                        THUÊ PHIM LẺ
                    </button>
                    <p>Thưởng thức những bộ phim MỚI ngay sau rạp...</p>
                </div>
            </div>
        </div>
    );
};

export default GalaxyPlayInfo;
