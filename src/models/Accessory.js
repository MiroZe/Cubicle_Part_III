const {Schema,model, Types} = require('mongoose')



const accessorySchema = new Schema({
    name : {type:String, required: true},
    imageUrl : {type:String, required: true},
    description : {type:String, required: true},
   
   
})


const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory