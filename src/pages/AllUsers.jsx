import React, { useEffect, useState } from 'react'
import {GrEdit} from 'react-icons/gr'
import {MdDelete} from 'react-icons/md'
import {BiSolidMessageAltError, BiSolidUserPlus} from 'react-icons/bi'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Axios, UploadImage } from '../Axios/Axios';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';
import { IMAGECHANGER, LOGOUT, SIGNIN } from '../Redux/User.Reducer';
export const AllUsers = () => {
  let [show,setShow] = useState(false)
  let [em,setEm] = useState(false)
  let [data,setData] = useState([])
  let {isAdmin} = useSelector((state) => state.user)
  let [AllUserData,setAllUserData] = useState([null])
  let [loading,setLoading]  = useState(false)
  let [loading2,setLoading2]  = useState(false)
  let [loading3,setLoading3] = useState(false)
  let [loading4,setLoading4] = useState(false)
  let [id,setId] = useState(null)
  let [type,setType] = useState(false)
  let [error,setError] = useState('')
  let user = useSelector((state) => state.user)
  let [newProfile,setNewProfile] = useState('https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png')
  let [newFirstname,setNewFirstname] = useState('')
  let [newLastname,setNewLastname] = useState('')
  let [newUsername,setNewUsername] = useState('')
  let [newEmail,setNewEmail] = useState('')
  let [newPassword,setNewPassword] = useState('')
  let [isNewAdmin,setNewIsAdmin] = useState(false)
  let [error3,setError3] = useState('')
    let Data = async () => {
      let res = await Axios.get('/auth');
      setData(res.data.data)
    }
  useEffect(() => {
    Data()
  },[])
  const handleClose = () => {
    setShow(false)
  };
  let EditUser = async (id,type) => {
    setFetch(true)
      setId(id)
      setType(type)
  }
  useEffect(() => {
      let Func = async () => {
        setLoading(true)
        let res = await Axios.get(type ? `/auth/singleUser/${id}` : `/auth/singleUser`)
        res.data && setLoading(false)
        res.data && setAllUserData(res.data.data)
        res.data && setProfile(res.data.data.profile)
        res.data && setFirstname(res.data.data.firstname)
        res.data && setLastname(res.data.data.lastname)
        res.data && setUsername(res.data.data.username)
        res.data && setEmail(res.data.data.email)
    }
    Func()
  },[id,type])
    let [profile,setProfile] = useState('')
  let [firstname,setFirstname] = useState('')
  let [lastname,setLastname] = useState('')
  let [username,setUsername] = useState('')
  let [email,setEmail] = useState('')
  let [fetch,setFetch] = useState(true)
  const handleShow = () => setShow(true);
  let SendUpdate = async (id) => {
    setLoading2(true)
    try {
        let res = await Axios.put(`/auth/update-user/${id}`,{
          username : username,
          lastname : lastname,
          firstname : firstname,
          email : email
      })
      if(res.data){
            try {
              let income = await UploadImage(profile);
                if(income.data.secure_url){
                  let response = await Axios.put(`/auth/user/${id}`,{
                    profile : income.data.secure_url
                  })
                    response.data && setLoading2(false)
                    setProfile('')
                    setFirstname('')
                    setLastname('')
                    setEmail('')
                    setUsername('')
                      setNewProfile('')
                      setNewFirstname('')
                      setNewLastname('')
                      setNewPassword('')
                      setNewEmail('')
                      setNewUsername('')
                    user.username === res.data.data.username && dispatcher(IMAGECHANGER({profile : income.data.secure_url}))
                    handleClose()
                    Data()
                }else{
                  setError('Error while upload profile picture')
                  Reloader()
                  Resetter()
                }
            } catch (error) {
              setError(error.response.data.error)
              Reloader()
              Resetter()
            }
        }
    } catch (error) {
      setError(error.response.data.error)
      Reloader()
      Resetter()
    }
  }
    let Resetter = () => {
    setTimeout(() => {
      setError('')
    },3000)
  }
  let Reloader = () => {
    setTimeout(() => {
      setLoading2(false)
    },1000)
  }
  let navigate = useNavigate()
  let dispatcher = useDispatch()
  let DeleteUser = async (dataUser) => {
    let Anwser = prompt('Are you sure you want to delete this user ? Y/y or N/n')
    if(String(Anwser).toLocaleUpperCase() === 'Y'){
      setLoading3(true)
        let res = await Axios.delete(`/auth/${dataUser?._id}`)
        if(res.data){
          if(user.username === dataUser.username){
            dispatcher(LOGOUT({}))
            navigate('/auth')
            dispatcher(SIGNIN({type : true}))
          }else{
            Data()
            if(data?.length === 0){
              dispatcher(LOGOUT({}))
              navigate('/auth')
              dispatcher(SIGNIN({type : false}))
            }else{
              Data()
            }
          }
        }
        setLoading3(false) 
    }
  }
  let AddUser = () => {
    setFetch(false)
    handleShow()
    setNewProfile('https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png')
      setNewFirstname('')
      setNewLastname('')
      setNewPassword('')
      setNewEmail('')
      setNewUsername('')
  }
  let HandleAddNew = async () => {
          try {
          setLoading4(true)
        let {data} = await Axios.post('/auth/register',{
            firstname : newFirstname,
            lastname : newLastname,
            username : newUsername,
            password : newPassword,
            email : newEmail,
            isAdmin : isNewAdmin
        })
        if(data.data){
              let res = '';
              !String(newProfile).includes('vecteezy') && (res =  await UploadImage(newProfile))
                if(res.data){
                  if(res.data.secure_url){
                    let response = await Axios.put(`/auth/user/${data.data._id}`,{
                      profile : res.data.secure_url  
                    })
                      response.data && setLoading4(false)
                  }else{
                    setError3('Error while upload profile picture')
                    Reloader2()
                    Resetter2()
                  }
                }else{
                   let response = await Axios.put(`/auth/user/${data.data._id}`,{
                      profile : 'https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png'
                      })
                        response.data && setLoading4(false)
                }
        }
        setNewProfile('')
        setNewFirstname('')
        setNewLastname('')
        setNewPassword('')
        setNewEmail('')
        setNewUsername('')
        handleClose()
        Data()
      } catch (error) {
        setError3(error.response.data.error)
        Reloader2()
        Resetter2()
      }
  }
    let Resetter2 = () => {
    setTimeout(() => {
      setError3('')
    },3000)
  }
  let Reloader2 = () => {
    setTimeout(() => {
      setLoading4(false)
    },1000)
  }
  
  let [showPass,setShowPass] = useState(false)
  return (
    <div className='w-full min-h-screen bg-white text-black py-4'>
      {isAdmin && <Button variant="primary" onClick={AddUser} className='bg-[#0f0c29] text-white ml-[230px] p-2 mb-2 font-Poppins flex items-center justify-start'>
        <BiSolidUserPlus className={'mr-2'} />New User
      </Button>}

      <Modal show={show} onHide={handleClose} className='mt-[1%]'>
        <Modal.Header closeButton>
          <Modal.Title className='w-full flex items-center justify-between'>{!fetch ? 'Add User': 'Update User'}{fetch ? <h1 className={`${error ? 'scale-100' : 'scale-0'} absolute top-5 right-10 font-Poppins flex items-center justify-start error origin-center text-red-600 text-xs font-bold text-left my-1`}><BiSolidMessageAltError className={'mr-1'} />{error} !</h1> :  <h1 className={`${error3 ? 'scale-100' : 'scale-0'} absolute top-5 right-10 font-Poppins flex items-center justify-start error origin-center text-red-600 text-xs font-bold text-left my-1`}><BiSolidMessageAltError className={'mr-1'} />{error3} !</h1>}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-black flex items-center justify-center flex-col'>
          {(!loading && fetch) ? <form action="" className='flex items-center justify-center flex-col w-10/12 mx-auto'>
            <label htmlFor="profile" className='w-14 h-14 rounded-full my-3 border-solid border-black/50 border-[1px] flex items-center justify-center'>
              <img className='w-full h-full rounded-full object-contain' src={profile && (String(profile).includes('.com') ? profile : URL.createObjectURL(profile))} alt="" />
              <input required onChange={(e) => setProfile(e.target.files[0])} className='hidden' type="file" name="" id="profile" />
            </label>
            <div className='w-full flex items-center justify-between'>
              <input required value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" className='p-3 mr-1 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' />
              <input required value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" className='p-3 ml-1 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' />
            </div>
            <input required value={username} onChange={(e) => setUsername(e.target.value)} type="text" className='p-3 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' />
            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="text" className='p-3 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' />
          </form> : <ClipLoader color={'#000'} loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/>}
          {
            !fetch && (
              <form action="" className='flex items-center justify-center flex-col w-10/12 mx-auto'>
              <label htmlFor="profile" className='w-14 h-14 rounded-full my-3 border-solid border-black/50 border-[1px] flex items-center justify-center'>
                <img className='w-full h-full rounded-full object-contain' src={newProfile && (String(newProfile).includes('vecteezy') ? newProfile : URL.createObjectURL(newProfile))} alt="" />
                <input required onChange={(e) => setNewProfile(e.target.files[0])} className='hidden' type="file" name="" id="profile" />
              </label>
              <div className='w-full flex items-center justify-between'>
                <input required value={newFirstname} onChange={(e) => setNewFirstname(e.target.value)} type="text" className='p-3 mr-1 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' placeholder='Firstname' />
                <input required value={newLastname} onChange={(e) => setNewLastname(e.target.value)} type="text" className='p-3 ml-1 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' placeholder='Lastname' />
              </div>
              <input required value={newUsername} onChange={(e) => setNewUsername(e.target.value)} type="text" className='p-3 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' placeholder='Username' />
              <input required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type={showPass ? 'text' : 'password'} className='p-3 ml-1 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' placeholder='Password' />
              <li onClick={() => setShowPass(!showPass)} className='w-10 h-10 flex top-[240px] right-16 items-center justify-center hover:bg-black/10 cursor-pointer list-none rounded-full absolute'>{showPass ? <BsEyeSlash /> : <BsEye />}</li>
              <input required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} type="text" className='p-3 border-solid border-[#0f0c29]/20 rounded-md outline-none text-sm tracking-wider border-[1px] my-1 w-full placeholder:text-black/40' placeholder='Email' />
               <div className='flex items-center justify-start w-full my-2'>
                <input value={isNewAdmin} onChange={(e) => setNewIsAdmin(e.currentTarget.checked)} type="checkbox" id='isadmin' className='cursor-pointer' />
                <label htmlFor="isadmin" className='font-Poppins text-xs cursor-pointer ml-2'>isAdmin</label>
              </div>
          </form>
            )
          }
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading2 || loading4} variant="secondary" onClick={handleClose} className='text-black hover:bg-white'>
            Close
          </Button>
          <Button variant="primary" onClick={() => {fetch ? SendUpdate(AllUserData?._id) : HandleAddNew()}} className='text-black hover:bg-white flex items-center justify-center'>
            {fetch ? (loading2 ? <ClipLoader color={'#000'} loading={loading2} size={20} aria-label="Loading Spinner" data-testid="loader"/> : 'Save Changes') : (loading4 ? <ClipLoader color={'#000'} loading={loading4} size={20} aria-label="Loading Spinner" data-testid="loader"/> : 'Add User')}
          </Button>
        </Modal.Footer>
      </Modal>
        <table className='w-[70%] relative mx-auto text-center font-Poppins font-light'>
          <thead>
            <tr>
              <th className='py-2 font-light tracking-widest'>Profile</th>
              <th className='py-2 font-light tracking-widest'>Firstname</th>
              <th className='py-2 font-light tracking-widest'>Lastname</th>
              <th className='py-2 font-light tracking-widest'>Username</th>
              <th className='py-2 font-light tracking-widest'>Email-Address</th>
              <th className={'py-2 font-light tracking-widest'}>Actions</th>
              {user?.isAdmin && <li onClick={() => setEm(!em)} className='w-8 h-8 flex top-[5px] right-36 items-center justify-center hover:bg-white/20 cursor-pointer list-none rounded-full absolute'>{user.isAdmin && em ? <BsEyeSlash /> : <BsEye />}</li>}
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 ? (
                data.map((info) => (
                  <tr className='p-0'>
                      <td>
                        <div className='w-12 h-12 rounded-full'>
                          <img className='w-full h-full object-contain rounded-full' src={info?.profile} />
                        </div>
                      </td>
                      <td>{info.firstname}</td>
                      <td>{info?.lastname}</td>
                      <td>{info?.username}</td>
                      <td>{
                        user.isAdmin && em ? info?.email : String(info?.email).substring(0,2)+Array.from(String(info?.email).substring(0,9)).fill('*').concat('**').join('').concat('.com') 
                      }
                      </td>
                      {user.isAdmin ? (<td className='flex items-center justify-center h-[48px]'>
                            <button onClick={() => DeleteUser(info)} className='w-7 h-7 flex items-center justify-center hover:bg-black/20 cursor-pointer rounded-full'>{loading3 ? <ClipLoader color={'#000'} loading={loading3} size={16} aria-label="Loading Spinner" data-testid="loader"/> : <MdDelete />}</button>
                            <button onClick={() => {EditUser(info?._id, user.isAdmin); handleShow()}} className='w-7 h-7 ml-4 flex items-center justify-center hover:bg-black/20 cursor-pointer rounded-full'><GrEdit /></button>
                      </td>) : (user.username === info?.username ? <div className='flex items-center justify-center h-[48px]'><button onClick={() => DeleteUser(info)} className='w-7 h-7 flex items-center justify-center hover:bg-black/20 cursor-pointer rounded-full'>{loading3 ? <ClipLoader color={'#000'} loading={loading3} size={16} aria-label="Loading Spinner" data-testid="loader"/> : <MdDelete />}</button>
                        <button onClick={() => {EditUser(info?._id, user.isAdmin); handleShow()}} className='w-7 h-7 ml-4 flex items-center justify-center hover:bg-black/20 cursor-pointer rounded-full'><GrEdit /></button></div> : <div className='flex items-center justify-center h-[48px]'>Admin Privillage</div>)}
                    </tr>
                ))
              ) : <h1 className='text-3xl font-extralight tracking-wider my-4'>No Users! Or you may need to Login!</h1>
            }
          </tbody>
        </table>
    </div>
  )
}
