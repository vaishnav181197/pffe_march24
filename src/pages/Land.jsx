import { useEffect, useState } from 'react'
import React from 'react'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { getAllProjects } from '../services/allApis'

function Land() {
    const [logStatus, setLogStatus] = useState(false)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        getData()
        if (sessionStorage.getItem('token')) {
            setLogStatus(true)
        }
        else {
            setLogStatus(false)
        }
    }, [])

    const getData = async () => {
        const res = await getAllProjects()
        console.log((res));

        if (res.status = 200) {
            setProjects(res.data.slice(0, 3))
        }
        else {
            console.log(res)
        }
    }


    return (
        <>

            <div className='bg-info row p-3' style={{ height: '100vh' }}>
                <div className="col-sm-12 col-md-6 d-flex flex-column justify-content-center">
                    <h1>
                        <i className="fa-solid fa-diagram-project fa-bounce fa-2xl" style={{ color: "#FFD43B", }} />{' '}
                        Project Fair
                    </h1>
                    <p className='text-light mt-4' style={{ textAlign: 'justify' }}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, hic, aut ullam sequi illum, officiis quae consectetur accusantium odit natus praesentium nesciunt tenetur eligendi incidunt dolores! Minus in fuga vitae!
                    </p>
                    {
                        logStatus ?
                            <Link className='btn btn-warning' to={'/dash'}>Go To Dashboard</Link>
                            :
                            <Link className='btn btn-success' to={'/auth'}>Start to Explore..</Link>
                    }
                </div>
                <div className="col-sm-12 col-md-6 d-flex flex-column justify-content-center">
                    <img src="https://img.freepik.com/free-vector/ui-ux-designers-isometric-composition-with-small-people-creating-custom-design-web-site-3d-vector-illustration_1284-68939.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1722038400&semt=ais_user" alt="landingimg"
                        className='w-100' />
                </div>
            </div>

            <div className='mt-5'>
                <h3 className='text-center'>Sample Projects...</h3>

                <marquee behavior="" direction="">
                    {
                        projects.length > 0 ?
                            <div className='d-flex justify-content-around'>
                                {projects.map(item=>(
                                    <ProjectCard project={item}/>
                                ))}
                            </div>
                            :
                            <h6>No Projects Available!!</h6>

                    }

                </marquee>

                <p className='text-center'><Link to={'/allprojects'}>View more..</Link></p>

            </div>

        </>
    )
}

export default Land