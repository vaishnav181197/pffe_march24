import './App.css'
import './bootstrap.min.css'
import Land from './pages/Land'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import { Route,Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { authContext } from './Context_Api/AuthContext'
import { useContext } from 'react'

function App() {

  const {authStatus,setAuthStatus}=useContext(authContext)

  return (
    <>
     <Routes>
      <Route path='/' element={<Land/>}/>
      <Route path='/dash' element={authStatus?<Dashboard/>:<Auth/>}/>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/allprojects' element={authStatus?<Projects/>:<Auth/>}/>
     </Routes>
     <Footer/>
     <ToastContainer/>
    </>
  )
}

export default App
