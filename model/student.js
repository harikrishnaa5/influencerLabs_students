const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    studentId: {
        type: Number,
        required: true
    },
    Class: {
        type: Number,
        required: true
    }
})

const studentModel = mongoose.model("student", studentSchema)
module.exports = studentModel