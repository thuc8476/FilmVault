import React from 'react';

function PremiumFeatures() {
    return (
        <div className="bg-black text-white px-8 py-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Phần nội dung */}
                <div>
                    <h2 className="text-4xl font-bold mb-4">Chia sẻ từng khoảnh khắc cùng người thân và bạn bè</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-2xl font-semibold">1. Tài khoản Galaxy Play Cao Cấp</h3>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold">5. Thiết bị</h3>
                            <p>Đăng nhập trên 5 thiết bị cùng lúc</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold">4. Thiết bị song song</h3>
                            <p>Xem trên 4 thiết bị cùng lúc</p>
                        </div>
                    </div>
                    <button className="mt-6 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200">
                        Đăng ký ngay
                    </button>
                </div>
                {/* Phần hình ảnh */}
                <div className="flex justify-center">
                    <img
                        src="https://assets.glxplay.io/web/responsive/w1000/Spotlight%20on%20Device_VER2%20X1.png" // Thay bằng đường dẫn thực tế đến ảnh của bạn
                        alt="Premium Features"
                        className="max-w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
}

export default PremiumFeatures;
