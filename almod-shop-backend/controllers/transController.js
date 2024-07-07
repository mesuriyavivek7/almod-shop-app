import Transaction from "../models/Transaction.js";

export const createTransaction=async (req,res,next)=>{
    const newTransaction=new Transaction(req.body)
    try{
      const savedTransaction=await newTransaction.save()
      res.status(200).json(savedTransaction)
    }catch(err){
        next(err)
    }
}

export const updateTransaction=async (req,res,next)=>{
    try{
      const updatetransaction=await Transaction.findById(req.params.id,{$set:req.body})
      res.status(200).json("transaction updated sucessfullly")
    }catch(err){
        next(err)
    }
}

export const deleteTransaction=async (req,res,next)=>{
    try{
       await Transaction.findByIdAndDelete(req.params.id)
       res.status(200).json("Transaction deleted successfully")
    }catch(err){
       next(err)
    }
}

export const getOneTransaction=async (req,res,next)=>{

    try{
      const transaction=await Transaction.findById(req.params.id)
      res.status(200).json(transaction)
    }catch(err){
      next(err)
    }

}


export const getAllTransaction=async (req,res,next)=>{
    try{
      const getalltransaction=await Transaction.find()
      res.status(200).json(getalltransaction)
    }catch(err){
      next(err)
    }
}

export const getProductInfo=async (req,res,next)=>{

  try{
    const transition=await Transaction.find({user_id:req.params.id})

    if(transition){
      let orderedproductlist=[]
      transition.forEach((elem)=>{
         if(elem.delivered===false){
           orderedproductlist=orderedproductlist.concat(elem.product_list)
         }
      })
      orderedproductlist=orderedproductlist.map((elem)=>{
         return elem.productId
      })
      res.status(200).send(orderedproductlist)
     
    }else{
      res.status(200).send([])
    }
     
  }catch(err){
    next(err)
  }
}