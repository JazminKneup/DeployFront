import { useState, useContext } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppProvider';
import logo from '../assets/logo.png';

function CompleteProfilePage() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const userId = state.user?.id;
  const token = localStorage.getItem('authToken');

  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    profession: '',
    registrationNumber: '',
    description: '',
    phoneNumber: '',
    whatsappNumber: '',
    profilePicture: null,
    country: '',
    state: '',
    city: '',
    zipcode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      profilePicture: e.target.files[0],
    }));
  };

  const handleSubmitStep1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/professional/add-professional-info',
        {
          userId,
          profession: profile.profession,
          licenseNumber: profile.registrationNumber,
          description: profile.description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            token_user: token,
          },
        }
      );
      setProfile((prevProfile) => ({
        ...prevProfile,
        profileId: response.data.profileId,
      }));
      setStep(step + 1);
    } catch (error) {
      console.error('Error en el paso 1:', error.response?.data || error.message);
    }
  };

  const handleSubmitStep2 = async (e) => {
    e.preventDefault();
    if (!profile.profileId) {
      console.error('Error: profileId no está definido.');
      return;
    }
    const formData = new FormData();
    formData.append('profileId', profile.profileId);
    formData.append('phoneNumber', profile.phoneNumber);
    formData.append('whatsappNumber', profile.whatsappNumber);
    if (profile.profilePicture) {
      formData.append('profilePicture', profile.profilePicture);
    }
    try {
      const response = await axios.post(
        'https://deploybackend-byyx.onrender.com/professional/add-contact-info',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token_user: token,
          },
        }
      );
      setStep(step + 1);
    } catch (error) {
      console.error('Error en el paso 2:', error.response?.data || error.message);
    }
  };

  const handleSubmitStep3 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/professional/add-location-info',
        {
          profileId: profile.profileId,
          country: profile.country,
          state: profile.state,
          city: profile.city,
          zipCode: profile.zipcode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            token_user: token,
          },
        }
      );
      navigate('/profilePage');
    } catch (error) {
      console.error('Error en el paso 3:', error.response?.data || error.message);
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
        component="form"
        onSubmit={
          step === 1
            ? handleSubmitStep1
            : step === 2
            ? handleSubmitStep2
            : handleSubmitStep3
        }
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
        {/* Logo en la parte superior */}
        <Box sx={{ marginBottom: '1rem' }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: '100px', // Ajustar el tamaño del logo
              margin: '0 auto', // Centrar el logo
              display: 'block',
            }}
          />
        </Box>

        <Typography variant="h5" sx={{ mb: 2 }}>
          {step === 1
            ? 'Step 1: Professional Info'
            : step === 2
            ? 'Step 2: Contact Info'
            : 'Step 3: Location Info'}
        </Typography>
        {step === 1 && (
          <>
            <TextField
              label="Profession"
              name="profession"
              value={profile.profession}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="License Number"
              name="registrationNumber"
              value={profile.registrationNumber}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              name="description"
              value={profile.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Next
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="WhatsApp Number"
              name="whatsappNumber"
              value={profile.whatsappNumber}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{ mb: 2 }}
            >
              Upload Profile Picture
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Next
            </Button>
          </>
        )}
        {step === 3 && (
          <>
            <TextField
              label="Country"
              name="country"
              value={profile.country}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="State"
              name="state"
              value={profile.state}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="City"
              name="city"
              value={profile.city}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Zip Code"
              name="zipcode"
              value={profile.zipcode}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default CompleteProfilePage;

