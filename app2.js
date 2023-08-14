// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const {UKR_NET_EMAIL, UKR_NET_PASSWORD} = process.env

// const nodemailerConfig = {
//     host:"smtp.ukr.net",
//     port: 465,   //25, 465, 2525
//     sequre: true,
//     auth:{
//         user: UKR_NET_EMAIL,
//         pass: UKR_NET_PASSWORD,
//     }
// }


// const transport = nodemailer.createTransport(nodemailerConfig)


// const email ={
//     from: UKR_NET_EMAIL,
//     to:"sosakok320@royalka.com",
//     subject: "Verify email 2023",
//     html: "<p>Verify email</p>"
// }

// transport.sendMail(email).then(()=>console.log("Email send success 2023")).catch((error)=>console.log(error.message))






























// // const ElasticEmail = require('@elasticemail/elasticemail-client');
// // require("dotenv").config();

// // const {ELASTICEMAIL_API_KEY} = process.env;
 
// // const defaultClient = ElasticEmail.ApiClient.instance;
 
// // const {apikey}  = defaultClient.authentications;
// // apikey.apiKey = ELASTICEMAIL_API_KEY;
 
// // const api = new ElasticEmail.EmailsApi()
 
// // const email = ElasticEmail.EmailMessageData.constructFromObject({
// //   Recipients: [
// //     new ElasticEmail.EmailRecipient("sosakok320@royalka.com")
// //   ],
// //   Content: {
// //     Body: [
// //       ElasticEmail.BodyPart.constructFromObject({
// //         ContentType: "HTML",
// //         Content: "<p>My test email content ;)</p>"
// //       })
// //     ],
// //     Subject: "Verify email",
// //     From: "utihar30@gmail.com"
// //   }
// // });
 
// // const callback = function(error, data, response) {
// //   if (error) {
// //     console.error(error);
// //   } else {
// //     console.log('API called successfully.');
// //   }
// // };
// // api.emailsPost(email, callback);




































// // // const express = require("express");
// // // const cors = require("cors");
// // // const multer = require("multer");
// // // const path = require("path");
// // // const fs = require("fs/promises");
// // // const { nanoid } = require("nanoid");

// // // const app = express();

// // // app.use(cors());
// // // app.use(express.json());
// // // app.use(express.static("public"));

// // // const tempDir = path.join(__dirname, "temp");

// // // const multerConfig = multer.diskStorage({
// // //     destination: tempDir,
// // //     filename: (req, file, cb)=>{
// // //         cb(null, file.originalname);
// // //     }
// // // });

// // // const upload = multer({
// // //     storage: multerConfig,
// // // })

// // // const contacts = [];

// // // app.get("/app2/contacts", (req, res)=> {
// // //     res.json(contacts);
// // // });

// // // const contactsDir = path.join(__dirname, "public", "contacts")

// // // app.post("/app2/contacts", upload.single("cover"), async(req, res)=>{
// // //     const {path: tempUpload, originalname} =req.file;
// // //     const resultUpload =path.join(contactsDir, originalname);
// // // await fs.rename(tempUpload, resultUpload);
// // // const cover = path.join("public", "contacts", originalname)
// // // const newContact = {
// // //     id: nanoid(),
// // //     ...req.body, 
// // //     cover,
// // // };
// // // contacts.push(newContact) ;

// // // res.statusCode(201).json(newContact)
// // // })


// // // app.listen(3000);

