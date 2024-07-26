import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Avatar,
  styled
} from '@mui/material';
import usersData from '../data/users.json'; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";

const PREFIX = 'UserProfile';
const classes = {
  profileContainer: `${PREFIX}-profileContainer`,
  avatar: `${PREFIX}-avatar`,
  form: `${PREFIX}-form`,
  submit: `${PREFIX}-submit`
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.profileContainer}`]: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  [`& .${classes.avatar}`]: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
  [`& .${classes.form}`]: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  [`& .${classes.submit}`]: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const getUserDetails = async () => {
  const userId = 1; // This should be dynamic based on the logged-in user
  return usersData.find(user => user.id === userId);
};

const updateUserDetails = async (updatedUser) => {
  // Implement your update logic here.
  // For now, let's assume it returns true.
  return true;
};

const UserProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetails();
      // @ts-ignore
      setFormData(userDetails);
    };
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate(); // Use navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await updateUserDetails(formData);
    if (updated) {
      alert('Profile updated successfully');
    } else {
      alert('Failed to update profile');
    }
    navigate('/homepage');

  };

  return (
    <Root>
      <Container className={classes.profileContainer}>
        <Avatar className={classes.avatar} src="/static/images/avatar/1.jpg" />
        <Typography component="h1" variant="h5">
          User Profile
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            autoComplete="fname"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            autoComplete="lname"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            autoComplete="address"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="city"
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            autoComplete="city"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="state"
            label="State/Province/Region"
            name="state"
            value={formData.state}
            onChange={handleChange}
            autoComplete="state"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="zip"
            label="Zip / Postal Code"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            autoComplete="zip"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="phone"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Save Changes
            
          </Button>
        </form>
      </Container>
    </Root>
  );
};

export default UserProfile;
