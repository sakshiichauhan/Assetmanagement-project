import React from "react";

const AllRequestsTable = ({
  allAssetRequests = [],
  allAssetReplacements = [],
  allAssetMaintenance = [],
}) => {
  // Helper function to assign badge colors based on status
  const getStatusClasses = (status = "") => {
    switch (status.toLowerCase()) {
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Merge & map each list into a unified shape
  const mergedData = [];

  // Asset Requests
  if (allAssetRequests.length > 0) {
    const mappedRequests = allAssetRequests.map((req) => ({
      _id: req._id,
      type: "Request", // Distinguish request type
      date: req.requestDate || req.createdAt,
      reason: req.reason,
      description: req.assetDescription,
      priority: req.priorityLevel,
      status: req.status || "pending",
    }));
    mergedData.push(...mappedRequests);
  }

  // Asset Replacements
  if (allAssetReplacements.length > 0) {
    const mappedReplacements = allAssetReplacements.map((rep) => ({
      _id: rep._id,
      type: "Replacement",
      date: rep.createdAt,
      reason: rep.reasonForReplacement,
      description: rep.requestedAssetDescription,
      priority: rep.priorityLevel,
      status: rep.status || "pending",
    }));
    mergedData.push(...mappedReplacements);
  }

  // Asset Maintenance
  if (allAssetMaintenance.length > 0) {
    const mappedMaintenance = allAssetMaintenance.map((mnt) => ({
      _id: mnt._id,
      type: "Maintenance",
      date: mnt.createdAt || mnt.scheduledDate,
      reason: mnt.details,
      description: mnt.maintenanceType,
      priority: mnt.priorityLevel,
      status: mnt.status || "pending",
    }));
    mergedData.push(...mappedMaintenance);
  }

  // Render the table
  return (
    <div className="max-w-5xl mx-auto my-8 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        All Asset Requests
      </h2>
      <p className="text-gray-500 mb-6">
        Below is a combined list of asset requests, replacements, and maintenance.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Reason
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Priority
              </th>
              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {/* If no mergedData */}
            {mergedData.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}

            {/* Map mergedData */}
            {mergedData.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                  {item.date ? item.date.toString().split("T")[0] : "N/A"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                  {item.type}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.description || "—"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.reason || "—"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.priority || "Normal"}
                </td>
                <td className="px-4 py-2 text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(
                      item.status
                    )}`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequestsTable;
