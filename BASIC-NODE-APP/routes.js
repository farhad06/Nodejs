const { SampleHandler } = require('./handlers/routeHandlers/sampleHandlers');
const { userHandler } = require('./handlers/routeHandlers/userHandler')
const routes = {
    sample: SampleHandler,
    user: userHandler

}

module.exports = routes;