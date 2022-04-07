import {BiUserPlus,BiHomeCircle,BiGroup} from 'react-icons/bi'
import {useNavigate} from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate();
    return (
      <div className="hidden md:inline-flex pt-5 pl-2 pb-2 h-[80vh] border-r-2 border-solid border-gray-300 flex-[0.2] max-w-[200px] sticky top-0 left-0">
           <div className="mx-2 flex w-full">
               <div className='flex flex-col w-[200px]'>
                   <div className='sidebarItem' onClick={ () => navigate('/')}>
                          <div className="linkTag">
                              <BiHomeCircle className="linkIcon"/> 
                          </div>
                          <p className='sidebarP'>Home</p>
                   </div>
  
                   <div className='sidebarItem' onClick={ () => navigate('/user')}>
                       <div className="linkTag">
                          <BiUserPlus className="linkIcon"/> 
                       </div>
                       <p className='sidebarP'>User</p>
                   </div>
  
                   <div className='sidebarItem' onClick={ () => navigate('/relation')}>
                       <div className="linkTag">
                          <BiGroup className="linkIcon"/>
                       </div>
                       <p className='sidebarP'>Relation</p>
                   </div>
  
                   <div className='text-xl font-extrabold text-blue-500 my-8 mx-2'>
                       <p>Subscribe to our newsletter and stay up to date with our latest blogs 📰</p>
                   </div>
  
                   <input type="email" placeholder="Email" className="px-1 mt-6 border-none outline-none w-3/4  focus:ring-0 focus:outline-none"/>
                   <button type="button" className="shadow-lg mt-1 w-3/4 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Subscribe!</button>
  
               </div>
           </div>
        
      </div>
    )
  }
  
  export default Sidebar