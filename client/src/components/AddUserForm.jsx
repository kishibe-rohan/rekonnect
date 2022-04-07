import React,{useState,useEffect} from 'react';
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";

import {addUser} from '../redux/actions/userAction'


const AddUserForm = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.users);

  const [name,setName] = useState<string>("");
  const [avatar,setAvatar] = useState<string | null>(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!name || !avatar)
    {
       toast.error("Please fill all fields");
       return;
    }

    await dispatch(addUser(name,avatar));
  }

  useEffect(() => {
    if(loading)
    {
      toast.info('Adding user');
    }
    if(error)
    {
      toast.error(error);
      dispatch({type:"clearErrors"})
    }
    if(message)
    {
      toast.success(message);
      dispatch({type:"clearMessage"})
    }
   },[dispatch,loading,error,message])



  return (
    <div className='flex flex-col items-center justify-center'>
       <h3 className='headText'>Add User</h3>
       <form className='rounded-md px-10 md:px-40 py-10 h-full w-full flex flex-col items-center space-y-2'>
           {avatar && <img src={avatar} className="w-full rounded-md object-cover" alt="user"/>}
           <input type="text" required className='w-full p-2 rounded border-0 outline-none m-2' placeholder="Add Avatar URL" value={avatar}  onChange={(e) => setAvatar(e.target.value)}/>
           <input type="text" required className='w-full p-2 rounded border-0 outline-none m-2' placeholder="Add User Name" value={name}  onChange={(e) => setName(e.target.value)}/>
           <button type="submit" className="submitBtn" disabled={loading} onClick={handleSubmit}>Add User</button>
       </form>
    </div>
  )
}

export default AddUserForm