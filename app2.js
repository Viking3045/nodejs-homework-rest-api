// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs/promises");
// const { nanoid } = require("nanoid");

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));

// const tempDir = path.join(__dirname, "temp");

// const multerConfig = multer.diskStorage({
//     destination: tempDir,
//     filename: (req, file, cb)=>{
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({
//     storage: multerConfig,
// })

// const contacts = [];

// app.get("/app2/contacts", (req, res)=> {
//     res.json(contacts);
// });

// const contactsDir = path.join(__dirname, "public", "contacts")

// app.post("/app2/contacts", upload.single("cover"), async(req, res)=>{
//     const {path: tempUpload, originalname} =req.file;
//     const resultUpload =path.join(contactsDir, originalname);
// await fs.rename(tempUpload, resultUpload);
// const cover = path.join("public", "contacts", originalname)
// const newContact = {
//     id: nanoid(),
//     ...req.body, 
//     cover,
// };
// contacts.push(newContact) ;

// res.statusCode(201).json(newContact)
// })


// app.listen(3000);

