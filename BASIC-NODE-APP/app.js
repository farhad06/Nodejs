const http = require('http');
const { handleReqRes } = require('./helpers/handelreqRes')

const app = {};

app.config = {
    port: 3000
};

app.createServer = () => {
    const server = http.createServer(app.handReqRes);
    server.listen(app.config.port, () => {
        console.log(`App is listining at port ${app.config.port}`);
    })

}

app.handReqRes = handleReqRes;


app.createServer();