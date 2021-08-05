import express from 'express'
import { port } from '.config/environment.js'
import connectToDatabase from './lib/connectToDb.js'
import logger from './lib/logger.js'
import errorHandler from './lib/errorHandler.js'
import path from 'path'
import mongoose from 'mongoose'
// import Drink from './models/drink.js'
import { dbURI } from './config/environment.js'
import router from './config/router.js'

const app = express()

const __dirname = path.resolve()

// setup the server
const startServer = async () => {
  try {
    await connectToDatabase
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('🚀 Database has connected successfully')

    // logger
    app.use((req, _res, next) => {
      console.log(`🚨 Incoming request: METHOD: ${req.method}, URL: ${req.url}`)
      next()
    })
    app.use(express.static(`${__dirname}/client/build`))
    app.use(express.json())
    app.use(logger)
    app.use('/api', router)
    app.use('/*', (_, res) => res.sendFile(`${__dirname}/client/build/index.html`))
    app.use(errorHandler)
    app.listen(port, () => console.log(`🚀 Express is up and running on port ${port}`))
    
  } catch (err) {
   
    console.log(err, 'something has gone wrong')
  }
}

startServer()


