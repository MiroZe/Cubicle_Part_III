const cubeController = require('express').Router();
const { getAllAccesories, getUnattachedAccessories } = require('../services/accessoryService');
const {  getOneCube, createCube, addAccessory, getOneCubeWithAccesories,  } = require('../services/cubeService');





cubeController.get('/create', async (req,res) => {
   
    
    res.render('create')
})


cubeController.post('/create', async (req,res) => {

    const cubeData = {
        name : req.body.name,
        description : req.body.description,
        imageUrl : req.body.imageUrl,
        difficultyLevel: Number(req.body.difficultyLevel)
    }
    const cube =  await createCube(cubeData)
    
    res.redirect('/')
})

cubeController.get('/:cubeId/details', async (req,res) => {

    const cube = await getOneCubeWithAccesories(req.params.cubeId)
    
   
    
    res.render('details', {cube})

})

cubeController.get('/:cubeId/accessories/attach', async (req,res) => {

    const cube = await getOneCube(req.params.cubeId).lean()
    const allAccessories = await getUnattachedAccessories(cube.accessories).lean()
    
   
    
    res.render('accessories/attachAccessory', {title: 'Attach Accesory',cube,allAccessories})

})

cubeController.post('/:cubeId/accessories/attach', async (req,res) => {

    await addAccessory(req.body.accessory, req.params.cubeId)
    
   
    
    res.redirect(`/cube/${req.params.cubeId}/details`)

})




module.exports = cubeController