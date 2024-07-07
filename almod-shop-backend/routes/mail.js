import express from 'express'
import { sendMail } from '../controllers/mailController.js'

const app=express()

const router=express.Router()

//for sending mail
router.post('/send',sendMail)


export default router