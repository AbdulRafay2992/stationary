import React, { useState } from 'react'


const NewAdmin = ({CreateAdmin}) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    
    const create_admin = (event) => {
        event.preventDefault();

        CreateAdmin({
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
    }
    

    return (
        <form onSubmit={create_admin} className="m-3 max-w-64 mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8">
            <div className="mb-2">
                <label  className="block text-sm font-medium text-gray-700">
                    Username:
                </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Username"
                />
            </div>

            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                    Email:
                </label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Email"
                />
            </div>

            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                    Password:
                </label>
                <input
                    type="text"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Password"
                />
            </div>

            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                    Confirm Password:
                </label>
                <input
                    type="text"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Confirm Password"
                />
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="w-full flex justify-center py-1 px-0 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create Admin
                </button>
            </div>
        </form>
    )
}

export default NewAdmin