import React from "react";

function HomeContent() {
    const movies = [
        { id: 1, title: "Eve", imgUrl: "https://assets.glxplay.io/web/responsive/w300/Eve_1000x1500.jpg" },
        { id: 2, title: "Chị Mẹ Học Yêu 2", imgUrl: "https://assets.glxplay.io/web/responsive/w300/ChiMeHocYeu2_1000x1500.jpg" },
        { id: 3, title: "Doctor Strange", imgUrl: "https://assets.glxplay.io/web/responsive/w300/DoctorStrangeInTheMultiverseOfMadness_1000x1500.jpg" },
        { id: 4, title: "Lọ Lem Thời Đại", imgUrl: "https://assets.glxplay.io/web/responsive/w300/Cinderella2021_1000x1500.jpg" },
        { id: 5, title: "Chìa Khóa Trăm Tỷ", imgUrl: "https://assets.glxplay.io/web/responsive/w300/ChiaKhoaTramTy_1000x1500.jpg" },
        { id: 6, title: "Học Viện Anh Hùng", imgUrl: "https://assets.glxplay.io/web/responsive/w300/MyHeroAcademiaWorldHeroesMission_1000x1500.jpg" },
    ];

    const partners = [
        "Sony Pictures",
        "Universal",
        "Walt Disney",
        "Studio Dragon",
        "CJ Entertainment",
    ];

    return (
        <div className="bg-black text-white px-8 py-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
                {/* Text Content */}
                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-6 leading-tight">
                        Giải trí online không giới hạn
                        <br />
                        hàng nghìn giờ nội dung đậm chất Việt
                    </h1>
                    <ul className="text-lg space-y-4">
                        <li>Bom tấn Việt chiếu rạp độc quyền và sớm nhất</li>
                        <li>Thư viện phim Việt lớn nhất Việt Nam</li>
                        <li>Phim Bộ độc quyền Galaxy Play</li>
                        <li>Phim Bộ Hot Châu Á</li>
                        <li>Siêu phẩm điện ảnh Hollywood và Disney</li>
                    </ul>
                    <button className="mt-6 bg-white text-black py-3 px-6 rounded-md text-lg font-semibold hover:bg-gray-200">
                        Đăng ký ngay
                    </button>
                </div>

                {/* Movie Thumbnails */}
                <div className="flex-1 grid grid-cols-3 gap-4">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
                        >
                            <img
                                src={movie.imgUrl}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="bg-black bg-opacity-50 text-center py-2">
                                <p className="text-white text-sm font-semibold">{movie.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Partners Section */}
            <div className="mt-16 text-center">
                <p className="text-lg font-semibold mb-6">100+ đối tác sản xuất phim trong nước và quốc tế</p>
                <div className="flex justify-center items-center gap-8 flex-wrap">
                    {partners.map((partner, index) => (
                        <p key={index} className="text-white text-sm font-medium">
                            {partner}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeContent;
