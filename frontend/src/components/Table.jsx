import React from "react";

const Table = ({ columns, data }) => {
  return (
    <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} className="border border-gray-300 px-4 py-2 text-left">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-100">
            {Object.values(row).map((value, i) => (
              <td key={i} className="border border-gray-300 px-4 py-2">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
