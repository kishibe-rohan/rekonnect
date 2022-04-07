import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'

import { getUsers } from '../redux/actions/userAction'
import {toast} from 'react-toastify'
import {Header,Sidebar,AddRelationForm,Loader} from '../components/index'


const AddRelation = () => {

  const dispatch = useDispatch();
  const {users,loading,error} = useSelector((state) => state.users);

  useEffect(() => {
    if(error)
    {
      toast.error(error);
      dispatch({type:"clearErrors"})
    }
   
   },[dispatch,loading,error])

  useEffect(() => {
    dispatch(getUsers());
  },[])

  return (
    <div className='flex'>
    <Sidebar/>
    <div className='content'>
      <Header/>
      {
        loading ? <Loader/> :(
        <AddRelationForm options={users}/>
        )
      }
    </div>
    </div>
  )
}

export default AddRelation