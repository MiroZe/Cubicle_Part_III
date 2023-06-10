const Accessory = require("../models/Accessory");

 


 function getAllAccesories () {

    return Accessory.find()

 }

  function createAccesory(name, description, imageUrl){

    Accessory.create({name, description, imageUrl})
 }

 function getUnattachedAccessories (aIds) {
   return Accessory.find({_id: {$nin :aIds }})
 }


 


 module.exports = {
    getAllAccesories,
    createAccesory,
    getUnattachedAccessories
 }