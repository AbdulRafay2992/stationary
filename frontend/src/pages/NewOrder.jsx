import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ITEMS } from '../gqloperations/queries.jsx';
import { CREATE_ORDER_MUTATION } from '../gqloperations/mutations.jsx';
import client from '../apolloClient.js';

const NewOrder = () => {
    const [query, setQuery] = useState('');
    const [items, setItems] = useState([]);

    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedItems, setSelectedItems] = useState([]);
    const suggestionsRef = useRef(null); // Ref for suggestions container

    const [SumTotal, setSumTotal] = useState(0);


    const { loading, error, data } = useQuery(GET_ITEMS, {
        client,
    });

    const [createOrder] = useMutation(CREATE_ORDER_MUTATION, {
        client,
        variables: {
            bill: selectedItems.map((item) => ({
                id: parseInt(item.id),
                quantity: item.quantity,
                discount: item.discount
            }))
        },
        onCompleted: (data) => {
            console.log(JSON.parse(data.createOrder.bill));
            CreateBillSlip(JSON.parse(data.createOrder.bill));
        },
        onError: (error) => {
            console.error('Error adding salesman:', error);
        },
    });
    const CreateBillSlip = (bill) => {
        // Open a new window for printing
        var printWindow = window.open('', '', 'height=500,width=800');
    
        // Define CSS for the receipt printer
        let receiptStyle = `
        <style>
            @media print {
                body {
                    width: 80mm; /* Set to 80mm for standard receipt printers */
                    margin: 0;
                    font-family: Arial, sans-serif;
                    font-size: 12px; /* Smaller font to fit the paper */
                }
    
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
    
                th, td {
                    padding: 5px;
                    text-align: left;
                    border: none; /* Remove borders for a clean receipt */
                }
    
                .total-row {
                    border-top: 2px solid black;
                }
    
                /* Hide elements that should not be printed */
                .no-print {
                    display: none;
                }
            }
        </style>`;
    
        // Define the HTML template for the bill
        let template = receiptStyle + `
            <body>
                <h2>Shop Name</h2>
                <p>Date: ${new Date().toLocaleDateString()}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Discount</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>`;
    
        // Loop through the bill items and add them to the table
        bill.items.forEach(item => {
            template += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>${item.discount}</td>
                    <td>${item.total}</td>
                </tr>`;
        });
    
        // Add the total row
        template += `
                <tr class="total-row">
                    <td colspan="4">Total</td>
                    <td>${bill.total}</td>
                </tr>
            </tbody>
        </table>
        </body>`;
    
        // Write the HTML to the new window
        printWindow.document.write(template);
    
        // Trigger the print dialog
        printWindow.document.close(); // Required for IE
        printWindow.focus(); // Required for certain browsers
        printWindow.print();
    
        // Close the window after printing
        printWindow.close();
        setSelectedItems([]);
    }
    


    // Filter items based on the query
    const filterSuggestions = (query) => {
        if (query.length === 0) {
            return items;
        }
        return items.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSuggestionClick = (item) => {
        if (!selectedItems.find((selectedItem) => selectedItem.id === item.id)) {
            setSelectedItems([...selectedItems, {
                id: item.id,
                image: item.image,
                name: item.name,
                price: item.price,
                stock: item.stock,
                quantity: 1,
                discount: 0
            }]);
            setQuery("");
            setSuggestions([]);
            setSelectedIndex(-1);
        }
    };

    const handleBlur = () => {
        setTimeout(() => {
            setSuggestions([]);
        }, 200);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                handleSuggestionClick(suggestions[selectedIndex]);

            }
        } else if (event.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) =>
                (prevIndex + 1) % suggestions.length
            );
        } else if (event.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) =>
                (prevIndex - 1 + suggestions.length) % suggestions.length
            );
        }
    };

    const deleteItem = (itemId) => {
        const updatedItems = selectedItems.filter((item) => item.id !== itemId);
        setSelectedItems(updatedItems);
        total_bill();
    };

    useEffect(() => {
        if (suggestionsRef.current && selectedIndex >= 0) {
            const items = suggestionsRef.current.querySelectorAll('li');
            if (items[selectedIndex]) {
                items[selectedIndex].scrollIntoView({ block: 'nearest' });
            }
        }
    }, [selectedIndex, suggestions]);

    useEffect(() => {
        const results = filterSuggestions(query);
        setSuggestions(results);
        setSelectedIndex(-1); // Reset the selected index when suggestions change
    }, [query]);

    useEffect(() => {
        if (data && data.items && !loading && !error) {
            if (data.items != null) {
                setItems(data.items);
            }
        }
    }, [data, loading, error]);

    useEffect(() => {
        total_bill();
    }, [selectedItems]);

    


    const total_bill = () => {
        const elements = document.getElementsByClassName('item-total');
        let sum = 0;
        Array.from(elements).forEach(element => {
            const text = element.innerText;
            const number = parseInt(text);
            sum += number;
        });
        setSumTotal(sum);
    }

    const UpdateBill = (item_id, quantity, discount) => {
        selectedItems.find((item) => item.id === item_id).quantity = quantity;
        selectedItems.find((item) => item.id === item_id).discount = discount;
        total_bill();
    }

    return (
        <div className="flex flex-wrap">
            <div className='md:w-1/2 w-full p-2'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="p-2 w-full text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 border-gray-600"
                />
                {suggestions.length > 0 && (
                    <ul
                        ref={suggestionsRef}
                        className="z-20 mt-1 w-full border border-gray-300 shadow-lg rounded-lg"
                    >
                        {suggestions.map((item, index) => (
                            <li
                                key={item.id}
                                onClick={() => handleSuggestionClick(item)}
                                className={`flex items-center p-2 cursor-pointer ${selectedIndex === index ? 'bg-orange-200' : ''}`}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <span>{item.name} - {item.price}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className='md:w-1/2 w-full p-2'>
                <button
                    className='ml-2 bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded'
                    onClick={createOrder}
                >Create Bill</button>
                <span className='text-xl font-bold ml-2'>{SumTotal}</span>
                {selectedItems.length > 0 && (
                    <ul
                        className=" z-10 mt-1 w-full border border-gray-300 bg-white shadow-lg rounded-lg"
                    >
                        {selectedItems.map((item, index) => (
                            <li
                                key={item.id}
                                className={`flex flex-wrap bg-gray-200 p-2`}
                            >
                                <Item item={item} deleteItem={deleteItem} UpdateBill={UpdateBill} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>

    );
};

const Item = ({ item, deleteItem, UpdateBill }) => {
    const [Quantity, setQuantity] = useState(1);
    const [Discount, setDiscount] = useState(0);
    const [Stock, setStock] = useState(item.stock - 1);
    const [total, setTotal] = useState(parseInt(item.price) * Quantity);

    useEffect(() => {
        let t = (item.price) * Quantity;
        setTotal(parseInt(t - (Discount / 100) * t));
    }, [Quantity, Discount]);

    useEffect(() => {
        UpdateBill(item.id, Quantity, Discount);
    }, [total]);

    const handleQuantityChange = (e) => {
        let quantity = parseInt(e.target.value)
        if (quantity > 0) {
            if (item.stock >= quantity) {
                setQuantity(quantity);
                setStock(item.stock - quantity);
                let t = parseInt(item.price) * quantity;
                setTotal(parseInt(t - (Discount / 100) * t));
            }
        }
    };

    const handleDiscountChange = (e) => {
        const discount = parseInt(e.target.value);
        if (discount >= 0 && discount <= 100) {
            setDiscount(discount);
            let t = parseInt(item.price) * Quantity;
            setTotal(parseInt(t - (discount / 100) * t));
        }
    };

    return (
        <div className='flex space-2'>
            <div>
                <img
                    src={`http://localhost:8000/media/${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 object-cover mr-2"
                />
            </div>
            <div>
                <div className='flex flex-1 mb-4'>{item.name}</div>
                <div className='flex space-x-2'>
                    <span className='text-xl'>{item.price}</span>
                    <span className='text-xl'>{Stock}</span>
                    <input value={Quantity} onChange={handleQuantityChange} type="number" placeholder='Quantity' className="p-2 w-full text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 border-gray-600" />
                    <input value={Discount} onChange={handleDiscountChange} type="number" placeholder='Discount' className="p-2 w-full text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 border-gray-600" />
                    <span className='item-total text-xl text-green-500'>{total}</span>
                    <button
                        className='ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => deleteItem(item.id)}
                    >Delete</button>
                </div>
            </div>
        </div>
    )
}

export default NewOrder;