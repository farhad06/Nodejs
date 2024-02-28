const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/studentsapi", { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connected to MongoDB.....")).catch((err) => console.log(err));
//hello this is from mongoose server