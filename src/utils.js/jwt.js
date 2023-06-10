const jwt = require('jsonwebtoken')



function jwtSign (payload,secret) {
    let promise = new Promise((resolve,reject) => {
        jwt.sign(payload,secret, function(err,token) {
            if(err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })

    return promise;
}

function jwtVerify (token,secret) {
    let promise = new Promise((resolve,reject) => {
        jwt.verify(token,secret, function(err,token) {
            if(err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })

    return promise;
}

module.exports = jwtSign