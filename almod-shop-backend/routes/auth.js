import express from "express"
import { getCookie, login, logout, register, setCookie } from "../controllers/authController.js"
import { verifyUser } from "../utils/verifyToken.js"

const router=express.Router()

//for registration new user

router.post('/register',register)

//for login new user

router.post('/login',login)

//for logout user
 router.post('/logout',verifyUser,logout)

 //for creating cookie
router.post('/set-cookie',setCookie)

//for get cookie value
router.post('/get-cookie',getCookie)

export default router

