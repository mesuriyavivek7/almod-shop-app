import React, { useContext, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { adminAtom } from '../../context/AdminAtom';

//importing css
import './navbar.css'

import { useEffect } from 'react';

import { motion } from 'framer-motion'

import { Link } from 'react-router-dom'
//importign auto animate 


//importing icons
import SearchIcon from '@mui/icons-material/Search';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import SearchResult from '../searchitem/SearchItem';

import { useNavigate } from 'react-router-dom';

//import img
import LOGO from '../../assets/logo1.png'

import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import useFetch from '../../hooks/useFetch';

export default function Navbar() {
  const navigate = useNavigate()

  const transition = {
    duration: .3,
  }

  //for searching products

  const [keyword, setKeyword] = useState('')
  const { data, loading, refetch } = useFetch(`/product/searchby?keyword=${keyword}&limit=3`)
  useEffect(() => {
    refetch()
  }, [keyword])


  const handleSearch = () => {
    navigate("/store", { state: keyword })
  }

  const [navShow, setNavShow] = useState(true)
  const [maxScroll, setMaxScroll] = useState(0)

  const { user } = useContext(AuthContext)
  const handleScroll = () => {
    const scrollposition = window.scrollY
    // setScroll(scrollposition)
    if (scrollposition > maxScroll) {
      setNavShow(false)
    } else {
      setNavShow(true)
    }
    setMaxScroll(scrollposition)

  }

  //code for cart
  const { cart } = useContext(CartContext)

  //check user funtion

  const checkUser = (mobilecheck) => {
    if (mobile === mobilecheck) {
      if (user === null) {
        return (
          <Link to='/login'><button className='navBtn'>Login / Register</button></Link>
        )
      } else {
        return (
          <Link to='/profile'><AccountCircleIcon className='useraccount'></AccountCircleIcon></Link>
        )
      }
    }
  }


  useEffect(() => {

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }

  })

  //code for responsive navbar
  let mobileview = (window.innerWidth <= 768) ? true : false
  const [mobile, setMobile] = useState(mobileview)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMobile = () => {
    if (window.innerWidth <= 768) {
      setMobile(true)
    } else {
      setMobile(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleMobile)
    return () => {
      window.removeEventListener("resize", handleMobile)
    }
  }, [])



  //for search icon open and close

  const [searchOpen, setSearchOpen] = useState(false)
  const adminValue = useRecoilValue(adminAtom);

  return (
    <div className={navShow === false ? 'navbar navbar-hide' : 'navbar'}>
      <div className='logo' >
        <Link to='/' style={{ textDecoration: 'none' }}><img alt='' src={LOGO} className='navhead'></img></Link>
      </div>

      <div className={(mobile === true && menuOpen === true) ? "menubar open" : "menubar"}>

        {
          checkUser(true)
        }

        <Link className='menuItem' to='/'>HOME</Link>
        <Link to='/store' className='menuItem'>PRODUCTS</Link>
        <Link to='/about' className='menuItem'>OUR STORY</Link>
        <Link to="/career" className='menuItem'>CAREER</Link>
        <Link to='/contact' className='menuItem'>CONTACT US</Link>
        <Link to='/bulkorder' className='menuItem bo-item'>BULK ORDER</Link>
        {adminValue && <Link to='/adminHome' className='menuItem'>DASHBOARD</Link>}

      </div>
      <div className='navIcon'>

        {
          checkUser(false)
        }


        <SearchIcon onClick={() => setSearchOpen(!searchOpen)} className='searchIcon'></SearchIcon>
        <Link to='/cart'>
          <div className='shoppingCart'>
            <LocalMallIcon className='navCart'></LocalMallIcon>

            {
              (cart !== null && cart.length !== 0) && <span className='cartItem'>{cart.length}</span>
            }
          </div>
        </Link>


        {
          mobile && (
            (menuOpen === true) ? (<CloseIcon onClick={() => setMenuOpen(!menuOpen)} className='closeIcon'></CloseIcon>) : (<MenuIcon onClick={() => setMenuOpen(!menuOpen)} className='menuIcon'></MenuIcon>))

        }


      </div>
      {

        searchOpen &&
        <motion.div
          transition={transition}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='searchSec'>
          <CloseIcon style={{ color: "gray" }} onClick={() => setSearchOpen(!searchOpen)} className='SearchCloseIcon'></CloseIcon>
          <h1 className='searchTitle'>
            Search
          </h1>
          <div className='inputBox'>
            <SearchIcon style={{ color: "gray", paddingLeft: ".3rem" }} ></SearchIcon>
            <input onChange={(e) => setKeyword(e.target.value)} className='searchInput' type='text' placeholder='What are you looking for?'></input>
          </div>


          {
            (loading) ? (<div className='loadscreen'>

            </div>) : ((data.length === 0) ? ((keyword === '') ? (<span></span>) : (<span>No Products available</span>)) : (
              <>
                <div className='searchResult'>
                  {
                    data.map((product, i) => {
                      let isDiscountAvailable = false
                      let orgPrice = product.price;
                      let sellingPrice;
                      let savingMoney = 0;
                      if (product.discount !== 0) {
                        isDiscountAvailable = true
                        savingMoney = Math.floor((product.discount * orgPrice) / 100)
                        sellingPrice = orgPrice - savingMoney
                      } else {
                        sellingPrice = orgPrice
                      }
                      return (
                        <Link to={`product/${product._id}`} style={{ textDecoration: 'none' }}>
                          <SearchResult key={i} productImg={product.images[0]} productTitle={product.title} sellingPrice={sellingPrice} orgPrice={isDiscountAvailable ? (orgPrice) : (undefined)}></SearchResult>
                        </Link>
                      )



                    })
                  }


                </div>
                <div className='searchBtnSec'>
                  <button className='viewAllBtn' onClick={() => handleSearch()}>View All</button>
                </div>
              </>

            )
            )
          }

        </motion.div>

      }

    </div>
  )
}
