import express from "express"
import * as nodemailer from "nodemailer";
import swaggerUi from "swagger-ui-express"

import swaggerFile from "./swagger.json"

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

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

  app.listen(process.env.PORT || 3330, () => {
    console.log('Server is running');
  });
