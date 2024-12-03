import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Avatar } from "@mui/material";
import axios from "axios";
import logo from "../assets/logo.png"; // Importa el logo

const ProfessionalDetailsForClient = () => {
  const { id } = useParams();
  const [professional, setProfessional] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Professional ID:", id); // Verifica el ID recibido
    const fetchProfessionalDetails = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get(
          `https://deploybackend-byyx.onrender.com/client/professional/${id}`,
          {
            headers: { token_user: token },
          }
        );
        setProfessional(response.data);
      } catch (err) {
        console.error("Error fetching professional details:", err.response);
        setError(err.response?.data?.message || "Error fetching details.");
      }
    };

    fetchProfessionalDetails();
  }, [id]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!professional) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        padding: "2rem",
        textAlign: "center", // Centra el contenido
        maxWidth: "600px",
        margin: "0 auto", // Centra la caja en la página
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Logo */}
      <Box sx={{ marginBottom: "1.5rem" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "100px",
            height: "auto",
          }}
        />
      </Box>

      {/* Detalles del profesional */}
      <Avatar
        src={`https://deploybackend-byyx.onrender.com/${professional.profilePicture}`}
        alt={professional.profession}
        sx={{ width: 100, height: 100, margin: "0 auto", marginBottom: "1rem" }}
      />
      <Typography variant="h4" fontWeight="bold">
        {professional.user.firstName} {professional.user.lastName}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "1rem" }}>
        <strong>Profession:</strong> {professional.profession}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
        <strong>Description:</strong> {professional.description}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
        <strong>Location:</strong> {professional.location?.city},{" "}
        {professional.location?.state}, {professional.location?.country}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
        <strong>Email:</strong> {professional.user.email}
      </Typography>
      {professional.phoneNumber && (
        <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
          <strong>Phone:</strong> {professional.phoneNumber}
        </Typography>
      )}
      {professional.whatsappNumber && (
        <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
          <strong>WhatsApp:</strong> {professional.whatsappNumber}
        </Typography>
      )}
    </Box>
  );
};

export default ProfessionalDetailsForClient;
