import {BrowserRouter, Routes, Route} from "react-router-dom"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import Home from './pages/Home'
import Produto from './pages/Produto'
import Search from './pages/Search'
import Categoria from "./pages/Categoria"
import Login from "./pages/Login.jsx"

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='produto/:id' element={<Produto/>}/>
          <Route path='search' element={<Search/>}/>
          <Route path='categoria/:id' element={<Categoria/>}/>
          <Route path='login' element={<Login/>}/>
        </Route>        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
