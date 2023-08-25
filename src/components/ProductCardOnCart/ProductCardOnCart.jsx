import React, { useContext } from "react";
import { IoMdRemove, IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../commom/context/CartProvider";

import "./ProductCardOnCart.css";
const ProductCardOnCart = ({ product }) => {
  const navigate = useNavigate();

  const { addProduct, removeProduct } = useContext(CartContext);

  const convert_moeda = (s) =>
    s.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

  return (
    <div className="product-card">
      <div
        className="div-imagem"
        title={product.name}
        onClick={() => navigate(`/produto/${product.id}`)}
      >
        <img src={product.images[0]} />
      </div>
      <div className="div-right">
        <div
          className="div-title"
          title={product.name}
          onClick={() => navigate(`/produto/${product.id}`)}
        >
          {product.name}
        </div>
        <div className="div-prec-btns">
          <div className="div-precos">
            <div className="preco-vista">
              {convert_moeda(product.price * (1 - product.sale / 100))}
            </div>
            <div className="preco-parcelado">
              ou {convert_moeda(product.price * (1 - 10 / 100))} em 12x
            </div>
          </div>
          <div className="div-btns">
            <button onClick={() => removeProduct(product.id)}>
              <IoMdRemove />
            </button>
            <span>{product.amount}</span>
            <button onClick={() => addProduct(product)}>
              <IoMdAdd />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardOnCart;
