import React, { useState } from 'react'

const EditChartOfAccount = ({ head, head_selected, heads , type, setCategory, category, categories, name, setName , AddNewChart}) => {

    return (
        <tr>
            <td className='px-6 py-4'>
                <select value={head} onChange={(event) => head_selected(event.target.value)}>
                    <option value={0} disabled>Select Head</option>
                    {
                        heads.map((head, index) => (
                            <option key={index} value={head.id}>{head.name}</option>
                        ))
                    }
                </select>
            </td>
            <td className='px-6 py-4'>
                {type}
            </td>
            <td className='px-6 py-4'>
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                    <option value={0} disabled>Select Category</option>
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
            </td>
            <td className='px-6 py-4'>
                <input value={name} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(event) => setName(event.target.value)} />
            </td>
            <td className='px-6 py-4'>
                <button className="font-bold text-white bg-blue-500 hover:bg-gray-700 px-2 py-1 rounded-md group-hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white" onClick={AddNewChart}>Add</button>
            </td>
        </tr>
    )
}

export default EditChartOfAccount