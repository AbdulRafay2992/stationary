import React from 'react'
import NewAdmin from '../components/NewAdmin'
import AdminItem from '../components/AdminItem'
import { CREATE_ADMIN, UPDATE_ADMIN, DELETE_ADMIN } from '../gqloperations/mutations'
import { GET_ADMINS } from '../gqloperations/queries'
import { useMutation, gql, useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';

const AdminList = () => {

    const {id} = useParams()

    const { loading: adminsLoading, error: adminsError, data: adminsData, refetch } = useQuery(GET_ADMINS,{
        variables: {business: id}
    });

    const [createAdminMutation] = useMutation(CREATE_ADMIN);

    const [updateAdminMutation] = useMutation(UPDATE_ADMIN);

    const [deleteAdminMutation] = useMutation(DELETE_ADMIN);

    const CreateAdmin = (variables) => {
        // Define variables specific to this custom hook
        createAdminMutation({
            variables: {...variables, business:id}
        }).then(response => {
            console.log(response.createAdmin);
            refetch()
        }).catch(error => {
            console.log("Error: " + error.message);
        });
    };

    const UpdateAdmin = (variables) => {
        updateAdminMutation({
            variables: {...variables, business:id}
        }).then(response => {
            refetch()
        }).catch(error => {
            console.log("Error: " + error.message);
        });
    }

    const DeleteAdmin = (variables) => {
        deleteAdminMutation({
            variables: {...variables, business:id}
        }).then(response => {
            if (response.data.deleteAdmin.done) {
                console.log('ddddd');
                refetch()
            }
            else{
                alert("Failed to Delete")
            }
        }).catch(error => {
            console.log("Error: " + error.message);
        });
    }

    if (adminsLoading) {
        return <div>Loading .. </div>
    }
    if (adminsError) {
        return <div>Error </div>
    }

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Password
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        adminsData.admins.map((admin, index) => (
                            <AdminItem key={index} admin={admin} UpdateAdmin={UpdateAdmin} DeleteAdmin={DeleteAdmin} />
                        ))
                    }
                </tbody>
            </table>
            <NewAdmin CreateAdmin={CreateAdmin} />
        </div>

    )
}

export default AdminList