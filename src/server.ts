import express from "express"
import * as nodemailer from "nodemailer";

const app = express();
  app.use(express.json());

async function sendMail(message:{}) {
  let transporter = await nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 587,
    secure: false, 
    auth: {
      user: "test@zify.com.br", 
      pass: "Teste123", 
    },
  });
  await transporter.sendMail(message); 
}

  app.post("/send-email", async (req, res) => {
    let onMessage = {
      from: "test@zify.com.br",
      to: req.body.recipient,
      subject: req.body.title,
      text: req.body.body,
      html: req.body.body
    };
    
     await sendMail(onMessage);
    console.log(req.body);
    res.json();
  })

  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
  });
