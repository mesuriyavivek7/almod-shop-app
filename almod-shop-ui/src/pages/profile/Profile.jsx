import React, { useContext } from 'react'

//importing css
import './profile.css'

//importing components
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import OrderItem from '../../components/orderitem/OrderItem'

//importing icons
import LogoutIcon from '@mui/icons-material/Logout';

//importing images
import EmptyOrder from '../../assets/empty-box.png'

//import navigate
// import { useNavigate } from 'react-router-dom'

//importing context
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import axios from 'axios'

import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const baseURL=process.env.REACT_APP_API_BASE_URL
  const {user}=useContext(AuthContext)
  const navigate=useNavigate()
  
  //fetch product data
  const {data,loading}=useFetch(`/transaction/info/${user._id}`)
  
  const logouthandler=async ()=>{
     try{
       await axios.post(`${baseURL}/auth/logout`,{},{ withCredentials: true })
       navigate('/login')
     }catch(err){
        console.log(err)
     }
  }
  return (
    <>
        <Navbar></Navbar>
           <div className='profile'>
              <div className='profileTitle'>
                <span className='profileheading'>My Profile</span>
                <hr className='profileline'></hr>
              </div>

              <div className='profileContainer'>
                 <div className='profiledetails'>
                    
                    <div className='infocontent'>
                       <div className='infotopsec'>
                          <h2>account details</h2>
                          <button className='logoutbtn' onClick={()=>logouthandler()}><LogoutIcon fontSize='small'></LogoutIcon> LOGOUT</button>
                       </div>

                       <div className='infoContainer'>
                          <div className='leftinfo'>
                            <span className='leftspan'>Name:</span>
                            <span className='leftspan'>Email:</span>
                          </div>
                          <div className='rightinfo'>
                            <span className='rightspan'>{`${user.first_name} ${user.last_name}`}</span>
                            <span className='rightspan'>{user.email}</span>
                          </div>
                       </div>

                    </div>
                    <div className='addressinfo'>
                        <h2>my address</h2>

                       {
                        (user.address)?(
                          <div className='addressContainer'>
                          <div className='leftaddress'>
                            <span className='leftspan'>Address:</span>
                            <span className='leftspan'>City:</span>
                            <span className='leftspan'>Postcode:</span>
                            <span className='leftspan'>State:</span>
                            <span className='leftspan'>Country:</span>
                          </div>

                          <div className='rightaddress'>
                            <span className='rightspan'>{`${user.address.flateno}, ${user.address.apartment}, ${user.address.locality}`}</span>
                            <span className='rightspan'>{user.address.city}</span>
                            <span className='rightspan'>{user.address.postcode}</span>
                            <span className='rightspan'>{user.address.city}</span>
                            <span className='rightspan'>India</span>
                          </div>

                        </div> 

                        ):(
                          <span className='addaddress'>You haven't added your address please, <span className='addresslink'>Add Address</span>.</span>
                        )
                       }
                        

                        
                        
                        
                    </div>
                 </div>
                 <div className='orderdetails'>
                   <h2>orders</h2>
                  
                   {
                     (data.length===0)?(
                        <div className='emptyorder'>
                           <img src={EmptyOrder} alt=''></img>
                           <span>There is nothing to show, make your first order.</span>
                        </div>
                     ):(

                      (loading===true)?(<span>Loading please wait...</span>):(
                        <div className='orderContainer'>
                              {
                                data.map((item,i)=>(
                                   <OrderItem key={i} productId={item}></OrderItem>
                                ))
                              }
                        </div>
                      )

                      

                     )
                   }
                   



                 </div>
              </div>
           </div>
        <Footer></Footer>
    </>
  )
}
