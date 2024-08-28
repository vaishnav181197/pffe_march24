import React,{createContext,useState} from 'react'


export const authContext=createContext()

function AuthContext({children}) {

    const [authStatus,setAuthStatus]=useState(false)

  return (
    <>
    <authContext.Provider value={{authStatus,setAuthStatus}}>
        {children}
    </authContext.Provider>
    </>
  )
}

export default AuthContext