import React from 'react'

//importing css
import './header.css'


//importing core ui
import { CCarousel } from '@coreui/react'
import { CCarouselItem } from '@coreui/react'
import { Link } from 'react-router-dom'

//importing core ui css
import '@coreui/coreui/dist/css/coreui.min.css'

//importing image
import PeanutImg from '../../assets/peanutheader.jpg'
import Header2 from '../../assets/header.jpeg'

//importing navbar
import Navbar from '../navbar/Navbar'
export default function Header() {
  return (
    <>
      <Navbar></Navbar>
        <div className='topheader'>
        
        <CCarousel  controls={false}>
            <CCarouselItem className='carousleItem'>
                <div className='innerSec'>
                   <div className='left'>
                     <div className='content'>
                     <h1>From Farm To Jar, Pure Peanut Bliss</h1>
                     <span>Deliver high protien peanut butter</span>
                     <Link to='/store' style={{textDecoration:'none'}}><button className='expBtn'>Explore Store</button></Link>
                    </div>
                  </div>
                 <div className='right'>
                   <img src={PeanutImg} alt='slide 1'></img>
                 </div>
               </div>
         </CCarouselItem>
         <CCarouselItem  className='carousleItem'>
             <div className='headerImage'>
                <Link to='/store'>
                <img className="d-block w-100" src={Header2} alt="slide 1" />
                </Link>
             </div>
       </CCarouselItem>

   </CCarousel>
        </div>

    </>
  )
}
