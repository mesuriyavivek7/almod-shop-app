import express from "express"

//importing controllers
import { payNow, validatePayment } from "../controllers/paymentController.js"
import { verifyUser } from "../utils/verifyToken.js"

const router=express.Router()


router.post('/paynow',verifyUser,payNow)

router.post('/validatepayment',verifyUser,validatePayment)

export default router