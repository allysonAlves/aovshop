import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import ModalConfirm from "../../../components/Modal/ModalConfirm";
import { OnSignOut } from "../../../Services/FirebaseAuthService";

import { FaUser } from 'react-icons/fa'

const ProfileComp = ({ isLoading, user }) => {
    const [profileImage, setProfileImage] = useState(null);

    useEffect(()=>{
        setProfileImage(!profileImage)
    },[user])

  return (
    <>
      <div className="d-flex">
        {isLoading ? (
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Placeholder
                as={Card.Title}
                animation="glow"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Placeholder xs={4} />
                <Placeholder xs={3} />
              </Placeholder>
              <Card
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 15,
                }}
              ></Card>
              <Placeholder style={{marginTop:10}} as={Card.Text} animation="glow">
                <Placeholder xs={6} />
                <Placeholder xs={7} />
              </Placeholder>              
            </Card.Body>
          </Card>
        ) : (
          <Card style={{ width: "40rem" }}>
            <Card.Body>
              <Card.Title
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                MEUS DADOS
                <DropdownButton
                  id="dropdown-item-button"
                  title="Minha Conta"
                  variant="dark"
                >
                  <Dropdown.Item
                    as="button"
                    onClick={() => console.log("action")}
                  >
                    Editar
                  </Dropdown.Item>
                  <Dropdown.Item as="button">Trocar Senha</Dropdown.Item>

                  <ModalConfirm
                    btnOpenText="Sair"
                    title="Sair da Conta"
                    message="confirme para sair!"
                    mode="danger"
                    onAccept={() => OnSignOut()}
                  >
                    <Dropdown.Item as="button">Sair</Dropdown.Item>
                  </ModalConfirm>
                </DropdownButton>
              </Card.Title>
              <Card style={{ width: 80, height: 80, borderRadius: 15, overflow:'hidden', alignItems:'center', justifyContent:'center'}}>
                {
                    profileImage?
                    <FaUser size={45}/> :
                    <img src={user.photoURL} onError={() => setProfileImage(true)}/>

                }
              </Card>
              <Card style={{marginTop:10, border:'none'}}>                
                <Card.Text style={{marginBottom:0}}>
                    {user?.displayName}
                </Card.Text>
                <Card.Text style={{marginBottom:0}}>
                    {user?.email}
                </Card.Text>
                {
                    !user?.emailVerified &&
                    <>
                        <Card.Text style={{marginBottom:0}}>
                            <span style={{color:'red'}}>verificação de email pendente</span>
                        </Card.Text>
                        <Card.Text style={{marginBottom:0}}>
                            <Button variant="dark" className="border" size="sm" style={{color:'red'}}>enviar novo link de verificação</Button>
                        </Card.Text>
                    </>
                }
              </Card>   
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
};

export default ProfileComp;
