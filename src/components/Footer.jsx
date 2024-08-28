import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className='bg-primary p-3'>
        <div className='row'>
          <div className="col">
            <h4>Project Fair 2024</h4>
            <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aliquid debitis similique soluta voluptate facilis. Non pariatur ipsa incidunt enim sit earum, unde autem corrupti dolorum, fugiat amet libero consequuntur?</p>
          </div>
          <div className="col d-flex flex-column align-items-center">
            <h4>Links</h4>
            <p><Link to={'/'} className='text-dark'>Landing</Link></p>
            <p><Link to={'/auth'} className='text-dark'>Login</Link></p>
          </div>
          <div className="col">
            <h4>Feedback</h4>
            <textarea name="" className='form-control my-3' id=""></textarea>
            <button className="btn btn-success">Submit</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer