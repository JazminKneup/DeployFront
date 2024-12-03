import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { AppContext } from "../../context/AppProvider"; // Importar el contexto
import logo from '../assets/logo.png'; // Importar el logo

function LoginPage() {
  const { state, setState } = useContext(AppContext); // Usar el contexto
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Mostrar el indicador de carga
    try {
      const response = await axios.post(
        "https://deploybackend-byyx.onrender.com/user/login",
        form
      );

      const { token, user, hasProfile } = response.data; // Obtener hasProfile de la respuesta

      console.log("Login response:", response.data); // Para depuración

      // Guardar datos en el almacenamiento local
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");

      // Actualizar el estado global
      setState({ ...state, user, isAuthenticated: true });

      // Redirigir según el estado del perfil
      if (user.role === "professional") {
        if (hasProfile) {
          navigate("/profilePage"); // Redirige a la página del perfil
        } else {
          navigate("/complete-profile"); // Redirige a completar el perfil
        }
      } else if (user.role === "client") {
        navigate("/finder"); // Redirige a la página de búsqueda para usuarios
      } else {
        // Manejar otros roles o casos
        console.warn("Unknown user role:", user.role);
        setErrorMessage("Unknown user role.");
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
      setErrorMessage("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false); // Detener el indicador de carga
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        maxWidth: "400px",
        width: "90%",
        margin: "2rem auto",
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        textAlign: "center", // Centrar contenido
      }}
    >
      {/* Logo */}
      <Box sx={{ marginBottom: "1rem" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            maxWidth: "200px",
            display: "block",
            margin: "0 auto",
          }}
        />
      </Box>

      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Enter credentials to login
      </Typography>
      {errorMessage && (
        <Typography variant="body2" color="error" gutterBottom>
          {errorMessage}
        </Typography>
      )}
      <TextField
        label="Email Address"
        name="email"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleChange}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleChange}
        required
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ padding: "0.75rem", fontSize: "1rem", marginTop: "1rem" }}
        disabled={isLoading} // Desactiva el botón mientras carga
      >
        {isLoading ? <CircularProgress size={24} /> : "Login"}
      </Button>
      <Typography variant="body2" align="center" sx={{ marginTop: "1rem" }}>
        Don't have an account?{" "}
        <Link
          to="/register/user"
          style={{ color: "#3f51b5", textDecoration: "none" }}
        >
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
}

export default LoginPage;
