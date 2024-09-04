import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminItem = ({ admin, UpdateAdmin, DeleteAdmin }) => {

    //States
    const [isEditing, setIsEditing] = useState(false)
    const [username, setUsername] = useState(admin.user.username)
    const [email, setEmail] = useState(admin.user.email)
    const [password, setPassword] = useState("")

    const handleUpdate = () => {
        setIsEditing(false)
        UpdateAdmin({
            username: username,
            email: email,
            password: password,
            admin: admin.id
        })
        // onUpdate(business.id, newName, newBusinessType); // Replace with actual update logic
    };

    const handleDelete = () => {
        DeleteAdmin({
            admin: admin.id
        })
    };

    <tr>
        <td class="text-center">{admin.user.username}</td>
        <td class="text-center">{admin.user.email}</td>
        <td class="text-center">
            <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
                placeholder="Enter Password"
            />
        </td>
        <td className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-1 px-2 rounded m-2">Update</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded m-2">Delete</button>
        </td>
    </tr>
    return (
        <>
            {isEditing ? (
                <tr>
                    <td>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
                        />
                    </td>
                    <td class="text-center">
                        <input
                            type="text"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
                            placeholder="Enter Password"
                        />
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
                    <td class="text-center">{username}</td>
                    <td class="text-center">{email}</td>
                    <td class="text-center">
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
                            placeholder="Enter Password"
                        />
                    </td>
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

export default AdminItem;