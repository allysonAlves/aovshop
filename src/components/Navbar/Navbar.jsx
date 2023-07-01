import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import {BiCameraMovie, BiSearchAlt2} from "react-icons/bi"
import {RxHamburgerMenu} from "react-icons/rx"
import {FaShoppingCart} from "react-icons/fa"
import {RiInstagramFill,RiTwitterFill, RiFacebookFill, RiYoutubeFill} from "react-icons/ri"
import { useState } from "react"
import Logo from '../../assets/logo.png';
import { OnSignOut } from '../../Services/FirebaseAuthService'



import Sidebar from '../Sidebar'
import './Navbar.css'
import ModalConfirm from '../Modal/ModalConfirm'
import { Badge, Button, Form, InputGroup } from 'react-bootstrap'
import ButtonMyAccount from './ButtonMyAccount'
import SideBar from '../SideBar/SideBar'

function Navbar({ShowSidebar,user, cart}) {    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();       
        if(!e?.target[0]?.value) return

        navigate(`/search?q=${e.target[0].value}&page=1`);
        
    };

  return (
    <nav className='bg-aov-dark-0'>
        
        <div className='box-redes-sociais'>
            <a><RiFacebookFill/></a>
            <a><RiTwitterFill/></a>
            <a><RiInstagramFill/></a>
            <a><RiYoutubeFill/></a>            
        </div>
        <div style={{width:'100%', height:0.1, backgroundColor:'#333', marginTop:5, marginBottom:5}}></div>
        <div id="navbar">
            <SideBar user={user}>
                <RxHamburgerMenu className='btn-menu-lateral orangehover'/>
            </SideBar>             
            
            
            <Link className='logo' to="/">
                <img src={Logo}/> Aov Shop
            </Link>
            
            <form className='form-search' onSubmit={handleSubmit}>
                <InputGroup>
                    <Form.Control
                        placeholder="pesquise o seu produto"
                        aria-label="Buscar produto"
                        aria-describedby="basic-addon2"                
                    />
                    <Button className='border' type='submit' variant="outline-secundary" id="button-addon2">
                        <BiSearchAlt2/>
                    </Button>
                </InputGroup>    
            </form>
            <div className='div-btn-gologin'>
                <ButtonMyAccount className='btn-go-login' user={user}/>
            </div>
           
            <Link className='cart-btn orangehover' to="/cart">                
                <FaShoppingCart size={25} id='icon-carrinho'/>
                <Badge className='cart-badge' bg='danger'>
                    {
                        Object.keys(cart)?.length > 0 ? Object.keys(cart)?.length
                        :
                        ''
                    }
                </Badge>
                <span className='visually-hidden'>unread messages</span>
            </Link>
            
            
        </div>
    </nav>
  )
}

export default Navbar