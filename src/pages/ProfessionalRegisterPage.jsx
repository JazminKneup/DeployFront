import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Box,
  Modal,
} from '@mui/material';
import axios from 'axios';
import logo from '../assets/logo.png';

function ProfessionalRegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
    userType: '',
  });

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (location.state) {
      setForm((prevForm) => ({
        ...prevForm,
        role: location.state.userType,
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setForm({ ...form, terms: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.terms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    try {
      await axios.post('https://deploybackend-byyx.onrender.com/user/new', form);
      alert('Professional registered successfully');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Error registering professional');
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
     <Box
  component="form"
  onSubmit={handleSubmit}
  sx={{
    maxWidth: '400px',
    width: '90%',
    margin: '2rem auto',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  }}
>
  {/* Logo */}
  <Box sx={{ marginBottom: '0.5rem' }}> {/* Reducido el margen inferior */}
    <img
      src={logo}
      alt="Logo"
      style={{
        maxWidth: '00px',
        display: 'block',
        margin: '0 auto',
      }}
    />
  </Box>

  <Typography variant="h5" gutterBottom>
    Professional Registration
  </Typography>
  <Typography variant="subtitle1" color="textSecondary" gutterBottom>
    Enter your details to register as a professional
  </Typography>


        <TextField
          label="First Name"
          name="firstName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.firstName}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          name="lastName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.lastName}
          onChange={handleChange}
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="Enter Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={form.terms}
              onChange={handleCheckboxChange}
            />
          }
          label={
            <span onClick={handleOpenModal} style={{ cursor: 'pointer', color: '#3f51b5' }}>
              I Agree With Terms & Conditions
            </span>
          }
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          style={{ padding: '1rem', fontSize: '1rem', marginTop: '1rem' }}
        >
          Register as Professional
        </Button>

        <Typography variant="body2" align="center" sx={{ marginTop: '1rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#3f51b5', textDecoration: 'none' }}>
            Sign In
          </Link>
        </Typography>
      </Box>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="terms-modal-title"
        aria-describedby="terms-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
            overflowY: 'auto',
            maxHeight: '80vh',
          }}
        >
          <Typography id="terms-modal-title" variant="h6" component="h2">
            Terms and Conditions of Use
          </Typography>
          <Typography id="terms-modal-description" sx={{ mt: 2, textAlign: 'justify' }}>
            <strong>Last updated:</strong> [Date]
            <br /><br />
            Welcome to Professionals Finder. By using our application, you agree to the terms and conditions outlined below. If you do not agree with these terms, please refrain from using our services.
            <br /><br />
            <strong>1. Definitions</strong>
            <p>Application: Refers to the Professionals Finder platform, available for mobile devices and the web...</p>
            <p>Professional: A person who registers as a subscriber on the application to offer their services.</p>
            <p>User: A person who uses the application to search for and contact professionals without paying a fee.</p>
            <p>Subscription: A monthly or annual payment plan purchased by Professionals to list their profiles in the database.</p>
            <strong>2.Description of Service...</strong>
            <p>Professionals Finder is a platform that:</p>
            <p>Facilitates contact between Users and independent Professionals.</p>
            <p>Allows Professionals to subscribe to a monthly or annual plan to display their profile in the database.</p>
            <p>Provides Users with free access to search for Professionals by location and specialization..</p>
            <p>The application does not guarantee the quality, legality, or suitability of the services offered by the Professionals.</p>

            <strong>3. Registration and Use of the Platform...</strong>
            <h4>3.1 Professionals</h4>
            <p>When registering, Professionals must provide accurate, complete, and updated information, including:</p>
            <p>Full name.</p>
            <p>Email address.</p>
            <p>Phone number.</p>
            <p>Office geolocation.</p>
            <p>Professionals are responsible for keeping their information updated and complying with the laws applicable to their profession.</p>

            <strong>3.2 Users</strong>
            <p>Users can access the application without registering or paying but must refrain from:</p>
            <p>Using the platform for fraudulent or illegal purposes.</p>
            <p>Contacting Professionals for purposes unrelated to their listed services.</p>

            <strong>4. Subscription and Payment Policies</strong>
            <p>1. Subscription plans: Professionals may choose between monthly or annual subscriptions based on the current rates published in the app.</p>
            <p>2. 2. Auto-renewal: Subscriptions automatically renew at the end of the chosen period unless canceled by the Professional before the renewal date.</p>
            <p>3. Cancellations and refunds:</p>
            <p>Professionals may cancel their subscription at any time; however, no refunds will be issued for unused periods.</p>
            <p>4. 4. Professionals Finder reserves the right to modify subscription fees with prior notice.</p>

            <strong>5. Data Collection and Usage</strong>
            <p>The app collects data from Professionals to provide the service, including:</p>
            <p>Email address.</p>
            <p>Professional registration number.</p>
            <p>Phone number.</p>
            <p>Office geolocation.</p>
            <p>For more details, please refer to our Privacy Policy, which explains how we protect and use your information.</p>

            <strong> 6. Limitation of Liability</strong>
            <p>Professionals Finder acts as an intermediary between Users and Professionals. We are not responsible for:</p>
            <p>The quality or results of services provided by Professionals.</p>
            <p>Incorrect or outdated information provided by Professionals.</p>
            <p>Issues arising from contact or agreements between Users and Professionals.</p>

            <strong>7. Account Suspension or Termination</strong>
            <p>We reserve the right to suspend or terminate accounts that:</p>
            <p>Provide false information.</p>
            <p>Violate these Terms and Conditions.</p>
            <p>Are used for illegal or fraudulent activities.</p>

            <strong>8. Intellectual Property</strong>
            <p>All rights to the application, including its design, logo, and content, belong to Professionals Finder. Copying, modifying, or distributing any part of the platform without prior authorization is prohibited.</p>

            <strong>9. Modifications to Terms and Conditions</strong>
            <p>We reserve the right to update these Terms and Conditions at any time. Changes will be notified through the application and will take effect 30 days after notification.</p>

            <strong>10. Governing Law</strong>
            <p>These Terms and Conditions are governed by the laws of [Country/Region]. Any disputes will be resolved in the courts of [City/Country].</p>

            <strong>If you have any questions or concerns, please contact us at [support email address]
            Thank you for using Professionals Finder.</strong>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default ProfessionalRegisterPage;
