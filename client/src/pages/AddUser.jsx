import React from 'react'
import {Header,Sidebar,AddUserForm} from '../components/index'

const AddUser = () => {
  return (
    <div className='flex'>
       <Sidebar/>
       <div className='content'>
         <Header/>
         <AddUserForm/>
       </div>
    </div>
  )
}

export default AddUser