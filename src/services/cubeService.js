const Accessory = require("../models/Accessory")
const Cube = require("../models/Cube")



function getAllCubes() {

 return Cube.find({})

        
        
}

 function createCube(cubeData) {
   return  Cube.create(cubeData)
   
}

 function getOneCube (cubeId) {
    return Cube.findById(cubeId)
 }
 
 function getOneCubeWithAccesories (cubeId) {

 return getOneCube(cubeId).populate('accessories').lean()
 }   

        
    


async function addAccessory(accessoryName,cubeId) {

    const found = await Accessory.findOne({name:accessoryName}).lean()
    
    await Cube.findByIdAndUpdate(cubeId, {$push : {accessories :found._id}})

}



module.exports = {
    getAllCubes,
    getOneCube,
    createCube,
    addAccessory,
    getOneCubeWithAccesories
   
}