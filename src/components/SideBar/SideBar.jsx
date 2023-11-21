import React, { useContext, useState } from "react";

import Offcanvas from "react-bootstrap/Offcanvas";
import { MdEditNote } from "react-icons/md";
import {
  RiAccountBoxFill,
  RiCoupon3Fill,
  RiLoginCircleLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

import "./SideBar.css";
import ModalConfirm from "../Modal/ModalConfirm";
import { OnSignOut } from "../../Services/FirebaseAuthService";
import CategoryAccordion from "./components/CategoryAccordion";
import { AuthContext } from "../../commom/context/AuthProvider";

const SideBar = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div onClick={handleShow}>{children}</div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Catergorias</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="user-nav-btns">
            {user ? (
              <>
                <Link to="/account" onClick={handleClose}>
                  <div className="nav-btn-icon">
                    <RiAccountBoxFill />
                  </div>
                  <div className="nav-btn-text">Minha Conta</div>
                </Link>
                <Link to="/orders" onClick={handleClose}>
                  <div className="nav-btn-icon">
                    <MdEditNote />
                  </div>
                  <div className="nav-btn-text">Pedidos</div>
                </Link>

                <Link to="/cupons" onClick={handleClose}>
                  <div className="nav-btn-icon">
                    <RiCoupon3Fill />
                  </div>
                  <div className="nav-btn-text">Cupons</div>
                </Link>

                <ModalConfirm
                  title="Sair da Conta"
                  message="confirme para sair!"
                  mode="danger"
                  onAccept={() => {
                    OnSignOut();
                    handleClose();
                  }}
                >
                  <Link>
                    <div className="nav-btn-icon">
                      <RiLogoutCircleLine />
                    </div>
                    <div className="nav-btn-text">Sair</div>
                  </Link>
                </ModalConfirm>
              </>
            ) : (
              <>
                <Link to="/login" onClick={handleClose}>
                  <div className="nav-btn-icon">
                    <RiLoginCircleLine />
                  </div>
                  <div className="nav-btn-text">Acessar Conta</div>
                </Link>
              </>
            )}
          </div>
          <CategoryAccordion closeSideBar={handleClose} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBar;
