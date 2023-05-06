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
    <div className='produtos'>
        {produtos.length == 0 && <div className='div-sem-produtos'>Nenhum produto localizado</div>}
        {produtos && produtos.map(produto => <CardProduto produto={produto} key={produto.id}/>)} 
    </div>
    
  )
}

export default ProdutoGrid