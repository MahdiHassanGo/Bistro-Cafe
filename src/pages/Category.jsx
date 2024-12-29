import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import slide1 from '../../public/assets/home/slide1.jpg'
import slide2 from '../../public/assets/home/slide2.jpg'
import slide3 from '../../public/assets/home/slide3.jpg'
import slide4 from '../../public/assets/home/slide4.jpg'
import slide5 from '../../public/assets/home/slide5.jpg'


const Category = () => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      <SwiperSlide><img src={slide1}/></SwiperSlide>
      <SwiperSlide><img src={slide2}/></SwiperSlide>
      <SwiperSlide><img src={slide3}/></SwiperSlide>
      <SwiperSlide><img src={slide4}/></SwiperSlide>
      <SwiperSlide><img src={slide5}/></SwiperSlide>
     
    </Swiper>
  );
};

export default Category;
