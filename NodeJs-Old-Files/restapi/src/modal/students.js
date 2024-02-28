const mongoose = require('mongoose');
const validator = require('validator');
const Studentschema = new mongoose.Schema({
    name: {
        type: String,
        minlenth: 3,
        unique: true
    },
    email: {
        type: String,
        unique: [true, "Email already exits"]
    },
    phone: Number,
    address: String
});
const Student = new mongoose.model('Student', Studentschema);
module.exports = Student;