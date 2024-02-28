const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const nodemailer = require('nodemailer');
const fs = require('fs');
const multer = require('multer');
const port = process.env.PORT || 8081;
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).single("file");
app.get('/', (req, res) => {
    res.sendFile('/index.html');
});
app.post("/sendemail", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.end("Something went to wrong");
        } else {
            const to = req.body.email;
            const sub = req.body.subject;
            const message = req.body.msg;
            const file = req.body.file;
            const path = req.file.path;
            // console.log(to);
            // console.log(sub);
            // console.log(message);
            // console.log(path);
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'iamfarhad06@gmail.com',
                    pass: 'Farhad@2021'
                }
            });

            var mailOptions = {
                from: 'iamfarhad06@gmail.com',
                to: to,
                subject: sub,
                text: message,
                attachments: [{
                    path: path
                }]
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    //console.log('Email sent: ' + info.response);
                    fs.unlink(path, (err) => {
                        if (err) {
                            res.end(err);
                        } else {
                            //console.log('File Deleted');
                            res.redirect('/result.html');
                        }
                    })
                }
            });

        }
    })
})
app.listen(port, () => {
    console.log(`Server listining at ${port}`);
});