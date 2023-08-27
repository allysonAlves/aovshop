import React, { useState, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import ModalConfirm from "../../../../components/Modal/ModalConfirm";
import { OnSignOut } from "../../../../Services/FirebaseAuthService";
import { useNavigate } from "react-router";
import { FaUser } from 'react-icons/fa'
import ProfileLoader from "./ProfileLoader";

const ProfileComp = ({ isLoading, user }) => {
    const [profileImage, setProfileImage] = useState(user?.photoURL);
   const navigate = useNavigate();

   useEffect(() => {
    setProfileImage(user?.photoURL? user.photoURL: null);
   },[user?.photoURL])

  return (
    <>
      <div className="d-flex mt-2">
        {isLoading || !user ? (
          <ProfileLoader width="25rem"/>
        ) : (
          <div style={{ width: "25rem"}}>
            <Card.Body style={{display:'flex', flexDirection:'column',gap:10}}>
              <Card.Title
                style={{
                  display: "flex",
                  justifyContent:'space-between',
                  alignItems: "center",
                }}
              >
                MEUS DADOS
                <DropdownButton
                  id="dropdown-item-button"
                  title="Minha Conta"
                  variant="none"
                >
                  <Dropdown.Item
                    as="button"
                    onClick={() => navigate('./edit')}
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
                !profileImage?
                  <FaUser size={45}/> :
                <img src={profileImage} onError={() => setProfileImage(null)}/>
               }

              </Card>
              <div style={{marginTop:10, border:'none'}}>                
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
              </div>   
            </Card.Body>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileComp;
