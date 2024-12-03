
import { useState } from 'react';
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentPage() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const handlePlanChange = (event) => {
    setPlan(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePayment = async () => {
    try {
      // Aquí simulas el proceso de pago
      const paymentResponse = await axios.post('/api/payment', {
        plan,
        paymentMethod,
      });

      if (paymentResponse.status === 200) {
        // Crear el perfil del usuario después de un pago exitoso
        const profileData = {
          profession: 'Lawyer', // Ejemplo de profesión, debería estar basado en el perfil del usuario
          registrationNumber: 'XXX XXX XXX',
          phoneNumber: '+123456789',
          whatsappNumber: 'XXX XXX XXX',
          subscription: plan,
        };

        const profileResponse = await axios.post('/api/profile/create', profileData);

        if (profileResponse.status === 200) {
          alert('Payment successful and profile created!');
          navigate('/profile'); // Redirige a la página de perfil
        } else {
          throw new Error('Failed to create profile');
        }
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error(error);
      alert('There was an issue with your payment or profile creation');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: '1rem',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Fees Plan
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Get started with easy payments
        </Typography>

        <Typography variant="body1" sx={{ mt: '1rem', mb: '1rem', fontWeight: 'bold' }}>
          Select what suits you best
        </Typography>

        {/* Selección del Plan */}
        <RadioGroup value={plan} onChange={handlePlanChange} sx={{ mb: '2rem' }}>
          <Paper
            elevation={plan === 'monthly' ? 3 : 1}
            sx={{
              padding: '1rem',
              backgroundColor: plan === 'monthly' ? '#0D47A1' : '#e0e0e0',
              color: plan === 'monthly' ? '#ffffff' : '#000000',
              marginBottom: '1rem',
            }}
          >
            <FormControlLabel
              value="monthly"
              control={<Radio sx={{ display: 'none' }} />}
              label="Monthly - 2.00 USD"
              sx={{ width: '100%', margin: 0 }}
            />
          </Paper>

          <Paper
            elevation={plan === 'yearly' ? 3 : 1}
            sx={{
              padding: '1rem',
              backgroundColor: plan === 'yearly' ? '#0D47A1' : '#e0e0e0',
              color: plan === 'yearly' ? '#ffffff' : '#000000',
            }}
          >
            <FormControlLabel
              value="yearly"
              control={<Radio sx={{ display: 'none' }} />}
              label="Yearly - 20.00 USD"
              sx={{ width: '100%', margin: 0 }}
            />
          </Paper>
        </RadioGroup>

        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: '1rem' }}>
          Select Payment Method
        </Typography>

        {/* Selección del Método de Pago */}
        <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange} sx={{ mb: '2rem' }}>
          <Paper
            elevation={paymentMethod === 'creditCard' ? 3 : 1}
            sx={{
              padding: '1rem',
              backgroundColor: paymentMethod === 'creditCard' ? '#0D47A1' : '#e0e0e0',
              color: paymentMethod === 'creditCard' ? '#ffffff' : '#000000',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FormControlLabel
              value="creditCard"
              control={<Radio sx={{ display: 'none' }} />}
              label="Credit Card"
              sx={{ width: '100%', margin: 0 }}
            />
          </Paper>

          <Paper
            elevation={paymentMethod === 'paypal' ? 3 : 1}
            sx={{
              padding: '1rem',
              backgroundColor: paymentMethod === 'paypal' ? '#0D47A1' : '#e0e0e0',
              color: paymentMethod === 'paypal' ? '#ffffff' : '#000000',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FormControlLabel
              value="paypal"
              control={<Radio sx={{ display: 'none' }} />}
              label="PayPal"
              sx={{ width: '100%', margin: 0 }}
            />
          </Paper>
        </RadioGroup>

        {/* Botón de Pago */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePayment}
          sx={{
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#3f51b5',
            color: 'white',
            borderRadius: '8px',
          }}
        >
          Pay & Continue
        </Button>
      </Box>
    </Box>
  );
}

export default PaymentPage;
