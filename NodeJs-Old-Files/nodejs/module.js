var http = require("http");
var fs = require("fs");
var md = require("./ownmodule");
var file = require("./file");
var url = require("url");
http.createServer(function(req, res) {
    //var q = url.parse(req.url, true);
    var qdata = q.query;
    fs.readFile("newfile.txt", function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write("The sum is: " + md.add(8, 10) + "\n");
        res.write("The multipication is: " + md.multi(8, 10) + "\n");
        res.write(data);
        res.end();
    });
    //console.log(qdata);

}).listen(3000);
console.log("This is running on the server");