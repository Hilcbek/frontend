import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { LOGOUT, SIGNIN } from '../Redux/User.Reducer'
import { BiSolidUserPlus } from 'react-icons/bi'
import {IoLogIn} from 'react-icons/io5'
import {IoMdLogOut} from 'react-icons/io'
import { MdAdminPanelSettings } from 'react-icons/md'
export const Nav = () => {
  let {profile,username,isAdmin} = useSelector((state) => state.user)
  let dispatcher = useDispatch()
  let navigate = useNavigate()
  let Logout = () => {
    navigate('/auth')
    dispatcher(LOGOUT({}))
    dispatcher(SIGNIN({type : true}))
  }
  let handleRoute = (sign) => {
    if(sign === 'reg'){
      dispatcher(SIGNIN({type : false}))
    }else{
      dispatcher(SIGNIN({type : true}))
    }
    navigate('/auth')
  }
  return (
    <div className='w-full'>
        <div className='list-none py-2 w-11/12 mx-auto flex items-center justify-between text-white font-light font-Poppins'>
          <ul className='flex items-center justify-start'>
            <Link to={'/'} className='font-bold text-3xl'>OOSE - ASSIGNMENT - User Registeration System</Link>
            {isAdmin && <p className='bg-white ml-4 font-bold rounded-md flex items-center justify-start p-2 text-[#009866]'><MdAdminPanelSettings className='mr-2' />{'Admin!'}</p>}
          </ul>
          <div className='flex items-center justify-start'>
            {
              !username ? <ul className='flex items-center justify-start'>
              <li className='mx-2 cursor-pointer'><Link to={'/'}>Home</Link></li>
              <li className='mx-2 cursor-pointer'><Link to={'/About'}>About Ass.</Link></li>
              <ul className='flex items-center justify-center'>
                <button onClick={() => handleRoute('reg')} className='cursor-pointer tracking mx-2 p-2 bg-white text-[#0f0c29] flex items-center justify-start rounded-md'><BiSolidUserPlus className='mr-2' />SignUp</button>
                <button onClick={() => handleRoute('log')} className='cursor-pointer tracking mx-2 p-2 bg-white text-[#0f0c29] flex items-center justify-start rounded-md'><IoLogIn className='mr-2' />SignIn</button>
              </ul>
            </ul> : 
            <ul className='flex items-center justify-start'>
              <li className='mx-2 cursor-pointer'><Link to={'/'}>Home</Link></li>
              <li className='mx-2 cursor-pointer'><Link to={'/About'}>About Ass.</Link></li>
                <abbr title={username}>
                  <li className='w-12 bg-white/20 border-solid border-white border-[1px] h-12 rounded-full'>
                    <img className='w-full h-full rounded-full object-cover' src={profile} alt="" />
                  </li>
                </abbr>
                <button onClick={() => Logout()} className='font-semibold font-Poppins group overflow-hidden cursor-pointer tracking mx-2 p-3 bg-white ml-2 relative text-[#0f0c29] w-28 rounded-md'><p className='group-hover:-left-96 absolute error left-3 top-[6px]'>{`Hello ! ${username}`}</p><p className='group-hover:right-8 top-1 error absolute -right-96 flex items-center justify-start'><IoMdLogOut className={'mr-1'} />Logout</p></button>
              </ul>
            }
          </div>
        </div>
    </div>
  )
}
