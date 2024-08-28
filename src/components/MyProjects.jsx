import React, { useEffect, useState, useContext } from 'react'
import Add from './Add'
import Edit from './Edit'
import { getUserProjectsApi, deleteProjectApi } from '../services/allApis'
import { addResponseContext,editResponseContext } from '../Context_Api/ContextShare'
import { toast } from 'react-toastify'

function MyProjects() {
    const [userProjects, setUserProjects] = useState([])
    const { addResponse, setAddResponse } = useContext(addResponseContext)
    const {editResponse,setEditResponse}=useContext(editResponseContext)

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            getData()
        }
    }, [addResponse,editResponse])

    const getData = async () => {
        const header = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }
        const res = await getUserProjectsApi(header)
        if (res.status == 200) {
            console.log(res.data)
            setUserProjects(res.data)
        }
        else {
            console.log(res)
        }
    }

    const deleteProject = async (id) => {
        const header = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }

        const result=await deleteProjectApi(id,header)
        if(result.status==200){
            toast.success(result.data)
            getData()
        }
        else{
            console.log(result)
            toast.error("Deletion Failed!!")
        }
    }

    return (
        <>
            <div>
                <Add />
                <div className='mt-4'>

                    {userProjects.length > 0 ?
                        <div>
                            {userProjects.map(item => (
                                <div className='d-flex justify-content-between border shadow bg-light p-3 rounded mb-3'>
                                    <h5>{item.title}</h5>
                                    <div>
                                        <a href={item.github} target='_blank' className='btn p-1 border border-dark me-3'>
                                            <i className="fa-brands fa-github fa-2xl"></i>
                                        </a>
                                        <Edit project={item} />
                                        <button className="btn p-1 border me-3 border-dark" onClick={()=>{deleteProject(item._id)}}>
                                            <i className="fa-solid fa-trash fa-2xl" style={{ color: "#f5051d", }} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <h4 className='text-center my-5'>No Projects Added Yet!!!!</h4>

                    }



                </div>
            </div>
        </>
    )
}

export default MyProjects