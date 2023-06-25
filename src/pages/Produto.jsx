import React from 'react'
import ProdutoGrid from '../components/ProdutoGrid'
import { useState, useEffect } from "react";
import { useParams, Link, useOutletContext, useNavigate } from "react-router-dom";

import { FaBarcode, FaShareAlt, FaAngleRight } from 'react-icons/fa'
import { SiPix } from 'react-icons/si'
import { RxChevronUp, RxChevronDown} from 'react-icons/rx'
import{ BsCreditCard } from 'react-icons/bs'

import './Produto.css'

function Produto() {

  const produtosURL = import.meta.env.VITE_URL_PRODUTOS;
  const {id} = useParams()
  const { cart , setCart } = useOutletContext();
  const [produto, setProduto] = useState(null)
  const [produtosFiltrados, setProdutosfiltrados] = useState([])
  const [produtos, setProdutos] = useState([])
  const [showParcelas, setShowParcelas] = useState(false)
  const navigate = useNavigate();

  
  
  function obterProdutosFiltrados(){
    let filtrados = produtos.filter(f => f.id != produto.id);
    filtrados.sort(compareFn);
    return filtrados;
  }

  useEffect(() =>{
    const url_produtos = `${produtosURL}produtos.json`;
    fetch(url_produtos).then(res => res.json()).then(json => { 
        setProdutos(json); 
                  
     }); 
}
,[])

useEffect(() =>{
    setProduto(produtos[id]);
    if(!produto) return;
    document.title = produtos.length > 0 && produtos[id].descricao;

},[produtos, id])

function compareFn(a, b) {
  let aCompare = 0;
  let bCompare = 0;
  for(const cat of produto.categoria)
  {
    if(a.categoria.includes(cat)){ aCompare++ }
    if(b.categoria.includes(cat)){ bCompare++ }
   
  }

  if (aCompare > bCompare) {
    return -1;
  }
  if (aCompare < bCompare) {
    return 1;
  }

  return 0;
}

const convert_moeda = (s) => s.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}); 
const getParcelas = () => {
  let items = [];
  for(var i = 1; i <= 12; i++)
  {
    items.push(<div className='parcela'> {i}x de {convert_moeda(produto.precoParcelado/i)} sem juros </div>)
  }
  return items;
}
const share = async () =>
{
  try{
    await navigator.share({
      title: produto.descricao,
      text: '',
      url: location.href,
    });
  } 
  catch{

  }
}

  const addToCart = () => {
    setCart(previous => {      
      let amountInCart = cart[produto.id] ? cart[produto.id]?.amount + 1 : 1;
      let productToCart = {...produto, amount: amountInCart};
      //console.log("[ amount ==>>]", amountInCart," [product =>>]", productToCart)
      return {...previous, [produto.id]: productToCart}
    });

    navigate('/cart')
    
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
                  <p>{Math.trunc( 100/(produto.precoAnterior/produto.precoAtual)-100)}% </p>
                </div>
                <div className="box-desconto">
                  <p>312</p>
                </div>
                <div className="box-share">
                  <FaShareAlt onClick={share}/>
                </div>
              </div>
              <div className="classificacao">
               {produto?.categoria &&
                  <div className='div-links-categorias'>
                  
                    <Link to={`/categoria/${produto.categoria[0]}`} className='link-categoria'>{produto.categoria[0].toUpperCase()}</Link>
                    <FaAngleRight/>  
                    <Link to={`/categoria/${produto.categoria[0]}?sub=${produto.categoria[1]}`} className='link-categoria'>{produto.categoria[1].toUpperCase()}</Link>
                    <FaAngleRight/>  
                    <Link to={`/categoria/${produto.categoria[0]}?sub=${produto.categoria[1]}&m=${produto.categoria[2]}`} className='link-categoria'>{produto.categoria[2].toUpperCase()}</Link>
                  </div>
                }
                                          
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
                <div className="box-parcelado">
                  <div className="box-icons">
                    <BsCreditCard/>
                  </div>
                  <div>
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
                </div>
              </div>
              {
                Object.keys(cart).includes(produto.id.toString()) ?
                <div className='div-in-cart'>
                  <Link to='/cart'>VER NO CARRINHO</Link>
                </div>
                :
                <button onClick={() => addToCart()} className="button-comprar">COMPRAR</button>
              }

            </div>
          </div>
          
        </div>
      }
      {produto && 
        <div className='box-recentes'>
          {           
            obterProdutosFiltrados().map(pd => <Link to={`/produto/${pd.id}`} key={pd.id} className='recentes-item'> <img title={pd.descricao} className='imagem-recentes' src={pd.imagemProduto}/></Link>)
          }
        </div>
      }
    </div>
    
  )
}

export default Produto