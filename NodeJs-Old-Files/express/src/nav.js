const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send("Hello from home page");
});
app.get('/about', (req, res) => {
    res.send("Hello from about page");
});
app.get('/contact', (req, res) => {
    res.send("Hello from contact page! our contact is 700123963");
});
app.get('/temp', (req, res) => {
    res.send("This is tempory page");
});

app.listen(8081, () => {
    console.log("Listening at port no 8081");
});