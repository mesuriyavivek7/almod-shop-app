import nodemailer from 'nodemailer'
import dotenv from "dotenv"
dotenv.config()

let transpoter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    auth:{
        user:process.env.USER_MAIL,
        pass:process.env.USER_PASS
    }
})
export const sendMail=async (req,res)=>{

    const mailpreq=req.body

    let mailOption={
        from:{
            name:"Fuelflex",
            address:'vivekmesuriya110@gmail.com'
        },
        to:mailpreq.to,
        subject:mailpreq.subject,
        html:mailpreq.body
    }
   

    transpoter.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log(error)
            res.status(402).send('there is something wrong')
        }
   

        res.status(200).send(`mail sended successfully ${info.response}`)
    })

    
}