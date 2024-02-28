//creating a buffer
//method1
var buf = new Buffer(125);
//method 2
var buff = new Buffer([10, 20, 30, 40]);
//method3
var bufff = new Buffer('Learning Nodejs', 'utf-8');
var len = buf.write('Learning Nodejs');
console.log("The length of the message is: " + len);
console.log(buf.toString());
//console.log(buf.toJSON());
var buffer1 = new Buffer('I am: ');
var buffer2 = new Buffer('Farhad Ahamed');
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log(buffer3.toString());
//console.log(buffer3.toJSON());
var buf1 = new Buffer("It is Nodejs");
var buf2 = new Buffer(15);
buf1.copy(buf2);
console.log("It is copied from buf1 to buf2: " + buf2.toString());
var buffer4 = new Buffer("The fox jumps the wall");
var buffer5 = buffer4.slice(0, 14);
console.log("Slice from positive Index: " + buffer5.toString());
var buffer6 = buffer4.slice(-14);
console.log("Slice from negative index: " + buffer6.toString());
console.log("The buffer length is: " + buffer4.length);