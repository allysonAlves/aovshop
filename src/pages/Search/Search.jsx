import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import { GetAllProducts } from '../../Services/ProductsService';
import { searchProducts, getProduct } from '../../Services/ProductsFirestoreService';



import './Search.css'
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import CardProduct from '../../components/CardProduct/CardProduct';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [products, setProducts] = useState([]);
  const [noResults, setNoResults] = useState(false);

 

  useEffect(() => {
    searchProducts(query).then(value => { setProducts(value);  setNoResults(Object.keys(value).length < 1) }).catch(err => console.log("teve erro"));
  },[query])
  
//getProducts()
  return (
    <div className='search-page'>
      <div className="page-limit">
        {
          !noResults ?
            <ProductGrid>
              {Object.values(products).map(product => <CardProduct product={product} key={product?.id}/>) }            
            </ProductGrid>:
            <div style={{width:'100%', textAlign:'center'}}>
             Nenhum produto encontrado
            </div>
        }
      </div>
    </div>
  )
}

export default Search