import React from 'react'
import ProdutoGrid from '../components/ProdutoGrid'
import { useState, useEffect } from "react";
import { useParams, Link, useOutletContext, useNavigate } from "react-router-dom";
import { FaBarcode, FaShareAlt, FaAngleRight } from 'react-icons/fa'
import { SiPix } from 'react-icons/si'
import { RxChevronUp, RxChevronDown} from 'react-icons/rx'
import{ BsCreditCard } from 'react-icons/bs'

import './Produto.css'
import { getProduct } from '../Services/ProductsFirestoreService';
import AccordionDetails from '../components/Accordion/AccordionDetails';

function Produto() {

  const produtosURL = import.meta.env.VITE_URL_PRODUTOS;
  const {id} = useParams()
  const { cart , setCart } = useOutletContext();
  const [product, setProduct] = useState(null)
  const [produtosFiltrados, setProdutosfiltrados] = useState([])
  const [produtos, setProdutos] = useState([])
  const [showParcelas, setShowParcelas] = useState(false)
  const navigate = useNavigate();

  
  
  function obterProdutosFiltrados(){
    let filtrados = produtos.filter(f => f.id != product.id);
    filtrados.sort(compareFn);
    return filtrados;
  }

  useEffect(() =>{    
    getProduct(id).then(result => setProduct(result));
}
,[id])

function compareFn(a, b) {
  let aCompare = 0;
  let bCompare = 0;
  for(const cat of product.categoria)
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
    items.push(<div className='parcela' key={i}> {i}x de {convert_moeda((product.price * (1 -(10/100)))/i)} sem juros </div>)
  }
  return items;
}
const share = async () =>
{
  try{
    await navigator.share({
      title: product.descricao,
      text: '',
      url: location.href,
    });
  } 
  catch{

  }
}

  const addToCart = () => {
    setCart(previous => {      
      let amountInCart = cart[product.id] ? cart[product.id]?.amount + 1 : 1;
      let productToCart = {...product, amount: amountInCart};
      //console.log("[ amount ==>>]", amountInCart," [product =>>]", productToCart)
      return {...previous, [product.id]: productToCart}
    });

    navigate('/cart')
    
  }


  return (
    <div className='produto-page'>
      <div className='outdoor'>
        <img className='outdoor-img' src='https://img.terabyteshop.com.br/banner/2138.jpg'></img>
      </div>      
      {product &&
        <div className='produto'>
          <div className="produto-destaque">
            <div className="container-imagem">
             
              <div className="box-imagem">
                <img className='bg-image hover-zoom' src={product.images[0]}/>
              </div>
              <div className="menu-imagens">
                <img className='imagem-option' src={product.images[0]}/>
              </div>
            </div>
            <div className="container-compra">
              <div className="box-desconto-share">
                <div className="box-desconto">
                  <p>{product.sale}% </p>
                </div>
                <div className="box-desconto">
                  <p>{product.stock}</p>
                </div>
                <div className="box-share">
                  <FaShareAlt onClick={share}/>
                </div>
              </div>
              <div className="classificacao">
               {product?.categoria &&
                  <div className='div-links-categorias'>                  
                    <Link to={`/categoria/${product.categoria}`} className='link-categoria'>{product.categoria.toUpperCase()}</Link>
                    <FaAngleRight/>  
                    <Link to={`/categoria/${product.categoria}?sub=${product.subCategoria}`} className='link-categoria'>{product.subCategoria.toUpperCase()}</Link>
                    <FaAngleRight/>  
                    <Link to={`/categoria/${product.categoria}?sub=${product.subCategoria}&m=${product?.datails?.Marca}`} className='link-categoria'>{product?.details?.Marca.toUpperCase()}</Link>
                  </div>
                }
                                          
              </div>
              <div className="produto-titulo">
                <h1>{product.name}</h1>
              </div>
              <div className="marca-hating"></div>
              <div className="produto-disponivel">Produto Disponível</div>
              <div className="box-avista">
                <div className="box-icons">
                  <FaBarcode className='barcode-icon'/>
                  <SiPix className='pix-icon'/>
                </div>
                <div className="box-valor">
                  <p className='preco-total'>De: <s>{convert_moeda(product.price)}</s> por:</p>
                  <p className='preco-avista'>{convert_moeda(product.price)}</p>
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
                      {convert_moeda(product.price)}
                    </p>
                    <p className="valor-da-parcela">
                      <span>em até </span>
                      <span className='realce'>12x</span>
                      <span> de </span>
                      <span className="realce">{convert_moeda(product.price)}</span>
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
                Object.keys(cart).includes(product.id.toString()) ?
                <div className='div-in-cart'>
                  <Link to='/cart'>VER NO CARRINHO</Link>
                </div>
                :
                <button onClick={() => addToCart()} className="button-comprar">COMPRAR</button>
              }

            </div>
          </div>
          <AccordionDetails product={product}/>

          
        </div>
      }
      {product && 
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