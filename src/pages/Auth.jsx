import React, { useState,useContext } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { registerApi,loginApi } from '../services/allApis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../Context_Api/AuthContext';


function Auth() {
  const [regStatus, setRegStatus] = useState(false)
  const [user,setUser]=useState({
    username:"",password:"",email:""
  })
  const navigate=useNavigate()
  const {authStatus,setAuthStatus}=useContext(authContext)


  const statechng = () => {
    setRegStatus(!regStatus)
  }

  const handleReg=async()=>{
    const {username,password,email}=user
    if(!username || !password || !email){
      toast.warning("Enter Valid Inputs!!")
    }
    else{
      const result=await registerApi(user)
      console.log(result)
      if(result.status==200){
        toast.success("Registration successfull!!")
        setUser({
          username:"",password:"",email:""
        })
        statechng()

      }
      else{
        toast.error("registration failed!!")
      }
    }
  }

  const handleLogin=async()=>{
    const {email,password}=user
    if(!email || !password){
      toast.warning("Please Fill Valid Inputs!!")
    }
    else{
      const res=await loginApi(user)
      console.log(res) 
      if(res.status==200){
        toast.success("Login Successfull!!")
        setUser({
          email:"",username:"",password:""
        })
        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('username',res.data.username)
        const userDetails={
          username:res.data.username,github:res.data.userGit,linkdin:res.data.userLink,profile_pic:res.data.userPic
        }
        sessionStorage.setItem("userDetails",JSON.stringify(userDetails))
        setAuthStatus(true)
        navigate('/')
      }
      else{
        toast.error(res.response.data)
      }
    }
  }

  return (
    <>
      <div className='w-100 d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>

        <div className='w-50 border border-3 border-dark shadow p-2 row'>
          <div className="col">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png?f=webp" alt="auth"
              className='img-fluid' />
          </div>
          <div className="col">
            <h5 className='my-3'>
              {
                regStatus ?
                <span>Register</span>
                :
                <span>Login</span>
              }
            </h5>
            <div>
              <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control type="email" onChange={(e)=>{setUser({...user,email:e.target.value})}} value={user.email} placeholder="name@example.com" />
              </FloatingLabel>
              {
                regStatus &&
                <FloatingLabel controlId="floatingUser" label="Username" className="mb-3">
                  <Form.Control type="text" onChange={(e)=>{setUser({...user,username:e.target.value})}} value={user.username} placeholder="name" />
                </FloatingLabel>
              }

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" onChange={(e)=>{setUser({...user,password:e.target.value})}} value={user.password} placeholder="Password" />
              </FloatingLabel>
            </div>
            <div className='mt-4 d-flex justify-content-between'>
              {
                regStatus ?
                  <button className="btn btn-info" onClick={handleReg}>Register</button>
                  :
                  <button className='btn btn-success' onClick={handleLogin}>Login</button>

              }
              <button className='btn btn-link' onClick={statechng}>
                {
                  regStatus ?
                  <span>Already a user</span>:
                  <span>New User?</span>
                }
              </button>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default Auth