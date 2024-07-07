import React from 'react'
import {Link} from 'react-router-dom'

//importing css
import './footer.css'


//importing icons
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <div className='footer'>
        <div className='footerSec'>
            <div className='footerItem'>
                <span className='footerLogo'>
                   fuelflex.
                </span>
                <div className='socialLinks'>
                   <span className='socialTitle'>Follow Us:</span>
                   <div className='links'>
                     <a href="https://www.instagram.com/fuelflex.in/" className='linkItem'><InstagramIcon></InstagramIcon> Instagram</a>
                     <a href="##" className='linkItem'><FacebookIcon></FacebookIcon> Facebook</a>
                     <a href="##" className='linkItem'><LinkedInIcon></LinkedInIcon> LinkedIn</a>
                   </div>
                </div>
            </div>
            <div className='footerItem'>
                <span className='quickTitle' >Quick Links</span>
                <div className='quickLinks'>
                    <Link style={{textDecoration:'none'}} to='/'><a className='quickItem' href="##">Home</a></Link>
                    <Link style={{textDecoration:'none'}} to='/store'><a className='quickItem' href="##">Our Store</a></Link>
                    <Link style={{textDecoration:'none'}} to='/about'><a className='quickItem' href="##">About Us</a></Link>
                    <Link style={{textDecoration:'none'}} to='/contact'><a className='quickItem' href="##">Contact Us</a></Link>
                </div>
            </div>

            

            <div className='footerItem'>
                <span className='helpTitle'>Help</span>
                 <div className='helpLinks'>
                    <a href='##' className='helpItem'>FAQs</a>
                    <a href='##' className='helpItem'>Terms of Service</a>
                    <a href='##' className='helpItem'>Refund & Cancellation</a>
                    <a href='##' className='helpItem'>Shipping Policy</a>
                    <a href='##' className='helpItem'>Return Order</a>
                 </div>
            </div>

            <div className='footerItem'>
                <span className='footerContactTitle'> Contact</span>
                <div className='contacts'>
                    <div className='contactItem'>
                        <LocationOnIcon></LocationOnIcon>
                        <span className='contacttextaddress'>D-702, parivar homes, near western prime, gota, Ahmedabad-382481</span>
                    </div>
                    <div className='contactItem'>
                        <CallIcon></CallIcon>
                        <div className='contactTexts'>
                            <a href='+919265067663' className='contacttext'>+91 9265067663</a>
                            <a href='+918758242987' className='contacttext'>+91 8746576455</a>
                        </div>
                    </div>
                    <div className='contactItem'>
                        <EmailIcon></EmailIcon>
                        <div className='contactTexts'>
                             <a href='fuelflexindia@gmail.com' className='contacttext'>fuelflexindia@gmail.com</a>
                             <a href='bhuvamit4@gmail.com' className='contacttext'>bhuvamit4@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='footerCopyright'>
            <span className='copyText'>&#169; 2024 Developed by MV's | all rights reserved</span>
        </div>
    </div>
  )
}