const { Schema, model } = require('mongoose');

const usernameAndPasswordPattern = /[a-zA-z0-9]/i



const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        minLength: [5, 'Username should be 5 characters at least'],
        validate: {
            validator: function (value) {
                return usernameAndPasswordPattern.test(value)
            }, message: 'Invalid username or password'
        }
    },
    hashedPassword: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return usernameAndPasswordPattern.test(value)
            }, message: 'Invalid username or password'
        },
       

    }


})


const User = model('User', userSchema);


module.exports = User