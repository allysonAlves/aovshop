import React, { useContext } from "react";
import { IoMdRemove, IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../commom/context/CartProvider";

import "./ProductCardOnCart.css";
import { Card } from "react-bootstrap";
import { calculateDiscount, convertToBrPriceString } from "../../utils/utils";
const ProductCardOnCart = ({ product }) => {
  const navigate = useNavigate();

  const { addProduct, removeProduct } = useContext(CartContext);

  const convert_moeda = (s) =>
    s.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

  return (
    <Card className="p-2">
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
                {convertToBrPriceString(calculateDiscount(product.price, product.sale))}
              </div>
              <div className="preco-parcelado">
                ou {convertToBrPriceString(product.price)} em 12x
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
    </Card>
  );
};

export default ProductCardOnCart;
