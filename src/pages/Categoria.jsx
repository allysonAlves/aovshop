import React from 'react'
import { useParams, useSearchParams } from "react-router-dom";
import './Categoria.css'
import { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa' 
import { Link } from 'react-router-dom';
import { searchProducts, searchProductsCategory} from '../Services/ProductsFirestoreService';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import CardProduct from '../components/CardProduct/CardProduct';


const Categoria = () => {
    const produtosURL = import.meta.env.VITE_URL_PRODUTOS;
    const {id : category} = useParams()
    const [seachParams] = useSearchParams();
    const querySub = seachParams.get("sub");
    const queryMarca = seachParams.get("m");
    const [products, setProducts] = useState([])
    const [noResults, setNoResults] = useState(false);

    
    useEffect(() =>{       
       searchProductsCategory(category,querySub,queryMarca).then(res => { if(Object.values(res).length > 0){ setProducts(res); setNoResults(false)}else{setNoResults(true)} })
    }
    ,[category,querySub,queryMarca])   
 
  return (
    <div className='categoria'>        
        <div className="categoria-limite">
            <img src='https://img.terabyteshop.com.br/banner/1922.jpg' className='out'></img>
            <div className='menu-filters-options'>
                <div className='div-links-categorias'>
                    <Link to={`/categoria/${category}`} className='link-categoria'>{category.toUpperCase()}</Link>
                    
                    { querySub && 
                        <>
                        <FaAngleRight/>
                        <Link to={`/categoria/${category}?sub=${querySub}`} className='link-categoria'>{querySub.toUpperCase()}</Link>                        
                        </>
                    }

                    { queryMarca && 
                        <>
                        <FaAngleRight/>
                        <Link to={`/categoria/${category}?sub=${querySub}&m=${queryMarca}`} className='link-categoria'>{queryMarca.toUpperCase()}</Link>                        
                        </>
                    }

                </div>
                {/* { <select>
                    <option value="select" selected>Ordenar por</option>
                    <option value="menor-valor">Menor valor</option>
                    <option value="maior-valor">Maior valor</option>
                </select>} */}
            </div>
            {!noResults?
                <ProductGrid>
                    {Object.values(products).map(product => <CardProduct product={product} key={product?.id}/>) }
                </ProductGrid> :
                <div style={{width:'100%', textAlign:'center'}}>
                Nenhum produto encontrado
               </div>            
            }            
        </div>
    
    </div>
  )
}

export default Categoria