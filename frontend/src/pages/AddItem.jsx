
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_ITEM_MUTATION } from '../gqloperations/mutations.jsx';
import { GET_ITEMS } from '../gqloperations/queries.jsx';
import client from '../apolloClient.js';

const AddItem = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState();

    const [addProduct] = useMutation(NEW_ITEM_MUTATION, {
        client,
        onCompleted: (queryResponse) => {
            console.log(queryResponse.newItem);
            if (queryResponse.newItem != null) {
                const formData = new FormData();
                console.log("Query successfull now image upload");
                
                formData.append('image', image, name + getFileExtension(image.name));
                // console.log(formData.get('image'));

                const request = {
                    method: "POST",
                    // headers: { 'X-CSRFToken': window.csrfToken },
                    body: formData,
                };
                fetch('http://localhost:8000/image/', request)
                    .then(response => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);
                        if (data.success) {
                            console.log("Image Added!");
                        }
                        else {
                            console.log("Image upload error: "+data.error);
                        }
                    });
                setName('');
                setPrice('');
                handleDeleteImage();
            }
            else {
                alert("Error");
            }
        },
        onError: (error) => {
            console.error('Error adding product:', error);
        },
    });

    const getFileExtension = (filename) => {
        const dotIndex = filename.lastIndexOf('.');

        // Check if the dot is not present or at the beginning
        if (dotIndex === -1 || dotIndex === 0) {
            return 'No extension'; // or an empty string if preferred
        }

        // Return the extension with or without the dot
        return filename.substring(dotIndex); // Including dot, or filename.substring(dotIndex + 1) for just the extension
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name !== "" && price !== "" && image != null) {
            addProduct({
                variables: {
                    name,
                    price,
                    image: name+getFileExtension(image.name),
                },
            });
        }
        else {
            alert("Please fill all fields!");
        }

    };

    const handleDeleteImage = () => {
        let form = document.querySelector('form')
        let inputs = form.getElementsByTagName('input')
        if (inputs[2].type === 'file') {
            inputs[2].value = null;
            setImage(null);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        event.target.files[0].value = null; // Clear the file input field
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-1/2 p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-1/2 p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-1/2 p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                    />
                </div>
                <div className="flex flex-wrap">
                    {image && (
                        <div key={0} className="m-2 relative">
                            <img src={URL.createObjectURL(image)} alt="Selected Image" className="w-32 h-32 object-cover" />
                            <button
                                type="button"
                                className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                                onClick={handleDeleteImage}
                            >
                                x
                            </button>
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                    Add Product
                </button>
            </form>
        </div>
    )
}
export default AddItem;