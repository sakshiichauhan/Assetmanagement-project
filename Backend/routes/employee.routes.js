import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  assignAssetToEmployee,
} from "../controller/employee.controller.js";

const employeerouter = express.Router();

employeerouter.post("/createemp", createEmployee); 
employeerouter.get("/getemp", getAllEmployees); 
employeerouter.get("/getemp/:id", getEmployeeById); 
employeerouter.put("/updateemp/:id", updateEmployee); 
employeerouter.delete("/deleteemp/:id", deleteEmployee); 
employeerouter.post("/assign-asset", assignAssetToEmployee); 

export default employeerouter;
