import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { getAllProjects } from '../services/allApis'

function Projects() {
  const [logStatus, setLogStatus] = useState(false)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLogStatus(true)
      getData()
    }
    else {
      setLogStatus(false)
    }
  }, [])


  const getData = async () => {
    const res = await getAllProjects()
    if (res.status == 200) {
      console.log(res.data)
      setProjects(res.data)
    }
    else {
      console.log(res)
    }

  }





  return (
    <>
      <Header />
      <h3 className='text-center'>All Projects</h3>

      {
        logStatus ?
          <div className='mt-3 p-5' style={{ height: '70vh' }}>
            {
              projects.length > 0 ?
                <div className='row justify-content-between'>
                  {projects.map(item => (
                    <ProjectCard project={item} />

                  ))}
                </div>
                :
                <h4 className='text-danger'>No Projects Available!!</h4>

            }
          </div>
          :
          <h4 className='text-warning'>Please Login First!! </h4>

      }



    </>
  )
}

export default Projects