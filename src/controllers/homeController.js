const { getAllCubes } = require('../services/cubeService');

const homeController = require('express').Router();



homeController.get('/', async (req,res) => {

    const allCubes = await getAllCubes().lean()
    res.render('home', {allCubes})

    
})

homeController.get('/about', (req,res) => {

    res.render('about')
})

homeController.get('/404', (req,res) => {

    res.render('404')
})


module.exports = homeController
