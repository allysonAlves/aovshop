import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import './ModalConfirm.css'


const ModalConfirm = ({
  title = '', 
  message = '', 
  onAccept = () =>{} , 
  textCancel = 'Cancelar', 
  textAccept = 'Confirmar', 
  btnOpenText = 'Confirme', 
  mode = "primary",
  size = "sm",
  btnVariant = "primary",   
  children,
  ...props
}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    {
        children ?
        <div onClick={handleShow}>
            {children}
        </div> :
        <Button {...props} variant={btnVariant} onClick={handleShow}>
            {btnOpenText}
         </Button>
    }
      

      <Modal size={size} show={show} onHide={handleClose} className="my-modal">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {textCancel}
          </Button>
          <Button variant={mode ?? "primary"} onClick={() => {handleClose(); onAccept()}}>
            {textAccept}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
