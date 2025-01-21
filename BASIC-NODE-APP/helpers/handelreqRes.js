const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandlers } = require('../handlers/routeHandlers/notFoundHandlers')

const handler = {};


handler.handleReqRes = (req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const headersObject = req.headers;

    const decoder = new StringDecoder('utf-8');
    let realdata = '';

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        //queryStringObject,
        headersObject,
    };


    const choosenHandlers = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandlers;

    choosenHandlers(requestProperties, (statusCode, payload) => {
        statusCode = typeof (statusCode) === 'number' ? statusCode : 500;
        payload = typeof (payload) === 'object' ? payload : {};

        const payloadString = JSON.stringify(payload)

        //return the final response

        res.writeHead(statusCode);
        res.end(payloadString);
    });

    req.on('data', (buffer) => {
        realdata += decoder.write(buffer)
    });

    req.on('end', () => {
        realdata += decoder.end();
        console.log(realdata);

        res.end('Hello Programmer')
    })

};


module.exports = handler;