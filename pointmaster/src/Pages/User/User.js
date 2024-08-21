import React from 'react'
import CashierDetails from './CashierDetails';
import AllUsers from './AllUsers';
import './user.css'

function User() {
  return (
    <div className='user-container'>
      <div className='user-left-side'>
        <CashierDetails/>
      </div>
      <div className='user-right-side'>
        <AllUsers/> 
      </div> 
    </div>
  )
}

export default User;
