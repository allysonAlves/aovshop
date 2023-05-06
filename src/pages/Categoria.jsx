import React from 'react'
import { useParams, useSearchParams } from "react-router-dom";
import './Categoria.css'
import ProdutoGrid from '../components/ProdutoGrid';
import { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa' 
import { Link } from 'react-router-dom';


const Categoria = () => {
    const {id} = useParams()
    const [seachParams] = useSearchParams();
    const query = seachParams.get("sub");
    const [produtos, setProdutos] = useState([])
    const [produtosFiltrados, setProdutosfiltrados] = useState([]);

    
    useEffect(() =>{
        const url_produtos = `https://allycadernodoserros-default-rtdb.firebaseio.com/loja/produtos.json`;
        fetch(url_produtos).then(res => res.json()).then(json => { 
            setProdutos(json); 
                      
         }); 
    }
    ,[])

    useEffect(() =>{
        const sec = produtos.filter(produto => query? [id,query].every(categoria => produto.categoria.includes(categoria)): produto.categoria.includes(id));
         setProdutosfiltrados(sec);
    },[produtos,query,id])
 
  return (
    <div className='categoria'>        
        <div className="categoria-limite">
        <img src='https://img.terabyteshop.com.br/banner/1922.jpg' className='out'></img>
            <div className='menu-filters-options'>
               <div className='div-links-categorias'>
                    <Link to={`/categoria/${id}`} className='link-categoria'>{id.toUpperCase()}</Link>
                    <FaAngleRight/>
                    { query && <Link to={`/categoria/${id}?sub=${query}`} className='link-categoria'>{query.toUpperCase()}</Link> }
                </div>
               {/* {// <select>
                    <option value="select" selected>Ordenar por</option>
                    <option value="menor-valor">Menor valor</option>
                    <option value="maior-valor">Maior valor</option>
                </select>} */}
            </div>            
            <ProdutoGrid categoria={id} sub={query} produtos={produtosFiltrados}/>
        </div>
    
    </div>
  )
}

export default Categoria