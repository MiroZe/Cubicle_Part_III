const mongoose = require('mongoose')

const connectiosString = 'mongodb://localhost:27017/cubicle'


module.exports = database = async () => {

    await mongoose.connect(connectiosString)


}