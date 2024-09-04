import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'
import EditChartOfAccount from '../components/EditChartOfAccount'
import ChartOfAccount from '../components/ChartOfAccount'
import { GET_CHART_OF_ACCOUNTS } from '../gqloperations/queries';
import { CREATE_ACCOUNT_CHART, DELETE_ACCOUNT_CHART } from '../gqloperations/mutations';

const Chartofaccounts = () => {
  const [editingChartId, setEditingChartId] = useState(0);

  const [charts, setCharts] = useState([])
  const [heads, setHeads] = useState([])
  const [categories, setCategories] = useState([])
  const [head, setHead] = useState(1)
  const [category, setCategory] = useState(0)
  const [type, setType] = useState("DEBIT")
  const [name, setName] = useState("")

  const { id } = useParams()

  const { loading, error, data, refetch } = useQuery(GET_CHART_OF_ACCOUNTS, {
    variables: { business: parseInt(id) },
  });

  const [createChartOfAccount] = useMutation(CREATE_ACCOUNT_CHART);
  const [deleteChartOfAccount] = useMutation(DELETE_ACCOUNT_CHART);

  useEffect(() => {
    if (data && data.accountHeadCategories && !loading && !error) {
      if (data.chartOfAccounts!=null) {
        setCharts(data.chartOfAccounts);
      }
      setHeads(data.accountHeadCategories.map(obj => (
        {
          id: obj.id,
          name: obj.name,
          typeName: obj.typeName
        }
      )))
      setCategories(data.accountHeadCategories.filter(obj => obj.id == head)[0].categories)
    }
  }, [data, loading, error, refetch]);

  const head_selected = (ID) => {
    setHead(ID)
    setType(heads.filter(obj => obj.id == ID)[0].typeName)
    setCategories(data.accountHeadCategories.filter(obj => obj.id == ID)[0].categories)
  }


  const delete_chart = (id) => {
    deleteChartOfAccount({
      variables: {
        chart: id
      }
    }).then(response => {
      setCharts(prev => {
        const updatedCharts = prev.filter(chart => chart.id !== id);
        return updatedCharts;
      });
    }).catch(error => {
      alert("Something wrong");
      console.log(error.message);
    });
  }
  const AddNewChart = (chart) => {
    if (head > 0 && category > 0 && name != "") {
      let variables = {
        business: id,
        chart: chart,
        accountHead: head,
        accountCategory: category,
        accountName: name
      }
      createChartOfAccount({
        variables: variables
      }).then(response => {
        setEditingChartId(0)
        refetch()
        setHead(1)
        setType("DEBIT")
        setCategory(0)
        setName("")
      }).catch(error => {
        alert("Something wrong");
        console.log(error.message);
      });
    }
    else {
      alert("In complete Data");
    }
  }

  function editing(chart) {
    setEditingChartId(chart.id)
    setHead(chart.accountHead.id)
    setCategory(chart.accountCategory.id)
    setName(chart.accountName)
    setType(chart.accountHead.typeName)
  }

  return (
    <div className='relative overflow-x-auto'>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:tet-gray-400">
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className='px-6 py-3'>Account Head</th>
            <th className='px-6 py-3'>Account Type</th>
            <th className='px-6 py-3'>Account Category</th>
            <th className='px-6 py-3'>Account Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {charts.map((chart, index) => (
            <React.Fragment key={index}>
              {editingChartId !== chart.id ?
                (
                  <ChartOfAccount
                    key={index}
                    chart={chart}
                    delete_chart={() => delete_chart(chart.id)}
                    onEdit={() => editing(chart)}
                  />
                ) : (
                  <EditChartOfAccount head={head} head_selected={head_selected} heads={heads} type={type} setCategory={setCategory} category={category} categories={categories} name={name} setName={setName} AddNewChart={() => AddNewChart(chart.id)} />
                )}
            </React.Fragment>
          ))}
          {
            editingChartId == 0 ?
              <EditChartOfAccount head={head} head_selected={head_selected} heads={heads} type={type} setCategory={setCategory} category={category} categories={categories} name={name} setName={setName} AddNewChart={() => AddNewChart(null)} />
              :
              ""
          }
        </tbody>
      </table>
    </div>
  )
}

export default Chartofaccounts