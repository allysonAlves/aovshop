import React from 'react'
import './SidebarStyle.css'
import { Link , useNavigate } from "react-router-dom"
import { useState } from 'react'


const Sidebar = ({HideSidebar}) => {
  const [cate, setCate] = useState({
    hardware:{active:false,subs:["processadores","placa mãe","memórias"]},
    perifericos:{active:false,subs:["teclado","mouse","pen-drive"]},
    "video game":{active:false,subs:["consoles","joystick","jogos"]}
  });
  const navigate = useNavigate();

  function closeSidebar(){
    document.getElementById("sidebar").classList.remove("sb-show");
    setTimeout(() => {HideSidebar()},200)    
  }

  setTimeout(() => {
    document.getElementById("sidebar").classList.add("sb-show");
  },1);


  function categoriaShow(categoria)
  {    
    setCate( previousState => { return { ...previousState, [categoria]:{active: !cate[categoria].active, subs:cate[categoria].subs}} });
    
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
        <div className='sb-header'>
          <span className='sb-header-items'>
            CATEGORIAS 
          <button onClick={() => closeSidebar()} id='close'>x</button>
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