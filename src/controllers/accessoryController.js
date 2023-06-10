const { isAuth } = require('../middlewares/isAuth');
const { createAccesory: createAccessory } = require('../services/accessoryService');

const accessoryController = require('express').Router();






accessoryController.get('/create', (req,res)=> {
    res.render('accessories/createAccessory', {
        title: 'Create Accesory'
    })

})

accessoryController.post('/create', async (req,res)=> {


    const {name, description, imageUrl} = req.body;
    await createAccessory(name, description, imageUrl)
    res.redirect('/')

    
    
    res.render('accessories/createAccessory', {
        title: 'Create Accesory'
    })

})





module.exports = accessoryController