import React from 'react';

//importing css 
import './productslider.css'

//importing swiper
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation, Thumbs ,FreeMode} from 'swiper/modules';
import { useState } from 'react'

//importing css for swiper
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export default function ProductSlider({images}) {
   const [thumbsSwiper, setThumbsSwiper] = useState();

  return (
    <div className='MultyProductSlider'>
        <Swiper
        style={{
          "--swiper-navigation-color": "#503C3C",
          "--swiper-pagination-color": "#503C3C",
        }}
        loop={true}
        spaceBetween={0}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        >
            {
                images.map((item,index)=>(
                    <SwiperSlide key={index}>
                        <img src={item} alt='pic'></img>
                    </SwiperSlide>
                ))
            }
        </Swiper>
        <Swiper
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        >
            {
                images.map((item,index)=>(
                    <SwiperSlide key={index}>
                        <div className='img-wrapper'>
                           <img className='sliderWrapperImg' src={item} alt='pic'></img>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
     </div>
  )
}
