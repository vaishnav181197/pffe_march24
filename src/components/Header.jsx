import React,{useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../Context_Api/AuthContext';

function Header({btn}) {

  const {authStatus,setAuthStatus}=useContext(authContext)

  const nav=useNavigate()

  const lgOut=()=>{
    nav('/auth')
    setAuthStatus(false)
    sessionStorage.clear()
  }

  return (
    <>
      <Navbar className="bg-success">
        <Container>
          <Navbar.Brand href="#home">
          <i className="fa-solid fa-diagram-project fa-lg"  style={{color: "#FFD43B",}} />{' '}
            Project Fair
          </Navbar.Brand>
        </Container>
        {
          btn &&
          <button className='btn btn-danger me-3' onClick={lgOut}>LogOut</button>
        }
      </Navbar>
    </>
  )
}

export default Header