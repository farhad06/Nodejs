const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mansschema = new mongoose.Schema({
    ranking: {
        type: Number,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
        unique: true
    },
    dob: {
        type: Date,
        require: true,
        unique: true
    },
    country: {
        type: String,
        require: true,
        unique: true
    },
    score: {
        type: Number,
        require: true,
        unique: true
    },
    event: {
        type: String,
        default: "100 miter"
    }
});
const mansrace = new mongoose.model("mansrace", mansschema);
module.exports = mansrace;