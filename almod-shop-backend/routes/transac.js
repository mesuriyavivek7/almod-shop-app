import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { createTransaction, deleteTransaction, getAllTransaction, getOneTransaction, getProductInfo, updateTransaction } from "../controllers/transController.js";

const router=express.Router()

//create transaction
router.post('/',verifyUser,createTransaction)

//update transaction
router.put('/',verifyUser,updateTransaction)

//delete transaction
router.delete('/',verifyUser,deleteTransaction)

//get one transactio
router.get('/:id',verifyUser,getOneTransaction)

//get all transaction
router.get('/',verifyAdmin,getAllTransaction)

//get all products
router.get('/info/:id',verifyUser,getProductInfo)

export default router
