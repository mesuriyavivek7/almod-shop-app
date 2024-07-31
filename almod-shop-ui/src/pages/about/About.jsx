import React,{useEffect} from 'react'

//importing css
import './about.css'


//importing components
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

//importing motion for animation
import {motion} from 'framer-motion'

//importing images
import Person from '../../assets/mitbhuva.png'


export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const fadeInUp={
      hidden:{opacity:0,y:50},
      show:{opacity:1,y:0}
  }
  const transition={
      duration:.5,
      staggerChildren:0.2
  }
  return (
    <>
    <Navbar></Navbar>
    <div className='about'>
        <div className='aboutTitle'>
            <span className='aboutheading'>Our Mission & Vision</span>
            <hr className='aboutline'></hr>
        </div>

        <div className='aboutContainer'>
         <motion.div
                initial='hidden'
                whileInView='show'
                variants={fadeInUp}
                transition={transition}
          className='aboutContent'>
            <div className='aboutBox'>
                <motion.h2
                variants={fadeInUp}
                transition={transition}
                className='aboutHead'>Our Mission</motion.h2>
                <div className='aboutText'>
                    <motion.span
                    variants={fadeInUp}
                    transition={transition}
                    > Fuelflex serve high quality butter & our main aim is improving peoples health.</motion.span>
                   
                </div>
            </div>
            <div className='aboutBox'>
                <motion.h2 
                    variants={fadeInUp}
                    transition={transition}
                className='aboutHead'>Our Vision</motion.h2>
                <div className='aboutText'>
                    <motion.span
                    variants={fadeInUp}
                    transition={transition}
                    >We establish fuelflex to grow the people's health and serve pure and high quality butter to the society.</motion.span>
  
                </div>
            </div>
            
         </motion.div>
        <div className='aboutImg'>
           <motion.img
                initial='hidden'
                whileInView='show'
                variants={fadeInUp}
                transition={transition}
                className='personImg'
            alt='' src={Person}></motion.img>
            <motion.div 
            initial='hidden'
                whileInView='show'
                variants={fadeInUp}
                transition={transition}
            className='persontitle'>
                <span>The Founder</span>
            </motion.div>
        </div>
      </div>

      <div className='moreaboutsec'>
        <motion.div
               initial='hidden'
                whileInView='show'
                variants={fadeInUp}
                transition={transition}
        >
          <motion.h2 
          variants={fadeInUp}
          transition={transition}
          className='aboutselfhead'>" Chase your vision, not the competition "</motion.h2>
          <motion.p
          variants={fadeInUp}
          transition={transition}
          >FIRST UNIFIED was incepted by <b>Mit Bhuva</b>. Bringing their entrepreneurial skills, commitment and astuteness to the fore they have been guiding their team, To their team, working day in and out to realise a dream. To their repertoire of skills they have added the human element which has proved vritical in making a success of <b>FIRST UNIFIED</b>.</motion.p>
        </motion.div>

        <motion.div
        initial='hidden'
        whileInView='show'
        variants={fadeInUp}
        transition={transition}
        >
          <motion.h2 
          variants={fadeInUp}
          transition={transition}
          className='aboutselfhead'>" what direction is India becoming stronger and there will be more soon. "</motion.h2>
          <motion.p
          variants={fadeInUp}
           transition={transition}
          >fuelflex is the household preference at the start of the day and frequently during the day too across india.</motion.p>
          <motion.p
          variants={fadeInUp}
          transition={transition}
          >Now the company is on its way to repeat the success story, taking forward the dream of HAR JAGAH FUELFLEX.</motion.p>
        </motion.div>

        <motion.div
        initial='hidden'
        whileInView='show'
        variants={fadeInUp}
        transition={transition}
        >
         <motion.h2 
          variants={fadeInUp}
          transition={transition}
          className='aboutselfhead'>" Each tree we plant is a step towards a cleaner,greener planet."</motion.h2>
          <motion.p
          variants={fadeInUp}
          transition={transition}
          >Our aim is to make our planet clean and green.For that we have taken out first step towards making the environment clean by planting 501 mango trees.Which will provide oxygen to our environment.Which is also baneficial for people's health....</motion.p>

        </motion.div>

      </div>
      {/* <div className='aboutFooter'>
         <span className='aboutFooterText'>fuelflex was inception mit bhuva. bringing their entrepreneur mind, dedicates  and thet have added the human element. Before starting the business, he met his friend Prayag Katharotiya and he joined the business.</span>
      </div> */}
    </div>
    <Footer></Footer>
    </>
  )
}
