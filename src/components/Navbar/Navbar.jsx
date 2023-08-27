import React,{useContext, useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import {BiSearchAlt2} from "react-icons/bi"
import {RiInstagramFill,RiTwitterFill, RiFacebookFill, RiYoutubeFill} from "react-icons/ri"
import {RxHamburgerMenu} from "react-icons/rx"
import {FaShoppingCart} from "react-icons/fa"
//react /\ ----------------------------------------------------------------------------------
//bootstrap \/-------------------------------------------------------------------------------
import { Badge, Button, Form, InputGroup } from 'react-bootstrap'

//services \/ -------------------------------------------------------------------------------
import { OnSignOut } from '../../Services/FirebaseAuthService'

//MyComponents \/ ---------------------------------------------------------------------------
import ButtonMyAccount from './ButtonMyAccount'
import SideBar from '../SideBar/SideBar'

//assets -----------------------------------------------------------------------------------
import Logo from '../../assets/logo.png';

//styles -----------------------------------------------------------------------------------
import styles from './Navbar.module.css'
import './Navbar.css'
import { CartContext } from '../../commom/context/CartProvider'



function Navbar() { 
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();       
        if(!e?.target[0]?.value) return

        navigate(`/search?q=${e.target[0].value}&page=1`);
        
    };

    
  return (
    <nav className='bg-aov-dark-0'>
        
        <div className={styles.box_sociais}>
            <a><RiFacebookFill size={22}/></a>
            <a><RiTwitterFill size={22}/></a>
            <a><RiInstagramFill size={22}/></a>
            <a><RiYoutubeFill size={22}/></a>            
        </div>
        <div style={{width:'100%', height:0.1, backgroundColor:'#333', marginTop:5, marginBottom:5}}></div>
        <div className={styles.navbar}>
            <SideBar>
                <RxHamburgerMenu size={28} className={styles.hamburger_btn}/>
            </SideBar>             
            
            
            <Link className={styles.logo} to="/">
                <img src={Logo}/> Aov Shop
            </Link>
            
            <form className={styles.form_search} onSubmit={handleSubmit}>
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
            <div className={styles.div_account}>
                <ButtonMyAccount/>
            </div>
           
            <Link className={styles.cart_btn} to="/cart">                
                <FaShoppingCart size={25}/>
                <Badge 
                style={{top:-5, right:-15, fontSize:12}}
                className='position-absolute' 
                bg='danger'>
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