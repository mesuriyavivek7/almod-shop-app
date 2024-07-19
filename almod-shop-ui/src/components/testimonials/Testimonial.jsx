import React from 'react'


//importing css
import './testimonial.css'

//importing swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination,Navigation,Scrollbar, A11y } from 'swiper/modules'

//importing css for swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

//import images

import TestA from '../../assets/testd.jpg'
import TestB from '../../assets/testa.jpg'
import TestC from '../../assets/testb.jpeg'
import TestD from '../../assets/teste.jpeg'
import TestE from '../../assets/test3.jpg'
import TestF from '../../assets/testf.jpeg'


export default function Testimonial() {
  return (
    <div className='testimonial'>
        <div className='testimonialTitle'>
            <span className='testimonialHeading'>Happy Customers</span>
            <hr className='testimonialLine'></hr>
        </div>
        <Swiper 
         className='mySwiper'
         modules={[Pagination,Navigation,Scrollbar, A11y]}
         slidesPerView={4}
         slidesPerGroup={1}
         spaceBetween={40}
         loop={true}
         navigation={true}
         breakpoints={{
          640:{
           slidesPerView:3
          },
          0:{
          slidesPerView:1
          }
         }}
        >
           <SwiperSlide>
             <div className='topSec'>
               <div className='testImage'>
                <img src={TestD} className='testiImg' alt=''></img>
               </div>
               <span className='personName'>Rinal Bhuva</span>
             </div>
             <div className='testiContent'>
              <p className='testitext'>" Fuelflex Peanut Butter has become a staple in my pantry. It's a perfect blend of taste, nutrition, and convenience. "</p>
             </div>
           </SwiperSlide>

           <SwiperSlide>
             <div className='topSec'>
               <div className='testImage'>
                <img src={TestA} className='testiImg' alt=''></img>
               </div>
               <span className='personName'>Mansi Kathrotiya</span>
             </div>
             <div className='testiContent'>
                <p className='testitext'>" I use Fuelflex Peanut Butter as a post-workout snack, a breakfast boost, or even as a healthy dessert topping. "</p>
             </div>
           </SwiperSlide>

           <SwiperSlide>
             <div className='topSec'>
               <div className='testImage'>
                 <img src={TestB} className='testiImg' alt=''></img>
               </div>
               <span className='personName'>Piyush Thummar</span>
             </div>
             <div className='testiContent'>
                <p className='testitext'>" The texture is silky smooth, and the peanut flavor is authentic and intense. You can tell it's made with high-quality peanuts. "</p>
             </div>
           </SwiperSlide>

           <SwiperSlide>
             <div className='topSec'>
               <div className='testImage'>
                 <img src={TestE} className='testiImg' alt=''></img>
               </div>
               <span className='personName'>Dharmik Mangroliya</span>
             </div>
             <div className='testiContent'>
                <p className='testitext'>" The flavor can be more robust and nutty compared to processed peanut butter. It's also less sweet. "</p>
             </div>
           </SwiperSlide>

           <SwiperSlide>
             <div className='topSec'>
              <div className='testImage'>
               <img src={TestC} className='testiImg' alt=''></img>
               </div>
               <span className='personName'>Gautam Sudani</span>
             </div>
             <div className='testiContent'>
                <p className='testitext'>" It's generally higher in healthy fats and lower in sugar and additives compared to regular peanut butter. "</p>
             </div>
           </SwiperSlide>

           <SwiperSlide>
             <div className='topSec'>
              <div className='testImage'>
               <img src={TestF} className='testiImg' alt=''></img>
               </div>
               <span className='personName'>Harmi Patel</span>
             </div>
             <div className='testiContent'>
                <p className='testitext'>"The flavor is rich and nutty with a perfect balance of sweetness and saltiness. "</p>
             </div>
           </SwiperSlide>
        </Swiper>
    </div>
  )
}
