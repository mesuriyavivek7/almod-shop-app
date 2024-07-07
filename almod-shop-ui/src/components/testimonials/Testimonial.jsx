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

import Test1 from '../../assets/test1.jpg'
import Test2 from '../../assets/test2.jpeg'
import Test3 from '../../assets/test3.jpg'
import Test4 from '../../assets/test4.jpeg'
import Test5 from '../../assets/test5.jpeg'

export default function Testimonial() {
  return (
    <div className='testimonial'>
        <div className='testimonialTitle'>
            <span className='testimonialHeading'>What's customer says</span>
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
               <img src={Test1} className='testiImg' alt=''></img>
               <span className='personName'>Brijesh lakhani</span>
             </div>
             <div className='testiContent'>
              <p className='testitext'>" Fuelflex Peanut Butter has become a staple in my pantry. It's a perfect blend of taste, nutrition, and convenience. "</p>
             </div>
           </SwiperSlide>

           <SwiperSlide>
             <div className='topSec'>
               <img src={Test2} className='testiImg' alt=''></img>
               <span className='personName'>Darshan patel</span>
             </div>
             <div className='testiContent'>
                <p className='testitext'>" I use Fuelflex Peanut Butter as a post-workout snack, a breakfast boost, or even as a healthy dessert topping. "</p>
             </div>
           </SwiperSlide>

           <SwiperSlide>
             <div className='topSec'>
               <img src={Test3} className='testiImg' alt=''></img>
               <span className='personName'>Lalji sudani</span>
             </div>
             <div className='testiContent'>
                <p className='testitext'>" The texture is silky smooth, and the peanut flavor is authentic and intense. You can tell it's made with high-quality peanuts. "</p>
             </div>
           </SwiperSlide>

           <SwiperSlide>
             <div className='topSec'>
               <img src={Test4} className='testiImg' alt=''></img>
               <span className='personName'>Gautam sudani</span>
             </div>
             <div className='testiContent'>
                <p className='testitext'>" The flavor can be more robust and nutty compared to processed peanut butter. It's also less sweet. "</p>
             </div>
           </SwiperSlide>

           <SwiperSlide>
             <div className='topSec'>
               <img src={Test5} className='testiImg' alt=''></img>
               <span className='personName'>Dharmik Mangroliya</span>
             </div>
             <div className='testiContent'>
                <p className='testitext'>" t's generally higher in healthy fats and lower in sugar and additives compared to regular peanut butter. "</p>
             </div>
           </SwiperSlide>
        </Swiper>
    </div>
  )
}
