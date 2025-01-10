import React, { useEffect, useState } from "react";
import { fetchEmployees, deleteEmployee } from "../ApiUtil/api";

const EmployeeList = ({ onEdit }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };
    getEmployees();
  }, []);

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    setEmployees(employees.filter((emp) => emp._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Employee ID</th>
            <th className="py-2 px-4">Department</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className="border-t">
              <td className="py-2 px-4">{employee.name}</td>
              <td className="py-2 px-4">{employee.employeeId}</td>
              <td className="py-2 px-4">{employee.department}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => onEdit(employee)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee._id)}
                  className="text-red-500 hover:underline ml-4"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
