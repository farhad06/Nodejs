var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("This is Blocking File Code");
console.log("\n----------------------------------------------------\n");
fs.readFile('input.txt', function(err, data) {
    if (err) throw err;
    console.log(data.toString());
});
console.log("This is Non Blocking File code");