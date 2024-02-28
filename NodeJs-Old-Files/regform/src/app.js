require('dotenv').config();
const express = require('express');
const { userInfo } = require('os');
const app = express();
const path = require('path');
const hbs = require("hbs");
const bcrypt = require("bcrypt");
const parser = require("cookie-parser");
const Register = require("./modal/register");
const auth = require("./middleware/auth");
const { urlencoded } = require('express');
const port = process.env.PORT || 8000;
require("../src/db/conn");
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../tempate/views");
const partials_path = path.join(__dirname, "../tempate/partials");
//console.log(static_path);
//app.use(express.static(static_path));
//to set handlebars bydefault
app.set("view engine", "hbs");
//it is used to change views folder name
app.set("views", template_path);
//it is used for use partials folder
//itis for view form data into browser
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(parser());
hbs.registerPartials(partials_path);
app.get("/", (req, res) => {
    //it is use for display handlebars page
    res.render("index");
});
app.get("/register", (req, res) => {
    res.render("register")

});
app.post("/register", async(req, res) => {
    //res.render("register")
    try {
        const password = req.body.psw;
        const confirmpassword = req.body.cpsw;
        if (password === confirmpassword) {
            const registeremp = new Register({
                first_name: req.body.fname,
                last_name: req.body.lname,
                email: req.body.email,
                //gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: password,
                cpassword: confirmpassword
            });
            const token = await registeremp.generateAuthToken();
            //set cookie in our site
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 30000),
                httpOnly: true
            });
            const registersed = await registeremp.save();
            res.status(201).render("index");
        } else {
            res.send("Password are not matched");
        }
    } catch (err) {
        res.status(404).send(err);
    }

});
// app.get("/login", (req, res) => {
//     res.render("login");
// });
app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.psw;
        const useremail = await Register.findOne({ email: email });
        //res.send(useremail.cpassword);
        const token = await useremail.generateAuthToken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 30000),
            httpOnly: true
        });
        const isMatched = await bcrypt.compare(password, useremail.cpassword);
        if (isMatched) {
            // res.status(201).send("<h1 style='color:green'> Successfully login to te System </h1>");
            res.status(201).render("index");
        } else {
            res.status(400).send("<h1 style='color:red'>Password are not matching</h1>");
        }
        /*if (useremail.cpassword === password) {
            res.status(201).send("<h1> Successfully login to te system </h1>");
            //res.status(201).render("index");
        } else {
            res.status(404).send("<h1>Password are not matching</h1>");
        }*/
        // const token = await useremail.generateAuthToken();
        //console.log("Token of this user is:" + token);

    } catch (err) {
        res.status(404).send(err);
    }
});
app.get("/logout", auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((currElement) => {
            return currElement.token !== req.token;
        });
        res.clearCookie("jwt");
        await req.user.save();
        res.render("login");
    } catch (err) {
        res.status(400).send(err);
    }
});
app.get("/alldata", auth, async(req, res) => {
    //res.render("login");
    const allData = await Register.find();

    //const generatedToken = req.cookies.jwt;
    //console.log(`Genetated token is: ${req.cookies.jwt}`);
    res.send(allData);
});
//generateAuthToken();

app.listen(port, () => {
    console.log(`Server  listening at port number ${port}`);
});