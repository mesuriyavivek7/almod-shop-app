import React from 'react'


//importing css
import './searchItem.css'



//importign motion
import {motion} from 'framer-motion'


export default function SearchResult({productTitle,sellingPrice,orgPrice}) {
  const transition={
      duration: 0.5,
      delay: 0.2,
      ease: [0, 0.71, 0.2, 1.01]
    
  }
  return (
    <motion.div className='searchItem' 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={transition}
    >
        <img className='searchItemImg' alt='' src={Almod}></img>
        <div className='searchProductDesc'>
           <span className='searchProductTitle'>{productTitle}</span>
           <div className='searchProductPrice'>
              <span className='ProductPrice'>Rs. {sellingPrice}</span>
              {orgPrice!==undefined && (<span className='orgPrice'>Rs. {orgPrice}</span>)}
           </div>
        </div>
    </motion.div>
  )
}
