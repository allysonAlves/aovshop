import React from 'react'
import CardProduto from '../components/CardProduto'
import { useState, useEffect } from "react";

import './ProdutoGridStyle.css'
import CardProduct from './CardProduct/CardProduct';

const ProdutoGrid = ({produtos}) => {
  
  const [categorias, setCategorias] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <div className='produtos-grid'>        
        {produtos ? 
         Object.values(produtos).map(produto => <CardProduto produto={produto} key={produto?.id}/>) :
          <div className='div-sem-produtos'>Nenhum produto localizado</div>
        } 
    </div>
    
  )
}

export default ProdutoGrid