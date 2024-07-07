import mongoose from "mongoose";

const transactionSchema=new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    order_id:{
        type:String,
        required:true
    },
    payment_id:{
        type:String,
        required:true
    },
    transaction_status:{
        type:String,
        required:true
    },
    product_list:[{productId:String,qnt:Number,size:String}],
    delivered:{
        type:Boolean,
        default:false
    },
    product_pay:{
        type:Number,
        required:true
    },
    shipping_charge:{
       type:Number,
       required:true
    },
    ordered_date:{
        type:Date,
        dafault:Date.now(),
    },
    delivery_address:{
        type:String,
        required:true
    },

});

export default mongoose.model("Transaction",transactionSchema)