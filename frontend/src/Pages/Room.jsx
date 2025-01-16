// src/RoomwiseAssets.js

import React, { useState, useEffect } from 'react';

const RoomwiseAssets = () => {
  // State to store roomwise assets
  const [roomwiseAssets, setRoomwiseAssets] = useState([
    // Example mock data
    {
      _id: 'Room 1',
      assets: [
        {
          name: 'Asset 1',
          description: 'Description of Asset 1',
          model: 'Model A',
          serialNumber: 'SN12345',
          condition: 'Good'
        },
        {
          name: 'Asset 2',
          description: 'Description of Asset 2',
          model: 'Model B',
          serialNumber: 'SN67890',
          condition: 'Fair'
        }
      ]
    },
    {
      _id: 'Room 2',
      assets: [
        {
          name: 'Asset 3',
          description: 'Description of Asset 3',
          model: 'Model C',
          serialNumber: 'SN11223',
          condition: 'Excellent'
        }
      ]
    }
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Room-wise Asset Assignment</h2>
      {roomwiseAssets.length === 0 ? (
        <p className="text-center text-lg">No assets assigned to any rooms.</p>
      ) : (
        roomwiseAssets.map((roomData, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-medium mb-2">Room: {roomData._id || 'No Room Assigned'}</h3>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left border border-gray-300">Asset Name</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Description</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Model</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Serial Number</th>
                  <th className="px-4 py-2 text-left border border-gray-300">Condition</th>
                </tr>
              </thead>
              <tbody>
                {roomData.assets.map((asset, index) => (
                  <tr key={index} className="odd:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300">{asset.name}</td>
                    <td className="px-4 py-2 border border-gray-300">{asset.description}</td>
                    <td className="px-4 py-2 border border-gray-300">{asset.model}</td>
                    <td className="px-4 py-2 border border-gray-300">{asset.serialNumber}</td>
                    <td className="px-4 py-2 border border-gray-300">{asset.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default RoomwiseAssets;
