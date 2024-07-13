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
import Banner3 from '../../assets/banner3.jpg'
import Banner2 from '../../assets/banner2.png'
import Banner1 from '../../assets/banner1.jpg'
import Banner4 from '../../assets/banner4.jpg'

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
                   <img src={Banner3} alt='slide 1'></img>
                 </div>
               </div>
         </CCarouselItem>
         <CCarouselItem  className='carousleItem'>
          <Link to='/store'>
             <div className='headerImage'>
                 <div className='secondcontent'>
                    <span className='uppertag'>" Pure Peanut Butter Perfection! "</span>
                    <h1>Spread the <span className='specialtext'>Love, </span>Spread the Flavor.</h1>
                    <button className='secondbtn'>Shop Now</button>
                 </div>
                
                  <img className="d-block w-100" src={Banner1} alt="slide 1" />
                
             </div>
          </Link>
        </CCarouselItem>
        <CCarouselItem  className='carousleItem'>
             <div className='headerImage'>
                 
                <Link to='/store'>
                  <img className="d-block w-100" src={Banner4} alt="slide 1" />
                </Link>
             </div>
        </CCarouselItem>

        <CCarouselItem  className='carousleItem'>
             <div className='headerImage'>
                <div className='thirdcontent'>
                   <h1>Yummy<br></br>Natural & Healthy<br></br> Crunch</h1>
                </div>
                <Link to='/store'>
                  <img className="d-block w-100" src={Banner2} alt="slide 2" />
                </Link>
             </div>
        </CCarouselItem>


   </CCarousel>
        </div>

    </>
  )
}
