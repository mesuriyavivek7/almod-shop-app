import React from 'react'

//importing css
import './contact.css'

import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

//importing motion for animation
import {motion} from 'framer-motion'

//import icons
import WavingHandSharpIcon from '@mui/icons-material/WavingHandSharp';

export default function Contact() {
    const fadeInUp={
      hidden:{opacity:0,y:50},
      show:{opacity:1,y:0}
    }

    const transition={
      duration:.5,
    }

  const mobileChange=(e)=>{
     e.target.value=e.target.value.slice(0,10)
  }
  
  return (
   <>
    <Navbar></Navbar>
    <div className='contact'>
        <div className='contactTitle'>
            <span className='contactheading'>Contact US</span>
            <hr className='contactline'></hr>
        </div>

       <div className='contactContainer'>
         <motion.div
           variants={fadeInUp}
           initial='hidden'
           whileInView='show'
           transition={transition}
          className='contactInfo'>

           <div className='contactHead'>
             <h2 className='contactHeadText'>Connect With US <WavingHandSharpIcon className='waveicon'></WavingHandSharpIcon> </h2>
           </div>

          <div className='contactContent'>
            <span className='infoText'><span className='infoHead'>Company</span> - First Unified Pvt Ltd</span>
            <span className='infoText'><span className='infoHead'>Email</span> - fuelflexindia@gmail.com</span>
            <span className='infoText'><span className='infoHead'>Phone</span> - +91 92650 67663</span>
            <span className='infoText'><span className='infoHead'>Corporate Office</span> - Firts Unified 49, Ved Industrial Park,2 Bhuvaladi Gam Road, Kathwada, Ahmedabad, Gujarat-382430</span>
            <span className='infoText'><span className='infoHead'>working days</span> - Monday to Saturday</span>
            <span className='infoText'><span className='infoHead'>Timing</span> - 9am to 6pm</span>
          </div>

        </motion.div>
        <motion.div 
           transition={transition}
           variants={fadeInUp}
           initial='hidden'
           whileInView='show'
        className='contactForm'>
          
           <form action='https://formspree.io/f/myyrqbzq' method='POST'>
              <div className='formHead'>
                 <span className='formHeadText'>
                   Feel free to fill this contact form to get in touch with our team.
                 </span>
              </div>
              <input className='contactInputBox' type='text' name='name' placeholder='*Name'></input>
              <input className='contactInputBox' type='text' name='email' placeholder='*Email'></input>
              <input className='contactInputBox' type='text' name='mobileno' placeholder='*Phone Number' onChange={mobileChange}></input>
              <input className='contactInputBox' type='text' name='city' placeholder='*Area/City'></input>
              <input className='contactInputBox' type='text' name='country' placeholder='Country'></input>
              <input  className='contactInputBox' type='text' name='message' placeholder='*Meassage'></input>
              <button type='submit' className='contactBtn'>SUBMIT</button>
           </form>
        </motion.div>
       </div>
    </div>
    <Footer></Footer>
    </>
  )
}
