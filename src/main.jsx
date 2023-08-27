import {BrowserRouter, Routes, Route} from "react-router-dom"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import Home from './pages/Home'
import Produto from './pages/Produto'
import Search from "./pages/Search/Search.jsx"
import Categoria from "./pages/Categoria"
import Login from "./pages/Login/Login.jsx"
import Cadastro from "./pages/Login/Cadastro.jsx"
import Account from "./pages/account/Account.jsx"
import Orders from "./pages/account/Orders.jsx"
import Cart from "./pages/Cart/Cart.jsx"

import './index.css'
import AuthProvider from "./commom/context/AuthProvider.jsx"
import EditAccount from "./pages/account/edit/EditAccount.jsx"

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
            <Route path='singin' element={<Cadastro/>}/>
            <Route path='account' element={<Account/>}/>
            <Route path='account/orders' element={<Orders/>}/>
            <Route path='account/edit' element={<EditAccount/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Route>        
        </Routes>
      </BrowserRouter>    
  </React.StrictMode>,
)
