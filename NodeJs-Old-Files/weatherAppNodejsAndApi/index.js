const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceval = (tempval, orival) => {
    let tempareture = tempval.replace("{%tempval%}", orival.main.temp);
    tempareture = tempareture.replace("{%location%}", orival.name);
    tempareture = tempareture.replace("{%tempstatus%}", orival.weather[0].main);
    return tempareture;
};
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=45efbd76812d1e59c0380b2f32a3feb1")

        .on("data", (chunk) => {
                const objData = JSON.parse(chunk);
                const arrData = [objData];
                //console.log(arrData[0].main.temp);
                const realTimeData = arrData.map((val) => replaceval(homeFile, val)).join("");
                res.write(realTimeData);
                //console.log(realTimeData);
            })
            .on("end", (err) => {
                if (err) return console.log('connection closed due to error', err);
                //console.log('end');
                res.end();
            });
    }
}).listen(3000);

//server.listen(3000, "127.0.0.1");
//console.log("Server listening at port 8000");