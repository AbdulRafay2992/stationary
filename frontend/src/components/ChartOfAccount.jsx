const ChartOfAccount = ({ chart, delete_chart, onEdit}) => {
  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
      <td className='px-6 py-4'>
        {chart.accountHead.name}
      </td>
      <td className='px-6 py-4'>
        {chart.accountHead.typeName}
      </td>
      <td className='px-6 py-4'>
        {chart.accountCategory.name}
      </td>
      <td className='px-6 py-4'>
        {chart.accountName}
      </td>
      <td>
        <i className="text-green-600 fa fa-edit cursor-pointer ml-4 text-xl hover:text-gray-500" onClick={onEdit}></i>
        <i className="text-red-600 fa fa-trash-o cursor-pointer ml-4 text-xl hover:text-gray-500" onClick={() => { delete_chart(chart.id) }}></i>
      </td>
    </tr>
  )
}

export default ChartOfAccount