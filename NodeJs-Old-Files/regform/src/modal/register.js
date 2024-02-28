require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const regemp = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: Number
    },
    phone: {
        type: Number
    },
    age: {
        type: Number
    },
    passord: {
        type: String
    },
    cpassword: {
        type: String
    },
    tokens: [{
        token: {
            type: String
        }
    }]
});

//to generate user authication token
regemp.methods.generateAuthToken = async function() {
        try {
            const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
            this.tokens = this.tokens.concat({ token: token });
            await this.save();
            return token;
        } catch (err) {
            res.send("The error is: " + err);
        }
    }
    //middleware to generate passowrd hash function
regemp.pre("save", async function(next) {
    if (this.isModified("cpassword")) {
        this.cpassword = await bcrypt.hash(this.cpassword, 10);
    }
    next();
})

const Register = new mongoose.model("Register", regemp);
module.exports = Register;