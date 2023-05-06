import React from 'react'
import './CardProdutoStyle.css'
import { Link } from "react-router-dom"

function CardProduto({produto}) {
    
    const convert_moeda = (s) => s.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}); 


  return (
    <div className='card' key={produto.id}>
        
        <div className="box-imagem" title={produto.descricao}>
        <Link to={`/produto/${produto.id}`}> <img src={produto.imagemProduto}/></Link>
        </div>
        
        <div className='informacoes-produto'>
            <p className="descricao" title={produto.descricao}>
                {produto.descricao}
            </p>
            <p className="preco-anterior"> De <s>{convert_moeda(produto.precoAnterior)}</s> por:</p>
            <p className="preco-atual">{convert_moeda(produto.precoAtual)} à vista</p>
            <p className="preco-parcelado">12x de {convert_moeda(produto.precoParcelado/12)} sem juros</p>
            <button>ADICIONAR AO CARRINHO</button>
        </div>
    </div>
  )
}

export default CardProduto