import React from 'react'
import ProdutoGrid from '../components/ProdutoGrid'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { FaBarcode, FaShareAlt } from 'react-icons/fa'
import { SiPix } from 'react-icons/si'
import { RxChevronUp, RxChevronDown} from 'react-icons/rx'

import './Produto.css'

function Produto() {

  const {id} = useParams()
 
  const [produto, setProduto] = useState(null)
  const [produtosFiltrados, setProdutosfiltrados] = useState([])
  const [produtos, setProdutos] = useState([])
  const [showParcelas, setShowParcelas] = useState(false)
  

  useEffect(() =>{
    const url_produtos = `https://allycadernodoserros-default-rtdb.firebaseio.com/loja/produtos.json`;
    fetch(url_produtos).then(res => res.json()).then(json => { 
        setProdutos(json); 
                  
     }); 
}
,[])

useEffect(() =>{
    setProduto(produtos[id]);
    document.title = produtos.length > 0 && produtos[id].descricao;
},[produtos,id])

const convert_moeda = (s) => s.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}); 
const getParcelas = () => {
  let items = [];
  for(var i = 1; i <= 12; i++)
  {
    items.push(<div className='parcela'> {i}x de {convert_moeda(produto.precoParcelado/i)} sem juros </div>)
  }
  return items;
}
const parcelasView = () =>
{

}

  return (
    <div className='produto-page'>
      <div className='outdoor'>
        <img className='outdoor-img' src='https://img.terabyteshop.com.br/banner/2138.jpg'></img>
      </div>      
      {produto &&
        <div className='produto'>
          <div className="produto-destaque">
            <div className="container-imagem">
             
              <div className="box-imagem">
                <img className='imagem-produto' src={produto.imagemProduto}/>
              </div>
              <div className="menu-imagens">
                <img className='imagem-option' src={produto.imagemProduto}/>
              </div>
            </div>
            <div className="container-compra">
              <div className="box-desconto-share">
                <div className="box-desconto">
                  <p>189 vendidos</p>
                </div>
                <div className="box-share">
                  <FaShareAlt/>
                </div>
              </div>
              <div className="classificacao">
                1º posição em placa mãe
              </div>
              <div className="produto-titulo">
                <h1>{produto.descricao}</h1>
              </div>
              <div className="marca-hating"></div>
              <div className="produto-disponivel">Produto Disponível</div>
              <div className="box-avista">
                <div className="box-icons">
                  <FaBarcode className='barcode-icon'/>
                  <SiPix className='pix-icon'/>
                </div>
                <div className="box-valor">
                  <p className='preco-total'>De: <s>{convert_moeda(produto.precoAnterior)}</s> por:</p>
                  <p className='preco-avista'>{convert_moeda(produto.precoAtual)}</p>
                  <p className='desconto-porcentagem'>à vista com 15% de desconto no boleto ou pix</p>
                </div>
              </div>
              <div className="box-valor-parcelado">
                <p className="valor-parcelado realce">
                  {convert_moeda(produto.precoParcelado)}
                </p>
                <p className="valor-da-parcela">
                  <span>em até </span>
                  <span className='realce'>12x</span>
                  <span> de </span>
                  <span className="realce">{convert_moeda(produto.precoParcelado)}</span>
                  <span> sem juros no cartão</span>
                </p>
                <div className="container-mais-parcelas">
                  <span onClick={() => setShowParcelas(!showParcelas)} className="box-titulo-mais-parcelas">
                    VER PARCELAMENTO  {!showParcelas? <RxChevronDown/>: <RxChevronUp/> }
                  </span>

                  {showParcelas && 
                    <div className="box-parcelas">
                    {getParcelas()}               
                    </div>             
                  }                  
                     
                         
                </div>
              </div>
              <button className="button-comprar">COMPRAR</button>

            </div>
          </div>
          
        </div>
      }
    </div>
    
  )
}

export default Produto