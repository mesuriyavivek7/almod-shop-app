import React,{useEffect} from 'react'

//importing components
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

//importing css
import './sp.css'

export default function SP() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
        <Navbar></Navbar>
        <div className='sp'>
            <div className='sphead'>
                <h2>Shipping Policy</h2>
            </div>
            <p>This Shipping Policy outlines the terms and conditions regarding the shipping of our products to ensure a smooth and satisfactory experience for our customers. FIRST UNIFIED reserves the right to update or modify these terms and conditions at any time without prior notice.</p>
    <div className='spcontent'>
    <h2>1. Order Processing:</h2>
    <h3>a. Processing Time:</h3>
    <p>Orders are typically processed and dispatched within the same or the next business day (excluding weekends and holidays) after the order is placed and payment is confirmed. Delivering of the shipment is subject to the courier company or post office norms.</p>
    
    <h3>b. Order Confirmation:</h3>
    <p>Upon placing an order, you will receive an email confirmation with the details of your purchase and order number. Please review this confirmation for accuracy and contact us immediately if any corrections are needed.</p>
    </div>

    <div className='spcontent'>
    <h2>2. Shipping Methods:</h2>
    <h3>a. Domestic Shipping:</h3>
    <p>Shipping times and costs are calculated at checkout based on the pincode submitted on the order page. Orders are shipped through registered domestic courier companies and/or registered Indian post only.</p>
    <p>We envision to offer international shipping in the future.</p>
    </div>
    <div className='spcontent'>
    <h2>3. Shipping Rates:</h2>
    <h3>a. Domestic Rates:</h3>
    <p>Domestic shipping rates are determined by the weight of the order and the selected shipping method. Free shipping may be available for orders over a certain value, as specified on our website.</p>
    <p>These Terms and Conditions may change.</p>
    </div>

    <div className='spcontent'>
    <h2>4. Shipment Tracking:</h2>
    <h3>a. Tracking Information:</h3>
    <p>Once your order is dispatched, you will receive a shipping confirmation email with tracking information. You can use this information to track the status and location of your package.</p>

    <h3>b. Delivery Updates:</h3>
    <p>We recommend keeping an eye on the provided tracking information for real-time updates on the delivery status. In case of any issues, please contact our customer support team for assistance.</p>
    </div>

    <div className='spcontent'>
    <h2>5. Delivery Times:</h2>
    <h3>a. Estimated Times:</h3>
    <p>Delivery of all orders will be to registered address of the buyer and/or address provided by the buyer at the time of Order. a unit of Fuelflex, FIRST UNIFIED is in no way responsible for any damage to the order while in transit to the buyer. Estimated delivery times are provided during checkout based on the shipping method selected. Please note that these are estimates, and actual delivery times may vary due to external factors.</p>
    </div>

    <div className='spcontent'></div>
    <h2>6. Order Changes and Cancellations:</h2>
    <h3>a. Changes:</h3>
    <p>Once an order is placed, changes to the shipping address, products, or other details may not be possible. Please review your order carefully before confirming the purchase.</p>
    
    <h3>b. Cancellations:</h3>
    <p>Orders cannot be cancelled after they have been dispatched. If you wish to cancel an order, please contact us as soon as possible, and we will do our best to accommodate your request.</p>
    <div className='spcontent'>
    <h2>7. Contact Us:</h2>
    <p>If you have any questions or concerns about our Shipping Policy, please contact our concerned person at +91 92650 67663 or write to us at <a href="mailto:fuelflexindia@gmail.com">fuelflexindia@gmail.com</a>.</p>
    
    <p>By placing an order with a unit of Fuelflex, FIRST UNIFIED, you acknowledge that you have read, understood, and agreed to the terms outlined in this Shipping Policy.</p>
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
