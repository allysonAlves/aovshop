import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import {BsArrowBarLeft} from 'react-icons/bs'
import { RiUser3Line, RiAccountBoxFill, RiCoupon3Fill, RiLogoutCircleLine, RiLoginCircleLine } from 'react-icons/ri'
import { MdEditNote } from 'react-icons/md'
import './SidebarStyle.css'
import { Link , useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'



const Sidebar = ({HideSidebar, user, signOut}) => {
  const [cate, setCate] = useState({
    hardware:{active:false,subs:["processadores","placa mãe","memórias"]},
    periféricos:{active:false,subs:["teclado","mouse","pen-drive"]},
    "video game":{active:false,subs:["consoles","joystick","jogos"]}
  });
  const navigate = useNavigate();

  function closeSidebar(action){
    document.getElementById("sidebar").classList.remove("sb-show");
    setTimeout(() => {
      HideSidebar();
      if(action) action();
    },200)    
  }

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("sidebar").classList.add("sb-show");
    },50);   
  },[]);
  


  function categoriaShow(categoria)
  { 
    let cast = cate;
    for(let item in cast)
    {
      let current = cast[item];
      let active = categoria == item? !current.active : false;
     
      setCate( previsousState => { return {...previsousState, [item] : {active:active, subs:cast[item].subs}} });
    } 
  } 

  function goTo(categoria, sub)
  {
    closeSidebar();
    setTimeout(() => {
      let subcategoria = sub && `?sub=${sub}`;
      navigate(`/categoria/${categoria}${subcategoria}`);
    },200)    
  }
  function capitalize(text)
  {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }


  return (
    <div id='sb-component'>
      <div id='sidebar-bg' onClick={() => closeSidebar()}>
      </div>

      <div id='sidebar' className=' sidebar'>
        <div></div>
        <button onClick={() => closeSidebar()} id='close'><BsArrowBarLeft/></button>
        
        {user? 
          <div className='user-nav'>
              <div className='user-profile'>              
                <div className='div-user-image'>
                  {user?.photoURL ?
                    <img 
                      className='user-image' 
                      src={
                        user?.photoURL
                      }
                    /> :
                    <RiUser3Line size={30} color='#666'/>                 
                  }

                </div>
                <div className='user-data'>
                  <p>{user?.displayName}</p>
                  <p>{user?.email}</p>
                </div>
              </div>
              <div className='user-nav-btns'>
                <Link  onClick={() => closeSidebar(() => navigate('/account'))}>
                  <div className='nav-btn-icon'><RiAccountBoxFill/></div>
                  <div className='nav-btn-text'>Minha Conta</div>                
                </Link>
                <Link  onClick={() => closeSidebar(() => navigate('/account/orders'))}>
                  <div className='nav-btn-icon'><MdEditNote/></div>
                  <div className='nav-btn-text'>Pedidos</div>                
                </Link>
                <Link>
                  <div className='nav-btn-icon'><RiCoupon3Fill/></div>
                  <div className='nav-btn-text'>Cupons</div>                
                </Link>
                <Link onClick={() => signOut()}>
                  <div className='nav-btn-icon'><RiLogoutCircleLine/></div>
                  <div className='nav-btn-text'>Sair</div>                
                </Link>
              </div>
          </div> 
          :
          <div className='user-nav login'>
              <div className='user-nav-btns'>
                <Link onClick={() => closeSidebar(() => navigate('/login'))}>
                  <div className='nav-btn-icon'><RiLoginCircleLine/></div>
                  <div className='nav-btn-text'>Login</div>                
                </Link>
              </div>
          </div>        
        }

        <div className='sb-header'>
          <span className='sb-header-items'>
            CATEGORIAS           
          </span>
        </div>

        <div className='opcoes' >
         {Object.keys(cate).map((item, i) => 
         (
            <li key={i} className={ cate[item].active ? "categoria-selected":""}>
              <span className="ct-name" onClick={() => {categoriaShow(item)}}>{capitalize(item)}</span>
              {
                cate[item].active 
                && cate[item].subs.map((sub) => 
                (
                  <div key={sub}
                    className="sub-categoria" 
                    onClick={() => goTo(item,sub)}>
                    {capitalize(sub)}
                  </div>)
              )}
            </li>
          ))}

          

        </div>
    
      </div>
      
    </div>
  )
}

export default Sidebar