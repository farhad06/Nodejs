var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'iamfarhad06@gmail.com',
        pass: 'Farhad@2021'
    }
});

var mailOptions = {
    from: 'iamfarhad06@gmail.com',
    to: 'farhadahamed06@gmail.com',
    subject: 'Sending Email using Node.js',
    text: `Hi,Iam Farhad Ahamed How are u`
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});