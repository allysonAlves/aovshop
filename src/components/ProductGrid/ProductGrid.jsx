import React from 'react'
import styles from './ProductGrid.module.css'
import { Spinner } from 'react-bootstrap'

const ProductGrid = ({children}) => {
  
  return (
    <div className={styles.produtosGrid}> 
    { children.length < 1 &&  
        <Spinner style={{alignSelf:'center', justifySelf:'center'}} animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>}  

     {children} 
    </div>
    
  )
}

export default ProductGrid