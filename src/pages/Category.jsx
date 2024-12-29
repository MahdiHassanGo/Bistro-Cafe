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
import SectionTitle from "../components/SectionTitle";


const Category = () => {
  return (

    <section>

<div>
<SectionTitle subHeading={"From 11.00AM TO 10.00PM"}
heading={'Order Online'}></SectionTitle>
</div>
        <div>
        <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper mb-24 mt-10 "
    >
      <SwiperSlide><img src={slide1}/>
      <h3 className="text-4xl uppercase text-center text-white  -mt-16 md:mr-20 mb-10">Salads</h3>
      </SwiperSlide>
      <SwiperSlide><img src={slide2}/>
      <h3 className="text-4xl uppercase text-center text-white  -mt-16 md:mr-20">Pizzas</h3></SwiperSlide>
      <SwiperSlide><img src={slide3}/>
      <h3 className="text-4xl uppercase text-center text-white  -mt-16 md:mr-20">Soups</h3></SwiperSlide>
      <SwiperSlide><img src={slide4}/>
      <h3 className="text-4xl uppercase text-center text-white  -mt-16 md:mr-20">Deserts</h3></SwiperSlide>
      <SwiperSlide><img src={slide5}/>
      <h3 className="text-4xl uppercase text-center text-white  -mt-16 md:mr-20">Salads</h3></SwiperSlide>
     
    </Swiper>
        </div>
    </section>
   
  );
};

export default Category;
