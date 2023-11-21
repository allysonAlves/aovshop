import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../../commom/context/AuthProvider";
import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Radio,
} from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import styled from "@emotion/styled";
import Form from "./form/Form";
import { OrdersContext } from "../../../../../commom/context/OrdersProvider";

const AddressContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex; 
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const DivAddButton = styled.div`
  width: 100%;
  justify-content: space-between;  
  display: flex;
  padding: 5px; 
`;

const FormLimit = styled.div`
  flex: 1;
  display: flex;  
  gap: 10px;
  padding-top: 10px;
  flex-wrap: wrap;
`;

const Address = () => {
  const { address, removeAddress, loadingUser } = useContext(AuthContext);
  const { setOrderDetails, newOrder, setStep } = useContext(OrdersContext);

  const [deleteDialog, setDeleteDialog] = useState({address: {}, open: false});
  const [formSettings, setFormSettings] = useState({address: {},open: false});

  const openDeleteDialog = (deleteAddress) => {
    setDeleteDialog({
      address: deleteAddress,
      open: true,
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ address: "", open: false });
  };

  const handleDelete = () => {
    removeAddress(deleteDialog.address);
    closeDeleteDialog();
  };

  const openForm = (editAddress) => {
    setFormSettings({ address: editAddress, open: true });
  };
  const CloseForm = () => {
    setFormSettings({ address: {}, open: false });
  };

  if (loadingUser) return <CircularProgress />;

  return (
    <AddressContainer className="parent">
      <Dialog open={deleteDialog.open} onClose={closeDeleteDialog}>
        <DialogTitle>Deseja excluir este endereço ?</DialogTitle>
        <DialogContent>
          {deleteDialog.address?.nome}:{" " + deleteDialog.address?.rua + " "}
          {" " + deleteDialog.address?.numero + " "}-
          {" " + deleteDialog.address?.bairro + " "}-
          {deleteDialog.address?.cidade + " "}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant="contained" color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Form
        open={formSettings.open}
        address={formSettings.address}
        onClose={CloseForm}
      />

      <DivAddButton>
        <div></div>
        <Button color="inherit" variant="contained" onClick={() => openForm()}>
          Novo Endereço
        </Button>
      </DivAddButton>
      <FormLimit key={1} className="position-relative">
        {Object.keys(address || {}).length > 0 ? (
          Object.values(address).map((item) => (
            <div key={item.id}>
              <Card
                onClick={() => setOrderDetails({ address: item })}
                elevation={5}
                sx={{
                  width: 350,
                  padding: 2,
                  position: "relative",
                  cursor:'pointer'
                }}
              >
                <Radio
                  size="small"
                  sx={{ position: "absolute", top: 0, left: 0 }}
                  checked={newOrder.address?.nome == item.nome}
                  // onChange={(ev) => setSelectedAddress(item.name)}
                  value={item.id}
                  name="radio-buttons"
                  inputProps={{ "aria-label": "address" }}
                />

                <div style={{ position: "absolute", top: 5, right: 5 }}>
                  <IconButton
                    sx={{ marginRight: 1 }}
                    size="small"
                    onClick={(ev) => {
                      ev.preventDefault();
                      ev.stopPropagation();
                      openForm(item);
                    }}
                  >
                    <CiEdit />
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={(ev) => {
                      ev.preventDefault();
                      ev.stopPropagation();
                      openDeleteDialog(item);
                    }}
                  >
                    <MdDeleteOutline />
                  </IconButton>
                </div>

                <div style={{ marginTop: 25 }}>{item.nome}</div>
                <div style={{ fontSize: 12 }}>{item.destinatario}</div>
                <div style={{ fontSize: 12 }}>
                  {item.rua}, {item.numero} - {item.cidade} - {item.uf}
                </div>
                <div style={{ fontSize: 12 }}>{item.complemento}</div>
                <div style={{ fontSize: 12 }}>{item.referencia}</div>
              </Card>
            </div>
          ))
        ) : (
          <div>Nenhum endereço cadastrado</div>
        )}
      </FormLimit>
      <DivAddButton>
        <div></div>
        <Button
          disabled={Object.keys(newOrder.address).length < 1}
          className="mb-5"
          color="inherit"
          variant="contained"
          onClick={() => setStep(1)}>
          Avançar
        </Button>
      </DivAddButton>
    </AddressContainer>
  );
};

export default Address;
