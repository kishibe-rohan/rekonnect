import React,{useState,useEffect} from 'react';
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";
import {FiUserCheck} from 'react-icons/fi'

import {getRelation} from '../redux/actions/userAction'

import Loader from './Loader';

const FindDegrees = ({options}) => {

   
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.users);

 const [id1,setId1] = useState(null);
 const [id2,setId2] = useState(null);

 const [result,setResult] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(id1 === "" || id2 === "")
    {
      toast.error("Please select both users");
      return;
    }

    if(id1 === id2)
    {
      toast.error("Users must be different");
      return;
    }
    await dispatch(getRelation(id1,id2));
  }

  useEffect(() => {
    if(loading)
    {
      toast.info('Calculating');
    }

    if(error)
    {
      toast.error(error);
      dispatch({type:"clearErrors"})
    }
    if(message)
    {
      setResult(message);
      dispatch({type:"clearMessage"})
    }
   },[dispatch,loading,error,message])

  
    
  return (
    <>
    <div className='flex flex-col h-full bg-white w-full box-border'>
       <h3 className='headText'>Find Degrees</h3>
       <div className='flex flex-col items-center m-auto p-2 w-full'>
           <div className='flex justify-center w-full'>
             <div className='formItem'>
               <FiUserCheck className='formSvg'/>
               <select onChange={(e) => setId1(e.target.value)} className='formInput'>
                    <option>User 1</option>
                    {
                        options?.map((res) => (
                        <option value={res._id}>{res.name}</option>
                      ))
                    } 
               </select>
             </div>
             <div className='formItem'>
               <FiUserCheck className='formSvg'/>
               <select onChange={(e) => setId2(e.target.value)} className='formInput'>
                    <option>User 2</option>
                    {
                        options?.map((res) => (
                        <option value={res._id}>{res.name}</option>
                      ))
                    } 
               </select>
             </div>
           </div>
           <button type="submit" onClick={handleSubmit} disabled={loading} className="submitBtn">Find</button>
       </div>
       {
           loading ? <Loader/> : result !== "" ? (
               <p className='text-pink-500 font-semibold text-lg italic text-center mb-2'>
                   {result}
               </p>
           ):null
       }
    </div>
                
    </>
  )
}

export default FindDegrees
