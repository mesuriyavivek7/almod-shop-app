import React from 'react'


//importing css
import './insta.css'

//importing icons
import InstagramIcon from '@mui/icons-material/Instagram';


import useFetch from '../../hooks/useFetch';

export default function Insta() {

  //fetching data
  const {data,loading}=useFetch('/insta/getpost')
  return (
    <div className='insta'>
       <div className='instaTitle'>
            <span className='instaheading'>Follow Us On Instagram @fuelflex</span>
       </div>

       <div className='instaContainer'>

          {
            (loading)?(<span>Loading please wait.....</span>):(
                data.map((post,i)=>(
                    <a key={i} className='instaItem' href={post.postLink} target='_blank'>
                        <img src={post.postImage} alt='' className='instaImg'></img>
                        <div className='overlay'>
                          <InstagramIcon className='instaIcon'></InstagramIcon>
                         </div>
                     </a>
                ))
            )
          }
          
       </div>
    </div>
  )
}
