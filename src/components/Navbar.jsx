import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import {BiCameraMovie, BiSearchAlt2} from "react-icons/bi"
import {RxHamburgerMenu} from "react-icons/rx"
import {FaShoppingCart} from "react-icons/fa"
import {RiInstagramFill,RiTwitterFill, RiFacebookFill, RiYoutubeFill} from "react-icons/ri"
import { useState } from "react"
import Logo from '../assets/logo.png';

import Sidebar from './Sidebar'
import './NavbarStyle.css'

function Navbar({ShowSidebar}) {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!search) return

        navigate(`/search?q=${search}&page=1`);
        setSearch("");
    };

    function OpenSideBar(){

        ShowSidebar();
       
    }

  return (
    <nav>
        
        <div className='box-redes-sociais'>
            <a><RiFacebookFill/></a>
            <a><RiTwitterFill/></a>
            <a><RiInstagramFill/></a>
            <a><RiYoutubeFill/></a>            
        </div>
        <div id="navbar"> 
            <span onClick={OpenSideBar} ><RxHamburgerMenu className='btn-menu-lateral orangehover'/></span>
            
            
            <Link className='logo' to="/">
                <img src={Logo}/> Aov Shop
            </Link>
            
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Pesquise o seu produto" 
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <button type="submit">
                    <BiSearchAlt2/>
                </button>            

            </form>

            <div className='div-btn-gologin orangehover'>
                <Link to="/login" className='orangehover'>
                    Fazer Login
                </Link>
            </div>

            <Link className='cart-btn' to="/">
                <div id='itens-carrinho'>3</div>
                <FaShoppingCart className='orangehover' id='icon-carrinho'/>
            </Link>
            
            
        </div>
    </nav>
  )
}

export default Navbar