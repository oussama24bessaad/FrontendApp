const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors({origin: ['http://localhost:3000']}))
require('dotenv').config()
app.use(express.json())


mongoose.connect(process.env.MONGO_URI,(err)=>(
 err ? console.log(err) : console.log('database connected')
)) 

//mongoose setup
// const connectDB = require('./helpers/connectDB');
// connectDB();

const User = require('./models/userModel')


// routes
app.use('/api/users',require('./routes/userRoutes'))
// User.create({name:'oussama',email:'oussama24bessaad@gmail.com'})

app.listen(process.env.PORT,()=>console.log('server is running on port 5000'))