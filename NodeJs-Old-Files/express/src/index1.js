const express = require('express');
const path = require('path');
const app = express();
//console.log(__dirname);
//console.log(path.join(__dirname, "../public"));
const staticpath = path.join(__dirname, "../public");
app.use(express.static(staticpath));
app.get('/', (req, res) => {
    res.send("Hello world from express");
});
app.listen(8000, () => {
    console.log("Listning at port 8000");
});