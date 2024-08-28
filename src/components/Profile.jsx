import React, { useState,useEffect } from 'react'
import base_url from '../services/base_url'
import { toast } from 'react-toastify'
import { updateProfileApi } from '../services/allApis'
import { useNavigate } from 'react-router-dom'


function Profile() {
    const [profState, setProfState] = useState(false)
    const [profile,setProfile]=useState({
        username:"",github:"",linkdin:"",profile_pic:""
    })
    const [pic,setPic]=useState("")
    const [preview,setPreview]=useState("")
    const nav=useNavigate()

    useEffect(()=>{
        const profiledata=JSON.parse(sessionStorage.getItem('userDetails'))
        if(sessionStorage.getItem('token')){
            console.log(profiledata)
            setProfile(profiledata)
        }
        if(pic){
            setPreview(URL.createObjectURL(pic))
            setProfile({...profile})
        }
       
    },[pic])

    const handleProfileupdate=async()=>{
        console.log(profile)
        const {username,github,linkdin}=profile
        if(!username || !github || !linkdin){
            toast.warning("Enter Valid Inputs!!")
        }
        else{
            if(pic){
                const formdata=new FormData()
                formdata.append("username",username)
                formdata.append("github",github)
                formdata.append("linkdin",linkdin)
                formdata.append("profile_pic",pic)

                const header={
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${sessionStorage.getItem('token')}`
                }

                const res=await updateProfileApi(formdata,header)
                console.log(res)
                if(res.status==200){
                    toast.success("Profile Updation Successfull!!")
                    toggle()
                    nav('/auth')

                }
                else{
                    toast.error("Updation Failed!!")
                }
            }
            else{

                const header={
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${sessionStorage.getItem('token')}`
                }
                const res=await updateProfileApi(profile,header)
                if(res.status==200){
                    toast.success("Profile Updation Successfull!!")
                    toggle()
                    nav('/auth')
                }
                else{
                    toast.error("Updation Failed!!")
                }



            }
        }
    }



    // console.log(profile)
    const toggle = () => {
        setProfState(!profState)
    }
    return (
        <>
            <div>
                <div className='d-flex justify-content-between'>
                    <h4>Profile</h4>
                    <button onClick={toggle} className='btn btn-light'>
                        {profState ?
                            <i className="fa-solid fa-angle-up" />
                            :
                            <i className="fa-solid fa-angle-down" />
                        }
                    </button>
                </div>
                <div style={profState ? { display: 'block' } : { display: 'none' }}>
                    <label htmlFor="pro" className='d-flex justify-content-center'>
                        <input type="file" id='pro' style={{ display: 'none' }} onChange={(e)=>{setPic(e.target.files[0])}} />
                        <img src={preview?preview:profile.profile_pic?`${base_url}/upload/${profile.profile_pic}`:"https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"}
                            alt="profilepic" className='img-fluid'/>
                    </label>
                    <input type="text" name="" placeholder='Username' value={profile.username} onChange={(e)=>{setProfile({...profile,username:e.target.value})}} id="" className="form-control my-3" />
                    <input type="text" name="" placeholder='Github Link' value={profile.github} onChange={(e)=>{setProfile({...profile,github:e.target.value})}} id="" className="form-control my-3" />
                    <input type="text" name="" placeholder='LinkdIn Link' id="" value={profile.linkdin} onChange={(e)=>{setProfile({...profile,linkdin:e.target.value})}} className="form-control my-3" />
                    <button className="btn btn-success" onClick={handleProfileupdate}>Update</button>
                </div>
            </div>
        </>
    )
}

export default Profile