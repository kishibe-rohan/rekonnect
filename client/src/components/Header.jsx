import {BiUserPlus,BiHomeCircle,BiGroup} from 'react-icons/bi'
import {useNavigate} from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className='md:hidden inline-flex w-full sticky top-0 z-50 shadow-lg border-bg bg-white py-1 pl-1'>
       <div className='flex max-w-6xl align-center justify-between mx-5 lg:mx-auto'>
           <div className='relative lg:inline-grid w-40'>
             <span className='text-3xl text-blue-500 font-semibold'>Rekonnect</span>
           </div>
           <div className='flex items-center ml-5 space-x-4'>
               <div className="navTag" onClick={() => navigate('/')}>
                   <BiHomeCircle/>
               </div>
               <div className="navTag" onClick={() => navigate('/user')}>
                   <BiUserPlus/>
               </div>
               <div className="navTag" onClick={() => navigate('/relation')}>
                   <BiGroup/>   
               </div>
           </div>
       </div>
    </div>
  )
}

export default Header