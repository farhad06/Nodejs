var fs = require("fs");
//create a blank file
fs.open("newfile2.txt", 'w', function(err, file) {
    if (err) throw err;
    console.log("File Created!!");
});


//write a into the file also thid method is used for update a file
/*fs.writeFile("newfile.txt", "This File is created by Nodejs Ron time environment", function(err) {
if (err) throw err;
console.log("File is saved Successfully");
});*/

//update a file and also write a file
fs.appendFile("newfile.txt", "\nNodejs created by Chrome VB8\n This is created at 01:41 PM ", function(err) {
    if (err) throw err;
    console.log("File Updated!!");
});
//delete a file
/*fs.unlink("newfile1.txt", function(err) {
if (err) throw err;
console.log("File is deleted!!");
});*/
//rename a filename
fs.rename("newfile2.txt", "myfile.txt", function(err) {
    if (err) throw err;
    console.log("Renamed");
});