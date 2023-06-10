const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwtSign = require('../utils.js/jwt')

const {JWT_SECRET} = require('../utils.js/const')



async function login(username, password) {

    const existingUser = await User.findOne({username}).collation({locale:'en', strength:2}) 
    if(!existingUser) {
        throw new Error('Username does not exist or password is incorrect ')
    }

    const passcheck = bcrypt.compare(password, existingUser.hashedPassword)
    if(!passcheck) {
        throw new Error('Username does not exist or password is incorrect ')
    }

    return createToken(existingUser)


}

async function register(username, password) {
    const existingUsername = await User.findOne({username}).collation({locale:'en', strength:2}) 
    if(existingUsername) {
        throw new Error('Username is already taken')
    }
    const hashedPassword = await bcrypt.hash(password, 9)
    const user = await User.create( {
        username,
        hashedPassword
    })

    
    return createToken(user)

}


async function createToken({_id,username}) {

    const payload = {
        _id,username
    }
    
 return jwtSign(payload,JWT_SECRET)
  


}



module.exports = {
    login,
    register
}