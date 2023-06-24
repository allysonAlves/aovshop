import React from 'react'
import CardProduto from '../components/CardProduto'
import { useState, useEffect } from "react";

import './ProdutoGridStyle.css'

const ProdutoGrid = ({categoria , sub, produtos}) => {
  
  const [categorias, setCategorias] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  useEffect(() => {
    setCategorias([categoria,sub]);
  }, []);

  useEffect(() => {
    
  }, [categorias]);

  return (
    <div className='produtos-grid'>        
        {produtos ? 
          produtos.map(produto => <CardProduto produto={produto} key={produto.id}/>) :
          <div className='div-sem-produtos'>Nenhum produto localizado</div>
        } 
    </div>
    
  )
}

export default ProdutoGrid