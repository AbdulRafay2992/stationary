import React from 'react';
import LandingNav from '../../../frontend/src/components/LandingNav';
import {GET_ALL_USERS} from '../gqloperations/queries'
import { useQuery } from '@apollo/client';
import Header from '../components/Header';

const UsersPage = () => {
    const {loading,error,data} = useQuery(GET_ALL_USERS)//useQuery apollo client hook runs gql template literal queries
                                                        //and returns object with properties loading, error, data etc
    if(loading) return <h1>Loading</h1>
    if(error){
        console.log(error.message)
        return <h1>Error</h1>;
    }
    if(data){
        console.log(data)
    }
    return (
        <div className="bg-gradient-to-r from-blue-400 via-orange-500 to-orange-500 text-white p-8 rounded-xl shadow-lg">
            <h1 className="text-4xl font-extrabold mb-4">Welcome to Our Website!</h1>
            <ul className="list-none space-y-2">
                {
                    data.users.map((user, index) => {
                        return (
                            <li key={index} className="inline-block bg-white p-2 rounded-lg shadow-sm hover:shadow-lg transition duration-200">
                                <span className="text-lg font-semibold text-blue-500 hover:text-blue-700">{user.username}</span>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default UsersPage;