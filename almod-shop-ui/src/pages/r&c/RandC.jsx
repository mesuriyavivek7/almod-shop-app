import React,{useEffect} from 'react'

import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

//importing css
import './randr.css'

export default function RandC() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
        <Navbar></Navbar>
          <div className='randc'>
             <div className='cancelhead'>
                 <h2>Refund and Return Policy</h2>
             </div>
             <p>Last Updated: 10-7-2024</p>
             <p>FUELFLEX & FIRST UNIFIED aims to provide high-quality products and excellent customer service. Please review our Refunds & Return Policy to understand your rights and responsibilities regarding refunds, returns, and exchanges.</p>
             <div className='randccontent'>

    
    <h2>1. Returns Eligibility:</h2>
    <h3>a. Defective or Damaged Products:</h3>
    <p>If you receive a defective or damaged product (subject to investigation), please contact us within 7 days of receiving the item. We will provide instructions on how to return the product for a replacement or refund.</p>
    
    <h3>b. Incorrect Items:</h3>
    <p>If you receive an incorrect item (subject to investigation), please notify us within 7 days of receiving the order. We will arrange for the correct item to be shipped to you or issue a refund.</p>
    
    <h3>c. Unsatisfactory Products:</h3>
    <p>If you are unsatisfied with your purchase for any reason other than the above, please contact us within 7 days of receiving the order. We will assess each case individually to determine the appropriate solution.</p>
    <p>Subject to the investigation, the firm may accept any return 7 days after delivery. Subject to investigation, in any case of a quality complaint, the firm may try and exchange the product with the quantity left, or else the firm may pay back the balance amount of the product (depending on qty. left).</p>
    <p>Only for the below mentioned reasons will www.fuelflex.in accept returns:</p>
    <ul>
        <li>Wrong Product</li>
        <li>Damaged Product</li>
        <li>Incomplete Package</li>
    </ul>
    </div>

    <div className='randccontent'>
    
    <h2>2. Return Process:</h2>
    <h3>a. Authorization:</h3>
    <p>Before returning any items, please contact our customer support team at <a href="mailto:fuelflexindia@gmail.com">fuelflexindia@gmail.com</a> to obtain authorization. Unauthorized returns may not be accepted.</p>
    
    <h3>b. Condition of Products:</h3>
    <p>Returned products must be unused, in their original packaging, and in the same condition as when you received them. We reserve the right to refuse returns that do not meet these criteria.</p>
    
    </div>
    <div className='randccontent'>
    <h2>3. Refund Process:</h2>
    <h3>a. Refund Eligibility:</h3>
    <p>Refunds are issued for the purchase price of the returned item(s). Shipping costs are non-refundable.</p>
    
    <h3>b. Refund Timeframe:</h3>
    <p>Subject to investigation, GM TULSI TRADELINK, a unit of Tulsi Tea & G. M. TEA PACKERS PVT. LTD. may pay back the amount in 7 working days’ time from the date of approval. The time it takes for the refund to reflect in your account may vary depending on your payment method.</p>
    </div>

    <div className='randccontent'>
    <h2>4. Exchanges:</h2>
    <h3>a. Product Exchanges:</h3>
    <p>If you wish to exchange a product for a different variant, please contact us for authorization. Exchanges are subject to product availability.</p>
    </div>

    <div className='randccontent'>
    <h2>5. Non-Returnable Items:</h2>
    <h3>a. Sale and Clearance Items:</h3>
    <p>Sale and clearance items are final sale and cannot be returned or exchanged unless defective.</p>
    
    <h3>b. Gift Cards:</h3>
    <p>Gift cards are non-refundable.</p>
    </div>

    <div className='randccontent'>
    <h2>6. Contact Us:</h2>
    <p>If you have any questions or concerns about our refunds & return policy, please contact us at <a href="mailto:fuelflexindia@gmail.com">fuelflexindia@gmail.com</a>.</p>
    
    <p>By making a purchase with www.fuelflex.in, you acknowledge that you have read, understood, and agreed to the terms outlined in this refunds & return policy.</p>
    </div>

    <address>
        <strong>First Unified</strong><br></br>
        49, Ved Industrial Park- 2,<br></br>
        Bhuvaladi Gam Road, Kathwada,<br></br>
        Ahmedabad - 382430.<br></br>
        +91 92650 67663<br></br>
        <a href="mailto:fuelflexindia@gmail.com">fuelflexindia@gmail.com</a>
     </address>

     
             
        
</div>
        <Footer></Footer>
    
    </>
  )
}
