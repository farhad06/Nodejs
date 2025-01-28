const data = require('../../lib/data');
const { hash, parseJson } = require('../../helpers/utilities');


const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];

    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback)
    } else {
        callback(405)
    }
}

handler._users = {};

//post or create an user
handler._users.post = (requestProperties, callback) => {
    const firstName = typeof (requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof (requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const phone = typeof (requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 10 ? requestProperties.body.phone : false;

    const password = typeof (requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    const tosAggrement = typeof (requestProperties.body.tosAggrement) === 'boolean' && requestProperties.body.tosAggrement ? requestProperties.body.tosAggrement : false;


    if (firstName && lastName && phone && password && tosAggrement) {
        //console.log(firstName, lastName, phone, password, tosAggrement);
        data.read('users', phone, (err) => {
            if (err) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAggrement
                };

                data.create('users', phone, userObject, (err) => {
                    if (!err) {
                        callback(200, { message: 'User created Successfully' })
                    } else {
                        callback(500, { error: 'Problem when creating user' })
                    }
                })
            } else {
                callback(500, {
                    error: 'There was a problem in server side'
                })
            }
        })
    } else {
        callback(400, {
            error: 'You have a problem in your request'
        });
    }
}

//read an user 
handler._users.get = (requestProperties, callback) => {
    const phone = typeof (requestProperties.queryStringObject.phone) === 'string' && requestProperties.queryStringObject.phone.trim().length === 10 ? requestProperties.queryStringObject.phone : false

    if (phone) {
        data.read('users', phone, (err, u) => {
            const user = { ...parseJson(u) };
            if (!err && user) {
                delete user.password;
                callback(200, user)
            } else {
                callback(404, { error: "User not found Inner" })
            }
        })
    } else {
        callback(404, { error: "User Not Found outer" })
    }
}

//update the user data 
handler._users.put = (requestProperties, callback) => {
    const phone = typeof (requestProperties.body.phone) === 'string' && requestProperties.body.phone.trim().length === 10 ? requestProperties.body.phone : false;

    const firstName = typeof (requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof (requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;


    const password = typeof (requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    if (phone) {
        if (firstName || lastName || password) {
            data.read('users', phone, (err, udata) => {
                const userData = { ...parseJson(udata) };

                if (!err && userData) {
                    if (firstName) {
                        userData.firstName = firstName;
                    }

                    if (lastName) {
                        userData.lastName = lastName;
                    }

                    if (password) {
                        userData.password = hash(password);
                    }

                    data.update('users', phone, userData, (err) => {
                        if (!err) {
                            callback(200, { message: 'Successfully Updated your data' });
                        } else {
                            callback(500, { error: 'Problem occure when updating your data' });
                        }
                    })
                } else {
                    callback(400, { error: 'Problem occure when read your data' })
                }
            })
        } else {
            callback(400, { error: 'You have a problem in your request' })
        }

    } else {
        callback(400, { error: 'Invalid Phone Number ! Please try again' })
    }


}

//delete the user data
handler._users.delete = (requestProperties, callback) => {
    const phone = typeof (requestProperties.queryStringObject.phone) === 'string' && requestProperties.queryStringObject.phone.trim().length === 10 ? requestProperties.queryStringObject.phone : false;

    if (phone) {
        data.read('users', phone, (err, userData) => {
            if (!err && userData) {
                data.delete('users', phone, (err) => {
                    if (!err) {
                        callback(200, { message: 'Successfully Deleted your data' });
                    } else {
                        callback(500, { error: 'Error occure when delete data' });
                    }
                });
            } else {
                callback(500, { error: 'Error occcure when read data' });
            }
        })
    } else {
        callback(404, { error: 'User Not Found' })
    }


}

module.exports = handler;