import React,{useEffect} from 'react'

//importing css
import './about.css'


//importing components
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

//importing motion for animation
import {motion} from 'framer-motion'

//importing images
import Person from '../../assets/mitbhuva.jpeg'

//importing icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
                    ><ArrowForwardIcon></ArrowForwardIcon>  Customer oriented and we stand for quality.</motion.span>
                    <motion.span
                    variants={fadeInUp}
                    transition={transition}
                    ><ArrowForwardIcon></ArrowForwardIcon>  Self improvement and team work to achieve business excellence.</motion.span>
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
                    ><ArrowForwardIcon></ArrowForwardIcon> Let us top this business in minimum time.</motion.span>
                    <motion.span
                    variants={fadeInUp}
                    transition={transition}
                    ><ArrowForwardIcon></ArrowForwardIcon> Fuelflex at home, Fuelflex at every home, Fuelflex everywhere.</motion.span>
                </div>
            </div>
            <div className='aboutBox'>
                <motion.h2 
                    variants={fadeInUp}
                    transition={transition}
                className='aboutHead'>Culture</motion.h2>
                <div className='aboutText'>
                    <motion.span
                    variants={fadeInUp}
                    transition={transition}
                    ><ArrowForwardIcon></ArrowForwardIcon> Employee engagement & opportunities for advancement.</motion.span>
                    <motion.span
                    variants={fadeInUp}
                    transition={transition}
                    ><ArrowForwardIcon></ArrowForwardIcon> Relationship between employee & customer.</motion.span>
                </div>
            </div>
         </motion.div>
        <div className='aboutImg'>
           <motion.img
                initial='hidden'
                whileInView='show'
                variants={fadeInUp}
                transition={transition}
            alt='' src={Person}></motion.img>
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
          >FIRST UNIFIED was incepted by Mit Bhuva. Bringing their entrepreneurial skills, commitment and astuteness to the fore they have been guiding their team, To their team, working day in and out to realise a dream. To their repertoire of skills they have added the human element which has proved vritical in making a success of FIRST UNIFIED.</motion.p>
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
      </div>
      {/* <div className='aboutFooter'>
         <span className='aboutFooterText'>fuelflex was inception mit bhuva. bringing their entrepreneur mind, dedicates  and thet have added the human element. Before starting the business, he met his friend Prayag Katharotiya and he joined the business.</span>
      </div> */}
    </div>
    <Footer></Footer>
    </>
  )
}
