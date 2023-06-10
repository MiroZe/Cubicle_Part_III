const { register, login } = require('../services/userService');
const { parseErrors } = require('../utils.js/helpers');

const userController = require('express').Router();



userController.get('/register', (req, res) => {

    res.render('auth/register', { title: 'Register Page' })
})

userController.post('/register', async (req, res) => {


    try {


        if (Object.values(req.body).some(r => r == '')) {
            throw new Error('All fields are mandatory')
        }

        if (req.body.password != req.body.repeatPassword) {
            throw new Error('Passwords mismatch!')
        }


        const token = await register(req.body.username, req.body.password)
        res.cookie('token', token);
        res.redirect('/')


    } catch (error) {
        res.render('auth/register',
            {
                title: 'Register Page',
                errors: parseErrors(error)
            })
    }


})


userController.get('/login', async (req, res) => {

    res.render('auth/login', {
        title: 'Login Page'
    })


})


userController.post('/login', async (req, res) => {


    try {
        if (Object.values(req.body).some(r => r == '')) {
            throw new Error('All fields are mandatory')
        }

        const token = await login(req.body.username, req.body.password);
        res.cookie('token', token)
        res.redirect('/')

    } catch (error) {
        console.log(error.message);
        res.render('auth/login',
            {
                title: 'Login Page',
                errors: error.message
            })
    }

})

userController.get('/logout' , (req,res) => {

    res.clearCookie('token');
    res.redirect('/')
})




module.exports = userController