import React from 'react'

//importing components
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'


//importing css

import './tos.css'


export default function TOS() {
  return (
    <div>
        <Navbar></Navbar>
          <div className='tos'>
             <div className='toshead'>
                <h2>Terms of service</h2>
                <div className='toscontent'>
                    
                </div>
             </div>
          </div>
        <Footer></Footer>
    </div>
  )
}
