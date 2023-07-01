import React, {useState, useEffect} from 'react'
import { useSearchParams, useOutletContext } from 'react-router-dom'
import { GetAllProducts } from '../../Services/ProductsService';
import { searchProducts, getProduct } from '../../Services/ProductsFirestoreService';
import { getUser } from '../../Services/UserFirestoreService';
import ProdutoGrid from '../../components/ProdutoGrid';

import './Search.css'

function Search() {

  const {user} = useOutletContext();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState([]);

  const searchProduct = () =>{

  }
  
  // const getProducts = async () => {
  //   const products = await GetAllProducts();
  //   console.log('SEARCH =>>',products);
  // }

  useEffect(() => {
    searchProducts(query).then(value => { setProducts(value)}).catch(err => console.log("teve erro"));
  },[query])
  
//getProducts()
  return (
    <div className='search-page'>
      <div className="page-limit">
        <ProdutoGrid produtos={products}/>
      </div>
    </div>
  )
}

export default Search