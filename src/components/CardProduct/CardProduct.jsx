import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./styles.module.css";
import { ButtonGroup } from "react-bootstrap";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { CartContext } from "../../commom/context/CartProvider";

const CardProduct = ({ product }) => {
  const navigate = useNavigate();
  
  const {cart , addProduct, removeProduct} = useContext(CartContext);

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
                  onClick={() => removeProduct(product.id)} 
                  variant="dark">
                    <IoMdRemove color="red"/>
                  </Button>

                  <Button variant="dark">{cart[product.id].amount}</Button>

                  <Button 
                  onClick={() => addProduct(product)}
                  variant="dark">
                      <IoMdAdd color='green'/>
                  </Button>
                </ButtonGroup> 
                :
                <Button                
                className={styles.btnAddCart} 
                onClick={() => addProduct(product)}                 
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
