import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Main from './components/Main.jsx'
import NavBar from './components/NavBar'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavBar />
    <Main />
  </React.StrictMode>,
)
