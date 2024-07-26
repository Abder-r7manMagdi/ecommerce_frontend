import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';

const useStyles = {
  selected: {
    backgroundColor: '#f0f0f0',
  },
};

export const MainListItems = ({ handleNavigation, selectedView }) => {
  const [selectedItem, setSelectedItem] = useState(selectedView);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    handleNavigation(item);
  };

  return (
    <div>
      <ListItem button onClick={() => handleItemClick('dashboard')} style={selectedItem === 'dashboard' ? useStyles.selected : {}}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => handleItemClick('orders')} style={selectedItem === 'orders' ? useStyles.selected : {}}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
      <ListItem button onClick={() => handleItemClick('customers')} style={selectedItem === 'customers' ? useStyles.selected : {}}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>
      <ListItem button onClick={() => handleItemClick('addproduct')} style={selectedItem === 'addproduct' ? useStyles.selected : {}}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Add Product" />
      </ListItem>
      <ListItem button onClick={() => handleItemClick('allproducts')} style={selectedItem === 'allproducts' ? useStyles.selected : {}}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="All Products" />
      </ListItem>
    </div>
  );
};

export const SecondaryListItems = ({ handleNavigation, selectedView }) => {
  const [selectedItem, setSelectedItem] = useState(selectedView);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    handleNavigation(item);
  };

  return (
    <div>
      <ListItem button onClick={() => handleItemClick('other')} style={selectedItem === 'other' ? useStyles.selected : {}}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Other" />
      </ListItem>
    </div>
  );
};
