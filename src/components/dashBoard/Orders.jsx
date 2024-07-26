import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import { loadOrders, selectAllOrders, selectOrdersStatus, selectOrdersError, removeOrder } from '../../redux/ordersSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const ordersStatus = useSelector(selectOrdersStatus);
  const ordersError = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);

  const handleRemoveOrder = (orderId) => {
    dispatch(removeOrder(orderId));
  };

  if (ordersStatus === 'loading') {
    return <Typography variant="body1">Loading orders...</Typography>;
  }

  if (ordersStatus === 'failed') {
    return <Typography variant="body1" color="error">{ordersError}</Typography>;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        All Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer ID</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Ship To</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Bill Amount</TableCell>
              <TableCell>Action</TableCell> {/* Added for remove button */}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.customerId}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                <TableCell>{`${order.shipTo.firstName} ${order.shipTo.lastName}, ${order.shipTo.streetAddress}, ${order.shipTo.city}, ${order.shipTo.state}, ${order.shipTo.zipCode}, ${order.shipTo.mobile}`}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveOrder(order.orderId)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Orders;
