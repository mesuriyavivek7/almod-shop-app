import React from 'react'

//importing css
import './home.css'

//importing components
// import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Offer from '../../components/offer/Offer'
import Products from '../../components/products/Products'
import Testimonial from '../../components/testimonials/Testimonial'
import Insta from '../../components/insta/Insta'
import Footer from '../../components/footer/Footer'


export default function Home() {
  return (
    <div>
       {/* <Navbar></Navbar> */}
       <Header></Header>
       <Offer></Offer>
       <Products></Products>
       <Testimonial></Testimonial>
       <Insta></Insta>
       {/* iske liye ap ka responsiveness kho raha he */}
       <Footer></Footer>
    </div>
  )
}
