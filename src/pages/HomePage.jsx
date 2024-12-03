import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import logo from '../assets/logo.png';
import videoBackground from '../assets/PROFESSIONALS.mp4';

function HomePage() {
  const navigate = useNavigate();

  const handleClickStart = () => {
    navigate('/selection'); // Redirige a la página de selección
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Contenido sobre el video */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1, // Asegura que el contenido esté sobre el video
          textAlign: 'center',
          color: 'white',
        }}
      >
        {/* Logo */}
        <Box sx={{ marginBottom: '2rem' }}>
          <img
            src={logo}
            alt="Professional Finder Logo"
            style={{
              width: '300px',
              maxWidth: '90%',
              height: 'auto',
            }}
          />
        </Box>

        {/* Frase principal */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            marginBottom: '2rem',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Sombra para mejor visibilidad
          }}
        >
          Find THE Best Professionals 
        </Typography>

        {/* Botones */}
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Button
            variant="contained"
            onClick={handleClickStart}
            sx={{
              backgroundColor: '#3f51b5',
              color: 'white',
              padding: '1rem 2rem',
              fontSize: '1rem',
            }}
          >
            Get Started
          </Button>
          
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
