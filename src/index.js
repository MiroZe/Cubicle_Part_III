const express = require('express')
const expressConfig = require('./config/expressConfig')
const routesConfig = require('./config/routesConfig')
const databaseConfig = require('./config/databaseConfig')



const app = express()


expressConfig(app)
routesConfig(app)
databaseConfig().then(() => console.log('Database connected...'))
.catch(err => console.log('Database error:', err.message))






app.listen(3000, ()=> console.log('Server is listening on port 3000...'))