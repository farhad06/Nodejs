const mongoose = require('mongoose');
//const validator = require('validator');
mongoose.connect("mongodb://localhost:27017/Regform", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connection successfully..........")).catch((err) => console.log(err));