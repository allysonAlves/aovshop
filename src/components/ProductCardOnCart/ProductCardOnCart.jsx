import React from "react";
import { IoMdRemove, IoMdAdd } from 'react-icons/io'
import { useOutletContext, useNavigate } from "react-router-dom";
import { addToCart, removeCart } from "../../Services/CartService";

import "./ProductCardOnCart.css";
const ProductCardOnCart = ({ produto }) => {
    const navigate = useNavigate();
    const {setCart,cart} = useOutletContext();
  const convert_moeda = (s) =>
    s.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

  return (
    <div className="product-card">
      <div className="div-imagem" title={produto.name} onClick={() => navigate(`/produto/${produto.id}`)}>
        <img src={produto.images[0]} />
      </div>
      <div className="div-right">
        <div className="div-title" title={produto.name} onClick={() => navigate(`/produto/${produto.id}`)}>
          {produto.name}
        </div>

        <div className="div-prec-btns">
          <div className="div-precos">
            <div className="preco-vista">
              {convert_moeda(produto.price *(1-(produto.sale/100)))}
            </div>
            <div className="preco-parcelado">
              ou  {convert_moeda(produto.price *(1-(10/100)))} em 12x
            </div>
          </div>
          <div className="div-btns">
            <button onClick={() => removeCart({setCart,cart,produto})}><IoMdRemove/></button>
            <span>{produto.amount}</span>
            <button onClick={() => addToCart({setCart,cart,produto})}><IoMdAdd/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardOnCart;
