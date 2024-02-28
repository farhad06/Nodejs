const express = require('express');
const app = express();
const port = 8081;
const path = require('path');
//adding middleware
const staticPath = path.join(__dirname, '../public');
//app.use(express.static(staticPath));
//to set view engine 
app.set('view engine', 'hbs');
app.get('', (req, res) => {
    res.render('index');
});
app.get("/contactus", (req, res) => {
    res.render('contactus', {
        msg: "If There is any problem! Please contact US."
    });
});
app.get('/', (req, res) => {
    res.send('Hello from Express Server!!');

});
app.get("*", (req, res) => {
    res.render("404", {
        errormsg: "Oops!! Page not Found"
    });
});
app.listen(port, () => {
    console.log(`Listening at ${port}`);
});