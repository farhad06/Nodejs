const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const fs = require('fs');
const { now } = require('mongoose');
const Downloder = require('nodejs-file-downloader');
const port = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'ejs');
var Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let dir = './images';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var upload = multer({
    storage: Storage
}).single("file");
app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.post('/upload', (req, res) => {
    // let file = req.body.file;
    // if (file === "") {
    //     alert("Choose a file");
    // }
    upload(req, res, (err) => {
            const file = req.body.file;
            if (file == "") {
                alert("Choose a file");
            } else if (err) {
                res.send(err);
            } else {
                console.log('success');
            }
        })
        //res.render('success');
    res.render('index');
});
app.get('/download', (req, res) => {

})

app.listen(port, () => {
    console.log(`Server listening at ${port}`);
})