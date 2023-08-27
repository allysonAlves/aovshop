import React, { useEffect, useState } from 'react';
import { searchProducts } from '../Services/ProductsFirestoreService';
import Spinner from 'react-bootstrap/Spinner';

import './HomeStyle.css'
import ProductGrid from '../components/ProductGrid/ProductGrid';
import CardProduct from '../components/CardProduct/CardProduct';





function Home() {

  const [maisVendidos, setMaisVendidos] = useState([])
  const [novidades, setNovidades] = useState([])
  const [produtosFiltrados, setProdutosfiltrados] = useState([]);
  const produtosURL = import.meta.env.VITE_URL_PRODUTOS;
  

    useEffect(() =>{
     
      searchProducts("mais-vendidos").then(result =>{ 
        
        setMaisVendidos(result)
      })
      searchProducts("novidades").then(result => {
        setNovidades(result)
      })
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
        <hr/>
        <div className='mais-vendidos'>        
          <ProductGrid>
            {Object.values(maisVendidos).map(product => <CardProduct product={product} key={product?.id}/>) }
          </ProductGrid>
        </div>

        <img src='https://img.terabyteshop.com.br/banner/2303.jpg'/>
        <h3>NOVIDADES</h3>
        <hr/>
        <div className='mais-vendidos'>       
          <ProductGrid>
            {Object.values(novidades).map(product => <CardProduct product={product} key={product?.id}/>) }
          </ProductGrid>
        </div>
      </div>
    </div>
    
  )
}

export default Home