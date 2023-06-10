const cubeController = require('express').Router();
const { isAuth } = require('../middlewares/isAuth');
const { getAllAccesories, getUnattachedAccessories } = require('../services/accessoryService');
const {  getOneCube, createCube, addAccessory, getOneCubeWithAccesories, updateCube, deleteCube,  } = require('../services/cubeService');
const {optionSelect,parseErrors} = require('../utils.js/helpers');





cubeController.get('/create', isAuth,async (req,res) => {
   
    
    res.render('create')
})


cubeController.post('/create',isAuth, async (req,res) => {

    
    const cubeData = {
        name : req.body.name,
        description : req.body.description,
        imageUrl : req.body.imageUrl,
        difficultyLevel: Number(req.body.difficultyLevel),
        owner: req.user._id
        
    }
    try {

        if(Object.values(cubeData).some(f => f == '')) {
            throw new Error( ' All fields are mandatory')
        }

        const cube =  await createCube(cubeData)
        res.redirect('/')
        
    } catch (error) {
        
        res.render('create' , {
            title: 'Create Page',
            cubeData,
            errors: parseErrors(error),
        })
    }
    
})

cubeController.get('/:cubeId/details', async (req,res) => {

    const cube = await getOneCubeWithAccesories(req.params.cubeId)
    if(req.user) {
        if(req.user._id == cube.owner._id) {
            cube.isOwner = true
        }
    }
    
   
    
    res.render('details', {cube})

})

cubeController.get('/:cubeId/accessories/attach', async (req,res) => {

    const cube = await getOneCube(req.params.cubeId).lean()
    const allAccessories = await getUnattachedAccessories(cube.accessories).lean()
    
   
    
    res.render('accessories/attachAccessory', {title: 'Attach Accesory',cube,allAccessories})

})

cubeController.post('/:cubeId/accessories/attach', isAuth, async (req,res) => {

    await addAccessory(req.body.accessory, req.params.cubeId)
    
   
    
    res.redirect(`/cube/${req.params.cubeId}/details`)

})

cubeController.get('/:cubeId/edit', isAuth, async (req,res)=> {

    try {

        const cube = await getOneCube(req.params.cubeId).lean()
        const options = optionSelect(cube.difficultyLevel)
        
        
        res.render('edit' , {cube, options})
    } catch (error) {
        
    }

})


cubeController.post('/:cubeId/edit',isAuth, async (req,res)=> {

    try {
        const cubeData = req.body

        await updateCube(req.params.cubeId, cubeData )
        
        res.redirect(`/cube/${req.params.cubeId}/details`)
    } catch (error) {
        
    }

})

cubeController.get('/:cubeId/delete', isAuth, async (req,res)=> {

    try {

        const cube = await getOneCube(req.params.cubeId).lean()
        const options = optionSelect(cube.difficultyLevel)
       
        
        res.render('delete' , {cube, options})
    } catch (error) {
        
    }

})

cubeController.post('/:cubeId/delete',isAuth, async (req,res)=> {

    try {

        await deleteCube(req.params.cubeId)
        res.redirect('/')
    } catch (error) {
        
    }

})




module.exports = cubeController