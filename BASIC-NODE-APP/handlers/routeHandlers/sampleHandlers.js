const handler = {}


handler.SampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, {
        'message': 'This is a Sample URL'
    })
}

module.exports = handler;