import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './Context_Api/ContextShare.jsx'
import AuthContext from './Context_Api/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext>
      <ContextShare>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextShare>
    </AuthContext>
  </React.StrictMode>,
)
