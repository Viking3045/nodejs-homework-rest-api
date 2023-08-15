const nodemailer = require("nodemailer");
require("dotenv").config();

const {UKR_NET_EMAIL, UKR_NET_PASSWORD} = process.env

const nodemailerConfig = {
    host:"smtp.ukr.net",
    port: 465,   //25, 465, 2525
    sequre: true,
    auth:{
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD,
    }
}


const transport = nodemailer.createTransport(nodemailerConfig)

// const data = {
//     to:"sosakok320@royalka.com",
//     subject: "Verify email 2023",
//     html: "<p>Verify email</p>"
// }

const sendEmail = async(data)=>{
    const email = {...data, from: UKR_NET_EMAIL}
    await transport.sendMail(email);
    return true;
}

module.exports = sendEmail





// const email ={
//     from: UKR_NET_EMAIL,
   
// }

// transport.sendMail(email).then(()=>console.log("Email send success 2023")).catch((error)=>console.log(error.message))