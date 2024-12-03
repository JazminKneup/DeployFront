import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import logo from '../assets/logo.png'; 

function SelectionPage() {
  const navigate = useNavigate();

  const handleProfessionalClick = () => {
    // Redirige a la página de registro de profesionales y pasa el userType
    navigate('/register/professional', { state: { userType: 'professional' } });
  };

  const handleUserClick = () => {
    // Redirige a la página de registro de usuarios y pasa el userType
    navigate('/register/user', { state: { userType: 'user' } });
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1rem',
        gap: '1rem', 
      }}
    >
      {/* Logo centrado y ajustado */}
      <Box sx={{ marginBottom: '0.2rem', marginTop: '-7rem' }}> {/* Ajuste de margen para subir el logo y reducir separación */}
        <img src={logo} alt="Professional Finder Logo" style={{ width: '550px' }} />
      </Box>

      {/* Botón "I am Professional" */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleProfessionalClick}
        sx={{
          backgroundColor: '#3f51b5',
          color: 'white',
          width: '80%',
          maxWidth: '300px',
          padding: '0.8rem',
          fontSize: '1rem',
        }}
      >
        I AM PROFESSIONAL
      </Button>

      {/* Botón "Looking for a Professional" */}
      <Button
        variant="outlined"
        color="primary"
        onClick={handleUserClick}
        sx={{
          width: '80%',
          maxWidth: '300px',
          padding: '0.8rem',
          fontSize: '1rem',
        }}
      >
        LOOKING FOR A PROFESSIONAL
      </Button>
    </Box>
  );
}

export default SelectionPage;
