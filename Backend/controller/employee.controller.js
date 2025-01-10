import Employee from "../models/employee.models.js";
import Asset from "../models/asset.models.js";

export const createEmployee = async (req, res) => {
    try {
        const newEmployee = await Employee.create(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate("assets");
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate("assets");
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const assignAssetToEmployee = async (req, res) => {
    try {
        const { employeeId, assetId } = req.body;
        const employee = await Employee.findById(employeeId);
        const asset = await Asset.findById(assetId);

        if (!employee || !asset) return res.status(404).json({ message: "Employee or Asset not found" });

        asset.assignedTo = employeeId;
        await asset.save();

        employee.assets.push(assetId);
        await employee.save();

        res.status(200).json({ message: "Asset assigned successfully", employee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
