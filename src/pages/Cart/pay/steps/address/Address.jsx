import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../../commom/context/AuthProvider";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Paper,
  Radio,
  TextField,
} from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdDeleteOutline } from "react-icons/md";

import styled from "@emotion/styled";
import Form from "./form/Form";
import { OrdersContext } from "../../../../../commom/context/OrdersProvider";
import ModalConfirm from "../../../../../components/Modal/ModalConfirm";

const AddressContainer = styled.div`  
width: 100%;
  display: flex;
  align-items: center;
  margin-top: 40px;
  flex-direction: column;
`;

const DivAddButton = styled.div`
  width: 100%;  
  justify-content: space-between;
  /* align-items: end; */
  flex: 1;
  display: flex;
  padding: 5px;
  margin-top: 35px;

`;

const FormLimit = styled.div`
  flex: 1;  
  display: flex;
  /* justify-content: space-between; */
  gap: 10px;
  padding-top: 10px;
  flex-wrap: wrap;
`;



const Address = () => {
  const { address, removeAddress, loadingUser } = useContext(AuthContext);
  const { setOrderDetails, newOrder, setStep } = useContext(OrdersContext);
  
  const [deleteDialog, setDeleteDialog] = useState({address: {}, open:false }); 
  const [formSettings, setFormSettings] = useState({address: {}, open:false });
   
  const openDeleteDialog = (deleteAddress) => {
    setDeleteDialog({
      address: deleteAddress,
      open:true,
    });
  }

  const closeDeleteDialog = () => {
    setDeleteDialog({address: '',open: false})
  }

  const handleDelete = () => {
    closeDeleteDialog();
    removeAddress(deleteDialog.address);
  }
  
  const openForm = (editAddress) => {       
    setFormSettings({address: editAddress, open: true});
  }
  const CloseForm = () => {
    setFormSettings({address: {},open: false})
  }

  if(loadingUser)
    return <CircularProgress/>

  return (
    <AddressContainer>
      <Dialog open={deleteDialog.open} onClose={closeDeleteDialog}>        
        <DialogTitle>
          Deseja excluir este endereço ?
        </DialogTitle>
        <DialogContent>
          {deleteDialog.address?.nome}: 
          {' '+deleteDialog.address?.rua + ' '}  
          {' '+deleteDialog.address?.numero + ' '}- 
          {' '+deleteDialog.address?.bairro + ' '}- 
          {deleteDialog.address?.cidade + ' '}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant="contained" color="error">Excluir</Button>
        </DialogActions>
      </Dialog>
      <Form open={formSettings.open} address={formSettings.address} onClose={CloseForm}/>
        <DivAddButton>
            <div></div>
            <Button
              color="inherit"
              variant="contained"          
              onClick={() => openForm()}
            >
              Novo Endereço
            </Button>           
          </DivAddButton>
        <FormLimit key={1} className="position-relative">
          {address ? (
            Object.values(address).map((item) => (
              <div
                key={item.id}
                style={{ cursor: "pointer" }}
                onClick={() => setOrderDetails({address: item})}
              >
                <Card
                  elevation={5}
                  sx={{
                    width: 350,
                    padding: 2,
                    position: "relative",
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

                  <div style={{position: 'absolute', top: 5, right: 5}}>

                    <IconButton 
                    sx={{marginRight:1}} 
                    size="small"
                    onClick={(ev) => {
                      ev.preventDefault();
                      ev.stopPropagation();
                      openForm(item);
                    }}>
                      <CiEdit/>
                    </IconButton>

                    <IconButton 
                    size="small"
                    onClick={(ev) => { 
                      ev.preventDefault();
                      ev.stopPropagation();
                      openDeleteDialog(item);
                      }}>                    
                      <MdDeleteOutline/>
                    </IconButton>

                  </div>

                  <div style={{marginTop:25}}>{item.nome}</div>
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
            disabled={newOrder.address?.length < 1}
            color="inherit"
            variant="contained"          
            onClick={() => setStep(1)}
          >
           Avançar
          </Button>
        </DivAddButton>
    </AddressContainer>
  );
};
//{"cep":"21854150","state":"RJ","city":"Rio de Janeiro","neighborhood":"Bangu","street":"Rua Amsterdam","service":"correios"}

export default Address;
