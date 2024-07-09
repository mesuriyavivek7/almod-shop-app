import React, { useState } from 'react'

//importing css
import './bulkorder.css'

//importing components
import Navbar from '../../components/navbar/Navbar'

import Footer from '../../components/footer/Footer'
import useFetch from '../../hooks/useFetch'

//importing motion for animation
import {motion} from 'framer-motion'

export default function BulkOrder() {
  const {data,loading}=useFetch('/product')

  const fadeInUp={
   hidden:{opacity:0,scale:0.5},
   show:{opacity:1,scale:1}
  }
  const transition={
     duration:.3,
     staggerChildren:0.2,
     ease: [0, 0.71, 0.2, 1.01]
  }

  const mobileChange=(e)=>{
    e.target.value=e.target.value.slice(0,10)
  }
 
  const [submit,setSubmit]=useState(false)

  const isproductSelected=(e)=>{
     if(e.target.value!=='none' && e.target.value!==''){
        setSubmit(true)
     }else{
        setSubmit(false)
     }
  }
  return (
    <>
        <Navbar></Navbar>
        <div className='bulkorder'>
           <div className='contactTitle'>
                <span className='oheading'>Bulk Order</span>
                <hr className='oline'></hr>
           </div>
           <div className='ordercontainer'>
             <motion.form 
             variants={fadeInUp}
             initial='hidden'
             animate='show'
             transition={transition}
             className='orderform' action='https://formspree.io/f/mgvwejrg' method='POST'>
               <motion.input
               variants={fadeInUp}
               transition={transition}
                className='orderinputbox' name='name' type='text' placeholder='Name *' required></motion.input>
               <motion.input 
                variants={fadeInUp}
               transition={transition}
               className='orderinputbox' name='mobileno' type='text' onChange={mobileChange} placeholder='Contact no *' required></motion.input>
               <motion.input
                variants={fadeInUp}
               transition={transition}
                className='orderinputbox' name='email' type='email' placeholder='Email *' required></motion.input>
               <motion.input
                variants={fadeInUp}
               transition={transition}
                className='orderinputbox' name='Businessname' type='text' placeholder='Business or Shop name'></motion.input>
               <motion.select
                variants={fadeInUp}
               transition={transition}
                className='orderselectbox' name='product' onChange={isproductSelected}  required>
                  <option value={"none"}>--Select Products --</option>
                  {
                    (loading)?(<option value={'none'}>Loading....</option>):(
                        (data.length===0)?(<option value={'none'}>Sorry No Products Available</option>):(
                            data.map((product,i)=>(
                             <option key={i} value={product.title}>{product.title}</option>
                            ))
                        )
                    )
                  }
               </motion.select>
               <motion.input
                variants={fadeInUp}
               transition={transition}
                className='orderinputbox' name='quantity' type='number' placeholder='Quantity (in kg) *' required></motion.input>
               <motion.div 
                variants={fadeInUp}
               transition={transition}
               className='borderaddress'>
                  <input className='orderinputbox' name='city' type='text' placeholder='City  *' required></input>
                  <select className='orderselectbox' name="state" id="State">
                     <option value="Gujarat">Gujarat</option>
                     <option value="Andhra Pradesh">Andhra Pradesh</option>
                     <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                     <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                     <option value="Assam">Assam</option>
                     <option value="Bihar">Bihar</option>
                     <option value="Chandigarh">Chandigarh</option>
                     <option value="Chhattisgarh">Chhattisgarh</option>
                     <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                     <option value="Daman and Diu">Daman and Diu</option>
                     <option value="Delhi">Delhi</option>
                     <option value="Lakshadweep">Lakshadweep</option>
                     <option value="Puducherry">Puducherry</option>
                     <option value="Goa">Goa</option>
                     <option value="Haryana">Haryana</option>
                     <option value="Himachal Pradesh">Himachal Pradesh</option>
                     <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                     <option value="Jharkhand">Jharkhand</option>
                     <option value="Karnataka">Karnataka</option>
                     <option value="Kerala">Kerala</option>
                     <option value="Madhya Pradesh">Madhya Pradesh</option>
                     <option value="Maharashtra">Maharashtra</option>
                     <option value="Manipur">Manipur</option>
                     <option value="Meghalaya">Meghalaya</option>
                     <option value="Mizoram">Mizoram</option>
                     <option value="Nagaland">Nagaland</option>
                     <option value="Odisha">Odisha</option>
                     <option value="Punjab">Punjab</option>
                     <option value="Rajasthan">Rajasthan</option>
                     <option value="Sikkim">Sikkim</option>
                     <option value="Tamil Nadu">Tamil Nadu</option>
                     <option value="Telangana">Telangana</option>
                     <option value="Tripura">Tripura</option>
                     <option value="Uttar Pradesh">Uttar Pradesh</option>
                     <option value="Uttarakhand">Uttarakhand</option>
                     <option value="West Bengal">West Bengal</option>
                  </select>
               </motion.div>
             <motion.button 
              variants={fadeInUp}
               transition={transition}
             disabled={!submit} className='ordersubmit'>Send Request</motion.button>
            </motion.form>
           </div>

        </div>
        <Footer></Footer>
    </>
  )
}
