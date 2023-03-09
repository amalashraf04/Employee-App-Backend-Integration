const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String
        
    },
    position: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    }
})

const EmployeeModel = mongoose.model("employees", EmployeeSchema);


exports.EmployeeModel = EmployeeModel;