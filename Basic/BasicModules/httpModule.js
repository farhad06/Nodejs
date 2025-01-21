const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')
    if (req.url == '/') {
        res.write("Hello Node js");
    } else if (req.url == '/about') {
        res.write('About Us')
    } else {
        res.write("<h2>Invalid URL</h2>")
    }
    res.end();
}).listen(8080, () => {
    console.log("Server is running on port 8080");
})