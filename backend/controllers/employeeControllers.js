import Employee from '../models/employee.js';
import relatedUsers from './utils/relatedUsers.js';

const addEmployee = async (req, res) => {
    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    });
    try {
        if (employee) {
            employee.save(); 
            res.status(201).json({
                message: "employee added successfully"
            });
        }
    } catch (error) {
        res.status(500);
        console.log(error);
        throw new Error("could not add employee");
    };
};

const updateEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    let updatedemployee = {
        _id: req.params.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    };
        
    try {
        if (employee) {
            Employee.updateOne({_id: req.params.id}, updatedemployee)
            .then(() => {
                res.status(200).json({message: "Updated successfully!"});
            });
        }
    } catch (error) {
        res.status(404);
        console.log(error);
        throw new Error('Employee not found');
    };
};

const deleteEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  try {
    if (employee) {
        await Employee.deleteOne({_id:req.params.id})
        res.status(200).json({ message: 'Employee deleted successfully' });
    }
  } catch (error) {
    res.status(404);
    console.log(error);
    throw new Error('Employee not found');
  };
};

const getEmployees = async (req, res) => {
    const employees = await Employee.find();
    try {
        if (employees) {
            let response = {
                "allEmployees": [],
                "relatedUsers": []
            };
            response.allEmployees = employees;
            response.relatedUsers = relatedUsers(employees);
            res.status(200).send(response);
        }
    } catch (error) {
        res.status(404);
        console.log(error);
        throw new Error('no employees found');
    };
};

export {
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployees
};
