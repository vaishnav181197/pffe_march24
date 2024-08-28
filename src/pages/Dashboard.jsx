import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import MyProjects from '../components/MyProjects'
import Profile from '../components/Profile'

function Dashboard() {

  const [username, setUsername] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem('username')){
      setUsername(sessionStorage.getItem('username'))
    }
}, [])

return (
  <>
    <Header btn={true}/>
    <h2>Welcome <span className='text-warning'>{username}</span></h2>
    <div className='row p-5 justify-content-between'>
      <div className="col-lg-7 p-3 border border-dark shadow">
        <h3>My Projects</h3>
        <MyProjects />
      </div>
      <div className="col-lg-4 p-2 border border-dark shadow">
        <Profile />
      </div>

    </div>
  </>
)
}

export default Dashboard