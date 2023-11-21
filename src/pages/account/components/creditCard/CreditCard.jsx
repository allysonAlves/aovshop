import React, { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";
import CreditCardLoader from './CreditCardLoader'
import { convertToBrPriceString, convertToCardNumber } from "../../../../utils/utils";

import Logo from '../../../../assets/logo.png'
import { AuthContext } from "../../../../commom/context/AuthProvider";
import { SiCardano } from "react-icons/si";

import styles from './styles.module.css'
import moment from "moment";

const CreditCard = () => {
    const {user, creditCard, loadingUser} = useContext(AuthContext);
   
    const navigate = useNavigate();

  if(!loadingUser && !creditCard)
    return null;

  return (
    <>
      <div className="d-flex mt-2">
        {loadingUser || !user || !creditCard ? (
          <CreditCardLoader width="25rem"/>
        ) : (
          <Card className={styles.card} >
            <Card.Body>
              <Card.Title
                style={{
                  display: "flex",
                  justifyContent:'space-between',
                  alignItems: "end",
                  marginBottom:50,                  
                }}
              >
                <div className="d-flex align-items-end gap-2">
                    <img src={Logo} style={{width:30}}/>
                    <span>AOVCard</span>
                </div>
                <Card className="p-1 text-success">
                 {convertToBrPriceString(creditCard?.value)}
                </Card>
              </Card.Title>
              <Card.Text style={{fontSize:20}}>{convertToCardNumber(creditCard?.number)} </Card.Text>
              <Card.Text className="mb-2">{user.displayName}</Card.Text>
              <Card.Text className="mb-0">val. {moment(creditCard?.validate).format('MM/YY')}</Card.Text>
              <SiCardano className="position-absolute" style={{bottom:25, right:35}} color="#f38846" size={40}/>              
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
};

export default CreditCard;
