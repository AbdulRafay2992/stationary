import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Business = () => {

  const { id } = useParams()

  return (
    <div>
      <div className='p-4 hover:bg-slate-200'>
        <Link to={`/business/${id}/chartofaccounts`}>
          Chart of Accounts
        </Link>
      </div>
      <div className='p-4 hover:bg-slate-200'>
        <Link to={`/admins/${id}`} >
          Admins
        </Link>
      </div>

    </div>
  )
}

export default Business