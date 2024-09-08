import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ITEMS } from '../gqloperations/queries.jsx';
import { NEW_ITEM_MUTATION, DEL_ITEM_MUTATION } from '../gqloperations/mutations.jsx';
import client from '../apolloClient.js';

const NewOrder = () => {
    const [query, setQuery] = useState('');
    const [items, setItems] = useState([]);

    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedItems, setSelectedItems] = useState([]);
    const suggestionsRef = useRef(null); // Ref for suggestions container

    const [SumTotal, setSumTotal] = useState(0); // Initialize total state variable
    // const SumTotal = useRef(0);

    useEffect(() => {
        // Call GetTotal whenever selectedItems or discount changes
        GetTotal();
    }, [selectedItems]);

    const { loading, error, data, refetch } = useQuery(GET_ITEMS, {
        client,
    });

    useEffect(() => {
        if (data && data.items && !loading && !error) {
            if (data.items != null) {
                setItems(data.items);
            }
        }
    }, [data, loading, error]);

    // Filter items based on the query
    const filterSuggestions = (query) => {
        if (query.length === 0) {
            return items;
        }
        return items.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
    };

    // Update suggestions when query changes

    // Handle input change
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    // Handle suggestion click
    const handleSuggestionClick = (item) => {
        if (!selectedItems.find((selectedItem) => selectedItem.id === item.id)) {
            setSelectedItems([...selectedItems, item]);
            setQuery("");
            setSuggestions([]);
            setSelectedIndex(-1);
        }
    };
    
    const GetTotal = () => {
        const elements = document.getElementsByClassName('item-total');
        let sum = 0;
        Array.from(elements).forEach(element => {
            const text = element.innerText;
            const number = parseInt(text);
            sum += number;
        });
        setSumTotal(sum);
    }


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
    };

    // Scroll into view for selected item
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
                    onClick={() => refetch()}
                >Create Bill</button>
                <span className='text-xl font-bold ml-2'>{SumTotal}</span>
                {selectedItems.length > 0 && (
                    <ul
                        className="z-10 mt-1 w-full border border-gray-300 bg-white shadow-lg rounded-lg"
                    >
                        {selectedItems.map((item, index) => (
                            <li
                                key={item.id}
                                className={`flex flex-wrap bg-gray-200 p-2`}
                            >
                                <Item item={item} deleteItem={deleteItem} GetTotal={GetTotal} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>

    );
};

const Item = ({ item, deleteItem, GetTotal }) => {
    const [Quantity, setQuantity] = useState(1);
    const [Discount, setDiscount] = useState(0);
    const [total, setTotal] = useState(parseInt(item.price) * Quantity);

    useEffect(() => {
        let t=(item.price) * Quantity;
        setTotal(parseInt(t-(Discount / 100) *t));
    }, [Quantity, Discount]);

    useEffect(() => {
        GetTotal();
    },[total]);

    const handleQuantityChange = (e) => {
        let quantity = parseInt(e.target.value)
        if (quantity > 0) {
            setQuantity(quantity);
            let t = parseInt(item.price) * quantity;
            setTotal(parseInt(t - (Discount / 100) * t));
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