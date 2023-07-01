import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

import styles from './styles.module.css'

const CardProduct = ({ product }) => {
  return (
    <div>
      {product ? (
        <>
          <Card className={styles.card }>
            <Card className={styles.imageDiv}>
                <Card.Img className={styles.image} variant="top" src={product.images[0]} />
            </Card>
            <Card.Body className={styles.cardBody}>              
              <Card.Text>
                {product.name}                
              </Card.Text>
              <div>
                <div style={{fontSize:14, color:'gray'}}>
                    De <s> {product.price} </s> por:<br/>
                </div>
                <div style={{color:'#008000', fontWeight:'bold', fontSize:23}}>
                    {product.price} À Vista <br/>
                </div>
                <div style={{fontSize:14, color:'gray'}}>ou em até 12x de {product.price}</div>
              </div>
              <Button className={styles.btnAddCart} variant="sucess">Adicionar</Button>
            
            </Card.Body>
            
          </Card>
        </>
      ) : (
        <>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>              
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default CardProduct;
