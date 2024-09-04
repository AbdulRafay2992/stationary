import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BusinessItem = ({ business, businessTypes, onUpdate, onDelete }) => {

  //States
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(business.name)
  const [newBusinessType, setNewBusinessType] = useState(business.businessType.toLowerCase())

  const handleUpdate = () => {
    setIsEditing(false)
    onUpdate(business.id, newName, newBusinessType); // Replace with actual update logic
  };

  const handleDelete = () => {
    onDelete(business.id); // Replace with actual delete logic
  };

  return (
    <>
      {isEditing ? (
        <tr>
          <td>
            <input
              type="text"
              id="newName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
              placeholder="Enter business name"
            />
          </td>
          <td>
            <select
              id="newBusinessType"
              value={newBusinessType}
              onChange={(e) => setNewBusinessType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
            >
              {businessTypes?.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </td>
          <td className="flex items-center">
            <button   
              onClick={handleUpdate}   
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
            >
              Update
            </button>
            <button   
              onClick={() => setIsEditing(false)}   
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Cancel
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td class="text-center"><Link to={`/business/${business.id}`} className="text-blue-500 hover:underline">{business.name}</Link></td>
          <td class="text-center">{business.businessType}</td>
          <td className="flex justify-center">
            <button   
              onClick={() => setIsEditing(true)}   
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-1 px-2 rounded m-2"
            >
              Update
            </button>
            <button   
              onClick={handleDelete}   
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded m-2"
            >
              Delete
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

export default BusinessItem;