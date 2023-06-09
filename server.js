if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const express = require('express')
const cors = require('cors')
const app = express()

const connectDB = require('./config/connectDb.js')
const { notFound } = require("./milddleware/notFound.js")
const { errorHandler } = require("./milddleware/errorHandler.js")
const { authMiddleware } = require("./milddleware/auth.js")

// routes
const authRoute = require('./route/auth.js')
const memberRoute = require('./route/member.js')
const memoryRoute = require('./route/memory.js')

app.use(cors({
  origin: ['http://127.0.0.1:5501', 'http://127.0.0.1:5500'],
  credentials: true,
}))

app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb', extended: true}))

// welcom route
app.get('/', (req, res, next) => {
  res.status(200).json({success: true, msg: "Welcome from thuma api !"})
})
app.use('/auth', authRoute)
app.use('/members', authMiddleware, memberRoute)
app.use('/memories', memoryRoute)



// 404 page
app.use(notFound)
// error handling
app.use(errorHandler)



const start = async () => {
    try {
        // connecting to Mongodb
        connectDB(process.env.MONGO_URI)
        
        app.listen(9000, () => {
            console.log(`Server is listening on port http://www.localhost:${PORT}`)
        })
    } catch(error) {
        console.log(error)
    }
}

start()




// webner link
// https://event.webinarjam.com/go/live/253/49pz0f0rb87ulws8r0m