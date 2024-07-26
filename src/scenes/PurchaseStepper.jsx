// src/scenes/PurchaseStepper.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import SignInForm from '../components/header/SignInForm';
import ordersData from '../data/ordersData.json';
import { selectAuthStatus } from '../redux/authSlice';

const steps = [
  'Login',
  'Delivery Address',
  'Order Summary',
  'Payment',
];

const PurchaseStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const authStatus = useSelector(selectAuthStatus);

  useEffect(() => {
    if (authStatus === 'succeeded') {
      setActiveStep(1);
    }
  }, [authStatus]);

  useEffect(() => {
    if (authStatus === 'succeeded') {
      const orderId = 1; // This should be dynamic based on the logged-in user
      const userOrder = ordersData.find(order => order.orderId === orderId);
      setOrder(userOrder);
    }
  }, [authStatus]);

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    if (activeStep === 1 && !validateAddress()) return;
    if (activeStep === 3 && !validatePayment()) return;

    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleStep = (step) => () => setActiveStep(step);
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    if (allStepsCompleted()) {
      navigate('/homepage');
    } else {
      handleNext();
    }
  };

  const handleReset = () => {
    setActiveStep(authStatus === 'succeeded' ? 1 : 0);
    setCompleted({});
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      cardNumber: '',
      expDate: '',
      cvv: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateAddress = () => {
    // Add your validation logic for the address form
    const { firstName, lastName, address, city, state, zip, phone } = formData;
    return firstName && lastName && address && city && state && zip && phone;
  };

  const validatePayment = () => {
    // Add your validation logic for the payment form
    const { cardNumber, expDate, cvv } = formData;
    return cardNumber && expDate && cvv;
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return authStatus === 'succeeded' ? null : <SignInForm />;
      case 1:
        return (
          <Container>
            <Typography variant="h6">Delivery Address</Typography>
            <TextField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="state"
              label="State/Province/Region"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="zip"
              label="Zip / Postal Code"
              value={formData.zip}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="phone"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Container>
        );
      case 2:
        return (
          <Container>
            <Typography variant="h6">Order Summary</Typography>
            {order ? (
              <div>
                {order.products.map((product) => (
                  <Typography key={product.id} variant="body1">
                    {product.title}: {product.quantity} x ${product.price} = ${product.totalPrice}
                  </Typography>
                ))}
                <Typography variant="h6">Total: ${order.totalAmount}</Typography>
              </div>
            ) : (
              <Typography variant="body1">Loading order details...</Typography>
            )}
          </Container>
        );
      case 3:
        return (
          <Container>
            <Typography variant="h6">Payment</Typography>
            <TextField
              name="cardNumber"
              label="Credit Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="expDate"
              label="Expiration Date"
              value={formData.expDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="cvv"
              label="CVV"
              value={formData.cvv}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button
              onClick={() => {
                if (validatePayment()) {
                  handleComplete();
                  navigate('/homepage');
                }
              }}
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              Complete Payment
            </Button>
            <Button
              onClick={() => {
                handleComplete();
                navigate('/homepage');
                console.log('Payment will be done on delivery');
              }}
              variant="contained"
              color="secondary"
              style={{ marginTop: '20px', marginLeft: '10px' }}
            >
              Pay on Delivery
            </Button>
          </Container>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel onClick={handleStep(index)}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Container>
        {allStepsCompleted() ? (
          <div>
            <Typography>All steps completed - you&apos;re finished with your purchase.</Typography>
            <Button onClick={() => {
              handleReset();
              navigate('/homepage');
            }}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography>Step {activeStep + 1} of {totalSteps()}</Typography>
            {renderStepContent(activeStep)}
            <Button 
              disabled={activeStep === (authStatus === 'succeeded' ? 1 : 0)} 
              onClick={handleBack}
            >
              Back
            </Button>
            <Button 
              onClick={() => {
                handleNext();
                if (isLastStep()) {
                  navigate('/homepage');
                }
              }}
            >
              {isLastStep() ? 'Finish' : 'Next'}
            </Button>
            {activeStep !== steps.length && (
              <div>
                {completed[activeStep] ? (
                  <Typography>Step {activeStep + 1} already completed</Typography>
                ) : (
                  <Button 
                    onClick={() => {
                      handleComplete();
                      navigate('/homepage');
                    }}
                  >
                    {isLastStep() ? 'Finish' : 'Complete Step'}
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </Container>
    </Container>
  );
};

export default PurchaseStepper;
