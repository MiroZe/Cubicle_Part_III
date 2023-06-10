const { JWT_SECRET } = require('../utils.js/const')
const jwt = require('jsonwebtoken')

function hasUser(req, res, next) {

    const token = req.cookies.token

    if (token) {

        jwt.verify(token, JWT_SECRET, function (err, decodedToken) {
            if (err) {
                res.clearCookie('token')
                return res.status('401').redirect('/auth/login')
            }
            req.user = decodedToken;
            res.locals.user = decodedToken;
        })
    }

next()

}

module.exports = hasUser