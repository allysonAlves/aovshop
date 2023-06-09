import React, {useEffect, useState} from 'react'
import './CardProdutoStyle.css'
import { Link, useOutletContext, useNavigate } from "react-router-dom"
import { IoMdRemove, IoMdAdd } from 'react-icons/io'
import Produto from '../pages/Produto';

function CardProduto({produto}) {
    
  const convert_moeda = (s) => s.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}); 
  const {cart, setCart} = useOutletContext();   
  const navigate = useNavigate();

  

  const addToCart = () => {   
    setCart(previous => {      
      let amountInCart = cart[produto.id] ? cart[produto.id]?.amount + 1 : 1;
      let productToCart = {...produto, amount: amountInCart};
      //console.log("[ amount ==>>]", amountInCart," [product =>>]", productToCart)
      return {...previous, [produto.id]: productToCart}
    });
          
  }

  const removeCart = () => {
    if(cart[produto.id]?.amount <= 1)
    {
      let objeto = {};
      Object.keys(cart).forEach(element => {
        if(element != produto.id){
          objeto[element] = cart[element]          
        } 
      })
      setCart(objeto);
      
    }else{
      let currentProduct = cart[produto.id];
      currentProduct.amount--;      
      setCart(previous => {return {...previous, [produto.id]: currentProduct}})
    }

  }
  
  return (
    <div className='aov-card' key={produto.id}>
        
        <div className="box-imagem" title={/*produto.descricao*/ produto?.name}>
        <Link to={`/produto/${produto.id}`}> <img src={produto?.images[0]}/></Link>
        </div>
        
        <div className='informacoes-produto'>
            <p className="descricao" title={produto?.name}>
                {produto?.name}
            </p>
            <div className="preco-anterior"> De <s>{convert_moeda(produto.price)}</s> por:</div>
            <div className="preco-atual">{convert_moeda(produto.price * (1 - (produto.sale/100)))} à vista</div>
            <div className="preco-parcelado">12x de { convert_moeda((produto.price * (1 - (10/100)))/12)} sem juros</div>
            {
              cart[produto.id] ?
              <div>
                <div className='btn-bottom btn-onCart'>
                  <button onClick={() => removeCart()}><IoMdRemove/></button>
                  <span>{cart[produto.id]?.amount}</span>
                  <button onClick={() => {addToCart()}}><IoMdAdd/></button>
                </div>
              </div>
              :
              <button className='btn-bottom btn-add' onClick={() => {addToCart()}}>ADICIONAR AO CARRINHO</button>
            }
        </div>
    </div>
  )
}

export default CardProduto