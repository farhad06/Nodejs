//const { parse } = require("path/posix");
var url = require("url");
var adr = 'http://localhost:8080/default.htm?year=2021&month=June&time=02:30PM IST';

var q = url.parse(adr, true);
console.log(q.host);
console.log(q.pathname);
console.log(q.search);

var qdata = q.query;
console.log(qdata);
console.log(qdata.month);
console.log(qdata.time);