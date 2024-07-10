import React from 'react'
import { useState,useEffect } from 'react';


//importing css
import './offer.css'

// //import css for react slick
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";

//import navigate
import { useNavigate } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';


//importing motion for animation
import { motion,useAnimation } from "framer-motion"


export default function Offer() {
 
 //for transition
 const controls=useAnimation()
 const transition={duration:3,type:"spring",}
 const [lastScrollTop, setLastScrollTop] = useState(0);
 const [scrollDirection, setScrollDirection] = useState('up');
 
 const variants={
   hidden:{bottom:"-2rem"},
   visible:{bottom:"0rem"}
 }

 const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    setScrollDirection('down');
    controls.start('visible');
  } else {
    setScrollDirection('up');
    controls.start('hidden');
  }
  setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
};

useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [lastScrollTop, controls]);



 const navigate=useNavigate()
 const {data,loading}=useFetch('/category')

 const handleSearch=(keyword)=>{
    navigate('/store',{state:keyword})
 }
  
  return (
    <div className='category'>
        <div className='categoryTitle'>
            <span className='catheading'>Best Categories</span>
            <hr className='catline'></hr>
        </div>

     <div className='categorySec'>
        {
           (loading)?(<span>Loading please wait......</span>):(
                 data.map((cat,i)=>(
                  <div key={i} className='categoryItem' onClick={()=>handleSearch(cat.keyword)}>
                    <motion.img 
                      initial="hidden"
                      animate={controls}
                      variants={variants}
                      transition={transition}
                    src={cat.catImg} alt=''></motion.img>
                    <div 
                    className='catContent'>
                      <h2 className='catTitle'>{cat.catname}</h2>
                      <span className='catSpan'><i>Starting from </i> Rs. {cat.minPrice}.00</span>
                    </div>
                   </div>
                 ))
           )
        }
     </div>
    
    </div>
  )
}
