//student

const express = require("express")
const studentController = require("./controller/student")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
const PORT = 5000
const cors = require("cors")

//database connection

mongoose.connect(process.env.MONGO_URI), ()=> {
    console.log("connected to db");
}

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use("/student", studentController)

app.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`);
})