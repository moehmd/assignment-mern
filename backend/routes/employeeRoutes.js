import express from 'express';

const employeeRouter = express.Router();

import { 
    addEmployee,
    updateEmployee, 
    deleteEmployee, 
    getEmployees 
 } from '../controllers/employeeControllers.js';

employeeRouter.route('/create').post( addEmployee );
employeeRouter.route('/update/:id').put( updateEmployee );
employeeRouter.route('/delete/:id').delete( deleteEmployee );
employeeRouter.route('/list').get( getEmployees );

export default employeeRouter;
