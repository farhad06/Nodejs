const environments = {}


//staging environment 
environments.staging = {
    port: 3000,
    envName: 'staging'
}


//production environment
environments.production = {
    port: 5000,
    envName: 'production'
}

const currentEnvironment = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging'

const environmentToExport =
    typeof environments[currentEnvironment] === 'object' ? environments[currentEnvironment] : environments.staging


module.exports = environmentToExport



