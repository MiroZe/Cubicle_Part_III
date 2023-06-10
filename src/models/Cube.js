const {Schema,model, Types} = require('mongoose')



const cubeSchema = new Schema({
    name : {type:String,
         required: true,
          unique: true,
          minLength: [5, 'Cube name should be min 5 characters long']
         
    },
    description : {type:String,
         required: true,
         minLength: [20, 'Cube description should be min 20 characters long']
        },
    imageUrl : {type:String,
         required: true,
        match: [/^https?:\/\/./i, 'Invalid picture Url']
    },
    difficultyLevel : {type:Number, required: true},
   accessories : [{type:Types.ObjectId, ref: 'Accessory', default: []}],
   owner: {type:Types.ObjectId, ref:'User', default:[], required: true}
})


const Cube = model('Cube', cubeSchema);

module.exports = Cube