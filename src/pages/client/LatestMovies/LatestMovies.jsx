// Import necessary libraries
import React from 'react';
import { Button } from '@mui/material';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
const LatestMovies = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <img
          src="/path/to/face-me-banner.jpg"
          alt="Face Me Banner"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-8">
          <h1 className="text-4xl font-bold">FACE ME</h1>
          <h2 className="text-lg mt-2">ĐỐI MẶT</h2>
          <p className="text-sm mt-4">
            Sau cái chết bạn gái, Cha Jeong Woo rơi hướng trở thành bác sĩ tâm lý. Sự đối đầu đầy kịch tính
            giữa anh và Lee Min Hyung mở ra nhiều góc khuất bất ngờ.
          </p>
          <p className="text-sm mt-2 text-blue-400">
            Tập mới ra mắt vào tối T4, T5 hàng tuần
          </p>
          <div className="flex gap-4 mt-4">
            <Button variant="contained" color="primary">
              Đăng ký gói
            </Button>
            <Button variant="outlined" color="secondary">
              Xem trailer
            </Button>
          </div>
        </div>
      </div>
      {/* Navigation Arrows */}
      <div className="flex justify-between items-center p-4">
        <AiOutlineLeft className="text-3xl cursor-pointer" />
        <span className="text-sm text-gray-400">T16</span>
        <AiOutlineRight className="text-3xl cursor-pointer" />
      </div>
      {/* Related TV Shows Section */}
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-4">Phim Bộ Việt Hay Nhất Trên Galaxy Play</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={`/path/to/vietnamese-drama-${index + 1}.jpg`}
                alt={`Drama ${index + 1}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-2 text-center">
                <h4 className="text-sm font-semibold">Drama {index + 1}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestMovies;
