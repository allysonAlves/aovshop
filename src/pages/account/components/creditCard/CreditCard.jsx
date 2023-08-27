import React, { useState, useEffect, useContext } from "react";
import { Dropdown, DropdownButton, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import ModalConfirm from "../../../../components/Modal/ModalConfirm";
import { OnSignOut } from "../../../../Services/FirebaseAuthService";
import { useNavigate } from "react-router";
import { FaUser } from 'react-icons/fa'
import CreditCardLoader from './CreditCardLoader'
import { convertToBrPriceString, convertToCardNumber } from "../../../../utils/utils";

import Logo from '../../../../assets/logo.png'
import { AuthContext } from "../../../../commom/context/AuthProvider";
import { SiCardano } from "react-icons/si";

const CreditCard = ({ isLoading }) => {
    const {user} = useContext(AuthContext);
   
    const navigate = useNavigate();

  return (
    <>
      <div className="d-flex mt-2">
        {isLoading ? (
          <CreditCardLoader width="30rem"/>
        ) : (
          <Card 
          style={{ 
            width: "30rem" , 
            backgroundColor:'#01031a',
             borderRadius:10,
             padding:10,
             paddingBottom:0,
             position:'relative'
            }}>
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
                <Card className="p-1">
                 {convertToBrPriceString(1000)}
                </Card>
              </Card.Title>
              <Card.Text style={{fontSize:20}}>{convertToCardNumber("1958452478021487")} </Card.Text>
              <Card.Text className="mb-2">{user.displayName}</Card.Text>
              <Card.Text>val. 10/25</Card.Text>
              <SiCardano className="position-absolute" style={{bottom:25, right:35}} color="orange" size={40}/>              
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
};

export default CreditCard;