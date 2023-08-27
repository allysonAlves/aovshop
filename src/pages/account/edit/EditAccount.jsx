import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Card, Image, Spinner, Button, Col, Form, Row } from "react-bootstrap";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { AuthContext } from "../../../commom/context/AuthProvider";
import styles from "./styles.module.css";
import { FaUser } from "react-icons/fa";

const EditAccount = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const { user, loadSave, updateProfile, loadingUser } = useContext(AuthContext);
  const [photo, setPhoto] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if ((form.checkValidity() === true && name) || email || photo) {
      updateProfile(name, email, photo);
    }
  };

  if (loadingUser) {
    return <Spinner />;
  }

  if(!loadingUser && !user)
    navigate('/login', {state: {redirect: '/account/edit'}});

  return (
    <div className={styles.page}>
      <div className={styles.page_content}>
        <div onClick={() => navigate('/account')} className={styles.btn_return}>
          <AiOutlineArrowLeft/>
        </div>
        <Form
          className={styles.form}
          noValidate
          validated={true}
          onSubmit={handleSubmit}
        >
          <Button className={styles.btn_delete_account} variant="outline-dark">
            {" "}
            Excluir conta
          </Button>
          <Row className="mb-3">
            <Form.Group className="text-center" md="4" as={Col}>
              {
                !user.photoURL && !photo?
                (<FaUser size={45}/>) :
                (<Image
                style={{ maxWidth: "100%" }}
                src={!photo ? user.photoURL : URL.createObjectURL(photo)}
                rounded
                />)
              }
              
              {/* <Card
                onClick={() => inputRef.current.click()}
                role="button"
                className="cursor-pointer"
              >
                selecionar
              </Card> */}
              <input
                ref={inputRef}
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={(ev) => setPhoto(ev.target.files[0])}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              style={{ alignItems: "end", justifyContent: "end" }}
              className="flex-column"
              as={Col}
              md="6"
              controlId="validationCustom01"
            >
              <Form.Label>Nome</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="name"
                defaultValue={user.displayName}
                onChange={(ev) => setName(ev.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="E-mail"
                defaultValue={user.email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Button variant="dark" type="submit">
                Salvar
                {loadSave && <Spinner style={{ marginLeft: 5 }} size="sm" />}
              </Button>              
            </Form.Group>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default EditAccount;
