const mongoose = require('mongoose');
//const validator = require('validator');
mongoose.connect("mongodb://localhost:27017/manrace", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connected..........")).catch((err) => console.log(err));