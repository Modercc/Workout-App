require('dotenv').config()

// entry file for the backend application
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// creates express app for us
const app = express()

// middleware

// checks if there is any jason in request body and parses it
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// uses all the workout routes defined in ./routes/workouts.js if the requests starts with /api.workouts
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests, 4000 is the port number
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    // if URI, username, or password are not correct an error may occur
    .catch((error) => {
        console.log(error)
    })
