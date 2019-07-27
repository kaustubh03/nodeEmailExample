const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");



const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;




app.post("/mail", (req, res) => {
    let body = req.body;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: body.sender_email,
        pass: body.sender_password
      }
    });

    var mailOptions = {
        from: body.sender_email,
        to: body.reciever_email,
        subject: body.subject,
        text: body.body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send("Error")
        } else {
            console.log('Email sent: ' + info.response);
            res.send("Email sent: " + info.response);
        }
    });
});

app.listen(port, () => console.log(`Email Service Running on ${port}`));
