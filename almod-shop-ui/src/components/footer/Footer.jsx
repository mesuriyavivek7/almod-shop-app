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
                   fuelflex.in
                </span>
                <div className='socialLinks'>
                   <span className='socialTitle'>Follow Us:</span>
                   <div className='links'>
                     <a href="https://www.instagram.com/fuelflex.in/" className='linkItem'><InstagramIcon></InstagramIcon> Instagram</a>
                     <a href="https://www.facebook.com/profile.php?id=61561943455009&mibextid=ZbWKwL" className='linkItem'><FacebookIcon></FacebookIcon> Facebook</a>
                     <a href="##" className='linkItem'><LinkedInIcon></LinkedInIcon> LinkedIn</a>
                   </div>
                </div>
            </div>
            <div className='footerItem'>
                <span className='quickTitle' >Quick Links</span>
                <div className='quickLinks'>
                    <Link style={{textDecoration:'none'}} to='/'><a className='quickItem' href="##">Home</a></Link>
                    <Link style={{textDecoration:'none'}} to='/store'><a className='quickItem' href="##">Products</a></Link>
                    <Link style={{textDecoration:'none'}} to='/about'><a className='quickItem' href="##">Our Story</a></Link>
                    <Link style={{textDecoration:'none'}} to='/contact'><a className='quickItem' href="##">Contact Us</a></Link>
                    <Link style={{textDecoration:'none'}} to='/career' className='quickItem'>Career</Link>
                </div>
            </div>

            

            <div className='footerItem'>
                <span className='helpTitle'>Help</span>
                 <div className='helpLinks'>
                    <Link style={{textDecoration:'none'}} to='/tos'><a href='##' className='helpItem'>Terms of Service</a></Link>
                    <Link style={{textDecoration:'none'}} to='/randr'><a href='##' className='helpItem'>Refund & Return</a></Link>
                    <Link style={{textDecoration:'none'}} to='/sp'><a href='##' className='helpItem'>Shipping Policy</a></Link>
                 </div>
            </div>

            <div className='footerItem'>
                <span className='footerContactTitle'> Contact</span>
                <div className='contacts'>
                    <div className='contactItem'>
                        <LocationOnIcon></LocationOnIcon>
                        <span className='contacttextaddress' style={{lineHeight:1.5}}>FIRST UNIFIED<br></br> 49, Ved Industrial Park-2, Bhuvaladi Gam Road, Kathwada, Ahmedabad, Gujarat-382430</span>
                    </div>
                    <div className='contactItem'>
                        <CallIcon></CallIcon>
                        <div className='contactTexts'>
                            <a href='+919265067663' className='contacttext'>+91 9265067663</a>
                        </div>
                    </div>
                    <div className='contactItem'>
                        <EmailIcon></EmailIcon>
                        <div className='contactTexts'>
                             <a href='fuelflexindia@gmail.com' className='contacttext'>fuelflexindia@gmail.com</a>
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
