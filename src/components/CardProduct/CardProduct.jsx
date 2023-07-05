import React, { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";


import { addToCart, removeCart } from "../../Services/CartService";

import styles from "./styles.module.css";
import { ButtonGroup } from "react-bootstrap";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const CardProduct = ({ product }) => {
  const navigate = useNavigate();
  const {setCart, cart} = useOutletContext();
  return (
    <div>      
        <>
          <Card className={styles.card}>
            <Card 
            onClick={() => navigate(`/produto/${product.id}`)}
            className={styles.imageDiv}>
              <Card.Img
                className={styles.image}
                variant="top"
                src={product.images[0]}
              />
            </Card>
            <Card.Body className={styles.cardBody}>

              <Card.Text 
              onClick={() => navigate(`/produto/${product.id}`)}
              style={{ height: 80 }}>
                {product.name}
              </Card.Text>

              <div>
                <div style={{ fontSize: 14, color: "gray" }}>
                  De <s> R$ {product.price} </s> por:
                  <br />
                </div>

                <div
                  style={{ color: "#008000", fontWeight: "bold", fontSize: 23 }}
                >
                  R$ {product.price} à vista <br />
                </div>

                <div style={{ fontSize: 14, color: "gray" }}>
                  12x de R$ {product.price} sem juros
                </div>
              </div>
              {
                 cart[product.id] ?
                <ButtonGroup aria-label="Basic example">
                  <Button
                  onClick={() => removeCart({setCart,cart, produto: product})} 
                  variant="dark">
                    <IoMdRemove color="red"/>
                  </Button>

                  <Button variant="dark">{cart[product.id].amount}</Button>

                  <Button 
                  onClick={() => addToCart({setCart,cart, produto: product})}
                  variant="dark">
                      <IoMdAdd color='green'/>
                  </Button>
                </ButtonGroup> 
                :
                <Button                
                className={styles.btnAddCart} 
                onClick={() => 
                  addToCart({setCart,cart, produto: product})
                } 
                variant="sucess">
                  Adicionar ao Carrinho
                </Button>
              }
            </Card.Body>
          </Card>
        </>      
    </div>
  );
};

export default CardProduct;
