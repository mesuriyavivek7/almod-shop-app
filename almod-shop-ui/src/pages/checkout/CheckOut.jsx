import React, { useContext, useState } from 'react'
//importing css file
import './checkout.css'
//importing icons
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CloseIcon from '@mui/icons-material/Close';

//importing smallProduct
import SmallProducts from '../../components/smallproducts/SmallProducts';
import { TransContext } from '../../context/TransContext';


//importing checkout windows
import MainContactWindow from '../../components/checkoutwindow/MainContactWindow';
import OtpWindow from '../../components/checkoutwindow/OtpWindow';
import AddressWindow from '../../components/checkoutwindow/AddressWindow';
import PayWindow from '../../components/checkoutwindow/PayWindow';
import { AuthContext } from '../../context/AuthContext';

export default function CheckOut({setModal,cartItems}) {
  const {user}=useContext(AuthContext)

  //for mobile no
  const [mobileNo,setMobileNo]=useState("")  


  //for top buttons
  const [mainContactWindow,setMainContactWindow]=useState((user.verified===false)?(true):(false)) //true
  const [contactWindow,setContactWindow]=useState((user.verified===false)?(true):(false)) //true
  const [otpWindow,setOtpWindow]=useState(false)
  
  const [addressCompleted,setAddressCompleted]=useState(false)
  const [addressWindow,setAddressWindow]=useState((user.verified===false)?(false):(true))

  const [paymentCompleted,setPaymentCopleted]=useState(false)
  const [payWinow,setPayWindow]=useState(false)
 
  const {priceDetails}=useContext(TransContext)

  const topaddressclick=()=>{
    setAddressCompleted(false)
    setAddressWindow(true)
    setPayWindow(false)
  }
  return (
 <div className='checkout'>
   <div className={(addressWindow)?("checkOutContainer addresswide"):("checkOutContainer")}>
      <CloseIcon onClick={()=>setModal(false)} className='checkoutcloseIcon'></CloseIcon>
      <div  className={addressWindow?"left addresswide":"left"}>
        <div className='top'>
           <button disabled={(user.verified===false)}>Contact</button>
           <button disabled={!addressCompleted} onClick={topaddressclick}>Address</button>
           <button disabled={!paymentCompleted}>Pay</button>
        </div>
      
      {/* for mobile no input taking */}
      {
       contactWindow && (
         <MainContactWindow mobileNo={mobileNo} setMobileNo={setMobileNo} setContactWindow={setContactWindow} setOtpWindow={setOtpWindow}></MainContactWindow>
       )

      }
     

      {/* for verify otp  */}
      {
        otpWindow && (
           <OtpWindow mobileNo={mobileNo} setMainContactWindow={setMainContactWindow} setOtpWindow={setOtpWindow} setAddressWindow={setAddressWindow}></OtpWindow>
        )

      }

      {/* for getting address */}

      {
        addressWindow && (
          <AddressWindow setAddressCompleted={setAddressCompleted} setAddressWindow={setAddressWindow} setPayWindow={setPayWindow}></AddressWindow>
        )
      }

      {/* for payment */}

      {
        payWinow && (
          <PayWindow></PayWindow>
        )
      }
      


    </div>

    <div className={addressWindow?"right addresswide":"right"}>
       <h1 className='orderSummeryHead'><LocalMallIcon></LocalMallIcon> Order Summery</h1>
       <div className='orderSummery'>


       {
         cartItems.map((item,i)=>(
              <SmallProducts key={i} productId={item.productId} productSize={item.size} productQnt={item.qnt}></SmallProducts>
         ))
       }


       </div>
       <div className='orderPriceDetails'>
          <span className='gstInfo'>GST Charge Included</span>
          <div className='totalBox'>
            <span>Subtotal:</span>
            <span>Rs. {priceDetails.totalPrice}.00</span>
          </div>
          <div className='totalBox'>
            <span>Shipping charge:</span>
            <span>To be calculated</span>
          </div>
          <hr></hr>
          <div className='grandTotalBox'>
            <span>To Pay</span>
            <span>Rs. {priceDetails.totalPrice}.00</span>
          </div>
       </div>

    </div>

 </div>

</div>
  )
}
