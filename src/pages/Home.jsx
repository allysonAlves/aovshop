import React from 'react'
import './HomeStyle.css'
import CardProduto from '../components/CardProduto'
import ProdutoGrid from '../components/ProdutoGrid';
import { useEffect, useState } from 'react';



function Home() {

  const [produtos, setProdutos] = useState([])
  const [produtosFiltrados, setProdutosfiltrados] = useState([]);
  const produtosURL = import.meta.env.VITE_URL_PRODUTOS;
    
    useEffect(() =>{
      const url_produtos = `${produtosURL}produtos.json`;
      fetch(url_produtos).then(res => res.json()).then(json => { 
        setProdutos(json);
      }); 
    }
    ,[])
    
    

  return (
    <div className='main'>
      <div className='outdoor'>
        <img className='outdoor-img' src='banner-oferta-abril.png'></img>
      </div>      
      <div className='content'>
        <div className='box-home-gamer'>
          <div>
              <img src='pcbranco.jpg'/>
              <p>Home Office</p>
          </div>
          <div>
              <img src='girlgamer.jpg'/>
              <p>Gamer</p>
          </div>
        </div>

        <h3>MAIS VENDIDOS</h3>
        <div className='mais-vendidos'>
          <ProdutoGrid produtos={produtos.filter(i => typeof i.promocoes == 'object'? i.categoria.includes("mais vendidos"): false)}/>
        </div>

        <img src='https://img.terabyteshop.com.br/banner/2303.jpg'/>
        <h3>NOVIDADES</h3>
        <div className='mais-vendidos'>
          <ProdutoGrid produtos={produtos.filter(i => typeof i.promocoes == 'object'? i.categoria.includes("novidades"): false)}/>
        </div>
      </div>
     
     
    
    </div>
    
  )
}

export default Home