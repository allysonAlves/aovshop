import React, { useContext, useEffect } from "react";
import { OrdersContext } from "../../../commom/context/OrdersProvider";
import OrderSkeleton from "./OrderSkeleton";
import styled from "@emotion/styled";
import {
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import { AuthContext } from "../../../commom/context/AuthProvider";
import { convertToBrPriceString } from "../../../utils/utils";

const OrdersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  overflow-y: auto;
  flex: 1;
`;

const DestaqueBox = styled.div`
  display: flex;
  gap: 15px;
  padding: 20px;
  overflow-x: auto;
  border-radius: 10px;
`

const OrdersBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  gap: 10px;
  max-height: 500px;
  padding: 20px; 

  & .order_content{
    display: flex; 
    flex: 1;    
    min-width: 450px;    
  }

  @media (max-width: 500px) {
    & .order_content {
      min-width: 350px;
    }
  }
`

const Orders = () => {
  const { orderList, getOrderList, orderLoading } = useContext(OrdersContext);
  const { user, loadingUser } = useContext(AuthContext);

  useEffect(() => {
    if (user) getOrderList();
  }, [user]);

  if (orderLoading || loadingUser)
    return (
      <div className="aov-page">
        <div className="aov-content">
          <OrdersContainer>
            <OrderSkeleton />
          </OrdersContainer>
        </div>
      </div>
    );

  return (
    <div className="aov-page">
      <div className="aov-content">
        <OrdersContainer>
          <h3>Meus Pedidos</h3>
          <OrdersBox>
            {
              Object.values(orderList)?.length > 0 ? (
                Object.values(orderList)?.map((order) => (
                  <Card style={{ cursor: "pointer", height:100, minHeight:100, margin:2 }} key={order?.id}>
                    <CardContent className="order_content">
                      <div style={{ fontSize: 12, flex: 1, color: "#aeaeae" }}>
                        <div style={{ color: "orange" }}>Em separação</div>
                        <div>
                          Entrega prevista:
                          {moment(order.dateCreate)
                            .add(3, 'days')
                            .format("DD/MM/YYYY")}
                        </div>
                        <div>
                          valor:{convertToBrPriceString(order.total)}                         
                        </div>
                        <div>
                          Nº Pedido: {order.id}                         
                        </div>
                      </div>

                      <AvatarGroup total={order.products.length} max={2} style={{display:'flex', alignItems:'center'}}>
                        {Object.values(order.products).map((product) => (
                          <Avatar
                            title={product.name}
                            key={product.id}
                            // variant="rounded"
                            alt="Remy Sharp"
                            src={product.image}
                          />
                        ))}                    
                      </AvatarGroup>
                    </CardContent>
                  </Card>
                ))
              ) : (<>Lista de pedidos vazia</>)
            }

          </OrdersBox>
        </OrdersContainer>

        <div>
          Produtos em destaque
        </div>
        <DestaqueBox>
          <Avatar 
          sx={{ width: 80, height: 80 }}
          />
          <Avatar 
          sx={{ width: 80, height: 80 }}
          />
        </DestaqueBox>
      </div>
    </div>
  );
};

export default Orders;
