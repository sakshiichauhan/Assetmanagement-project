import React, { useState } from "react";
import EmployeeList from "../components/Employee/EmployeeList";
import EmployeeForm from "../components/Employee/EmployeeForm";

const EmployeePage = () => {
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleSave = () => {
    setEditingEmployee(null);
  };

  return (
    <div className="p-6">
      <EmployeeForm employeeToEdit={editingEmployee} onSave={handleSave} />
      <EmployeeList onEdit={handleEdit} />
    </div>
  );
};

export default EmployeePage;
