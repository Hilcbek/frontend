import React, { useState } from 'react'
import {BsEye,BsEyeSlash} from 'react-icons/bs'
import {BiSolidMessageAltError} from 'react-icons/bi'
import { Axios, UploadImage } from '../Axios/Axios'
import PacmanLoader from "react-spinners/PacmanLoader";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN } from '../Redux/User.Reducer';
export const Register = () => {
  let user = useSelector((state) => state.user)
  let [profile,setProfile] = useState('https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png')
  let [openlogin,setOpenLogin] = useState(user.signIn ? true : false)
  let [openReg,setOpenReg] = useState(!user.signIn ? true : false)
  let [showPass,setShowPass] = useState(false)
  let [showPass2,setShowPass2] = useState(false)
  let [firstname,setFirstname] = useState(null);
  let [lastname,setLastname] = useState(null)
  let [password,setPassword] = useState(null)
  let [email,setEmail] = useState(null);
  let [username,setUsername] = useState(null);
  let [loading1, setLoading1] = useState(false);
  let [loading2, setLoading2] = useState(false);
  let [color, setColor] = useState("#ffffff");
  let [isAdmin,setIsAdmin] = useState(false)
  let [error2,setError2] = useState('')
  let [error1,setError1] = useState('')
  let [loginUsernameEmail,setLoginUsernameEmail] = useState(null)
  let [loginPassword,setLoginPassword] = useState(null)
  let dispatch = useDispatch();
  let Handler = (page) => {
    if(page === 'register'){
      setOpenLogin(false)
      setOpenReg(true)
      setLoginUsernameEmail('')
      setLoginPassword('')
    }else{
      setOpenLogin(true)
      setOpenReg(false)
      setProfile('')
      setFirstname('')
      setLastname('')
      setPassword('')
      setEmail('')
      setUsername('')
    }
  }
  let HandleRegister = async () => {
      try {
        setLoading1(true)
        let {data} = await Axios.post('/auth/register',{
            firstname : firstname,
            lastname : lastname,
            username : username,
            password : password,
            email : email,
            isAdmin : isAdmin
        })
        if(data.data){
            try {
              let res = !String(profile).includes('.vecteezy') && await UploadImage(profile);
                if(res.data){
                  if(res.data.secure_url){
                    let response = await Axios.put(`/auth/user/${data.data._id}`,{
                      profile : (res.data ? res.data.secure_url : profile)  
                    })
                      response.data && setLoading1(false)
                      setProfile('')
                      setFirstname('')
                      setLastname('')
                      setPassword('')
                      setEmail('')
                      setUsername('')
                      setOpenLogin(true)
                      setOpenReg(false)
                  }else{
                    setError2('Error while upload profile picture')
                    Reloader()
                    Resetter()
                  }
                }else{
                   let response = await Axios.put(`/auth/user/${data.data._id}`,{
                      profile : (res.data ? res.data.secure_url : profile)  
                      })
                        response.data && setLoading1(false)
                        setProfile('')
                        setFirstname('')
                        setLastname('')
                        setPassword('')
                        setEmail('')
                        setUsername('')
                        setOpenLogin(true)
                        setOpenReg(false)
                }
            } catch (error) {
              setError1(error.response.data)
              Reloader()
              Resetter()
            }
        }
      } catch (error) {
        setError1(error.response.data.error)
        Reloader()
        Resetter()
      }
  }
  let Resetter = () => {
    setTimeout(() => {
      setError1('')
    },3000)
  }
  let Reloader = () => {
    setTimeout(() => {
      setLoading1(false)
    },1000)
  }
  let Reloader2 = () => {
    setTimeout(() => {
      setLoading1(false)
    },1000)
  }
  let Resetter2 = () => {
    setTimeout(() => {
      setError2('')
    },3000)
  }
  let navigate = useNavigate('')
  let HandleLogin = async  () => {
    try {
      let res = await Axios.post('/auth/login',{
        useEmail : loginUsernameEmail,
        password : loginPassword
      })
      dispatch(LOGIN({username : res.data.data.username, profile : res.data.data.profile, isAdmin : res.data.data.isAdmin}))
      res.data && navigate('/')
    } catch (error) {
      setError2(error.response.data.error)
      Reloader2()
      Resetter2()
    }
  }
  return (
    <div className='w-full'>
      <div className={`${openReg ? 'h-[520px]' : 'h-[400px]'} bg-white w-[360px] flex items-center justify-center overflow-hidden  max-h-[520px] rounded-md mx-auto mt-[5%] relative`}>
        <div className={`${openReg ? 'right-8' : 'right-[-110%]'} error w-10/12 mb-2 flex items-center justify-center flex-col absolute`}>
          <h1 className='text-black text-4xl font-extralight tracking-widest under'>Sign Up</h1>
            <label htmlFor="profile" className='cursor-pointer w-14 h-14 rounded-full my-1 border-solid border-black/50 border-[1px] flex items-center justify-center'>
              <img className='w-full rounded-full h-full object-contain' src={profile && (!String(profile).includes('.vecteezy') ? URL.createObjectURL(profile) : profile)} alt="" />
              <input required onChange={(e) => setProfile(e.target.files[0])} className='hidden' type="file" name="" id="profile" />
            </label>
            <h1 className={`${error1 ? 'scale-100' : 'scale-0'} w-full absolute top-28 left-10 font-Poppins flex items-center justify-start error origin-center text-red-600 text-xs font-bold text-left my-1`}><BiSolidMessageAltError className={'mr-1'} />{error1} !</h1>
            <div className='w-full flex items-center justify-between mt-1'>
              <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" className='focus:border-[#009866] p-3 mr-1 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' placeholder='Firstname' />
              <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" className='focus:border-[#009866] p-3 ml-1 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' placeholder='Lastname' />
            </div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className='focus:border-[#009866] p-3 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' placeholder='Username' />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPass ? 'text' : 'password'} className='focus:border-[#009866] p-3 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' placeholder='Password' />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='focus:border-[#009866] p-3 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' placeholder='email' />
            <li onClick={() => setShowPass(!showPass)} className='w-10 h-10 flex top-[245px] right-4 items-center justify-center hover:bg-black/10 cursor-pointer list-none rounded-full absolute'>{showPass ? <BsEyeSlash /> : <BsEye />}</li>
            <div className='flex items-center justify-start w-full my-2'>
              <input value={isAdmin} onChange={(e) => setIsAdmin(e.currentTarget.checked)} type="checkbox" id='isadmin' className='cursor-pointer' />
              <label htmlFor="isadmin" className='font-Poppins text-xs cursor-pointer ml-2'>isAdmin</label>
            </div>
            <button onClick={() => HandleRegister()} className='bg-[#0f0c29] p-3 rounded-3xl z-[999] mx-auto text-white/80 w-9/12 my-2 tracking-widest flex items-center justify-center'>{loading1 ? <PacmanLoader color={color} loading={loading1} size={11} aria-label="Loading Spinner" data-testid="loader"/> : 'Sign Up'}</button>
          <button onClick={() => Handler('login')} className='text-xs my-2 text-black/60 font-light tracking-wider'>Already have an account ? <span className='hover:text-black'>Sign in</span></button>
        </div>
          <div className={`${openlogin ? 'left-8' : 'left-[-110%]'} w-10/12 mb-2 transition_cubic flex items-center justify-center flex-col absolute`}>
                <div className='w-full my-5 flex items-center justify-center flex-col'>
                  <h1 className='text-black text-4xl font-extralight tracking-widest under mb-3'>Sign In</h1>
                  <h1 className={`${error2 ? 'scale-100' : 'scale-0'} w-full absolute top-24 left-3 font-Poppins flex items-center justify-start error origin-center text-red-600 text-xs font-bold text-left my-1`}><BiSolidMessageAltError className={'mr-1'} />{error2} !</h1>
                  <div className='flex items-center justify-center flex-col w-full my-4 relative'>
                    <input value={loginUsernameEmail} onChange={(e) => setLoginUsernameEmail(e.target.value)} type="text" className='focus:border-[#009866] p-3 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' placeholder='Email Address or Username' />
                    <input value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type={showPass2 ? 'text' : 'password'} className='focus:border-[#009866] p-3 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' placeholder='Password' />
                    <li onClick={() => setShowPass2(!showPass2)} className='w-10 h-10 flex top-[75px] right-4 items-center justify-center hover:bg-black/10 cursor-pointer list-none rounded-full absolute'>{showPass2 ? <BsEyeSlash /> : <BsEye />}</li>
                  </div>
                  {/* <input type="text" className='p-3 border-solid border-[#0f0c29]/20 rounded-md outline-none text-xs border-[1px] my-1 w-full placeholder:text-black/80' placeholder='' /> */}
                  <button onClick={() => HandleLogin()} className='bg-[#0f0c29] p-3 rounded-3xl mx-auto mt-3 text-white/80 w-9/12 my-2 tracking-widest flex items-center justify-center'>{loading2 ? <PacmanLoader color={color} loading={loading2} size={11} aria-label="Loading Spinner" data-testid="loader"/> : 'Sign In'}</button>
                <button onClick={() => Handler('register')} className='text-xs my-2 text-black/60 font-light tracking-wider'>Don't have an account ? <span className='hover:text-black'>Sign Up</span></button>
                </div>
            </div>
          </div>
    </div>
  )
}
