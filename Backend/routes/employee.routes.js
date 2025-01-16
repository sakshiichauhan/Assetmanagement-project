import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
 
} from "../controller/employee.controller.js";

const employeerouter = express.Router();

employeerouter.post("/createemp", createEmployee); 
employeerouter.get("/getemp", getAllEmployees); 
employeerouter.get("/getemp/:id", getEmployeeById); 
employeerouter.put("/updateemp/:id", updateEmployee); 
employeerouter.delete("/deleteemp/:id", deleteEmployee); 
 

export default employeerouter;
