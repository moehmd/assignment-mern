import mongoose from "mongoose";

let employeeSchema = mongoose.Schema;

const employee_Schema = new employeeSchema ({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
    
});

const Employee = mongoose.model('allEmployees', employee_Schema);

export default Employee;
