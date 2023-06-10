const accessoryController = require('../controllers/accessoryController')
const cubeController = require('../controllers/cubeController')
const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const { isAuth } = require('../middlewares/isAuth')





const routesConfig = (app) => {

    app.use('/', homeController)
    app.use('/cube', cubeController)
    app.use('/accessories',isAuth, accessoryController)
    app.use('/auth',userController)

    app.get('*', (req,res) => {
        res.redirect('/404')
    })
  
}


module.exports = routesConfig