const http = require('http');
const fs = require("fs");
const server = http.createServer();
server.on('request', (req, res) => {
    // fs.readFile('input.txt', (err, data) => {
    //     if (err) throw err;
    //     res.end(data.toString());
    // });
    const rstream = fs.createReadStream("input.txt");
    // rstream.on('data', (chunk) => {
    //     res.write(chunk);
    // });
    // rstream.on('end', () => {
    //     res.end();
    // });
    // rstream.on('error', () => {
    //     res.end("File not exits!!");
    // });

    rstream.pipe(res);
});
server.listen(8000, "127.0.0.1");
console.log("This is a running server");