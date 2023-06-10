const {Schema,model, Types} = require('mongoose')



const cubeSchema = new Schema({
    name : {type:String, required: true},
    description : {type:String, required: true},
    imageUrl : {type:String, required: true},
    difficultyLevel : {type:Number, required: true},
   accessories : [{type:Types.ObjectId, ref: 'Accessory', default: []}],
   owner: {type:Types.ObjectId, ref:'User', default:[], required: true}
})


const Cube = model('Cube', cubeSchema);

module.exports = Cube