import { useState } from "react";
import axios from 'axios';
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import logo from "../assets/logo.png"; // Importar el logo

function FinderPage() {
  const [searchCriteria, setSearchCriteria] = useState({
    profession: "",
    customProfession: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
  });

  const professions = [
    "Lawyer",
    "Nurse",
    "Plumber",
    "IT Technician",
    "Administrator",
    "Engineer",
    "Teacher",
    "Doctor",
    "Architect",
    "Electrician",
    "Carpenter",
    "Mechanic",
    "Chef",
    "Accountant",
    "Software Developer",
    "Data Analyst",
    "Graphic Designer",
    "Photographer",
    "Marketing Specialist",
    "Translator",
    "Interpreter",
    "Consultant",
    "Dentist",
    "Veterinarian",
    "Pharmacist",
    "Social Worker",
    "Journalist",
    "Writer",
    "Editor",
    "Musician",
    "Artist",
    "Fitness Trainer",
    "Psychologist",
    "Researcher",
    "Pilot",
    "Scientist",
    "Firefighter",
    "Police Officer",
    "Surgeon",
    "Therapist",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => {
      const updatedCriteria = { ...prev, [name]: value };
      console.log("Criterios de búsqueda actualizados:", JSON.stringify(updatedCriteria, null, 2));
      return updatedCriteria;
    });
  };
  

  const handleSearch = async () => {
    console.log("Criterios de búsqueda enviados:", JSON.stringify(searchCriteria, null, 2));
    try {
      const response = await axios.get(
        "https://deploybackend-byyx.onrender.com/client/search-professionals",
        {
          params: searchCriteria,
          headers: { token_user: localStorage.getItem("authToken") },
        }
      );
      console.log("Resultados obtenidos:", JSON.stringify(response.data.professionals, null, 2));
    } catch (error) {
      console.error("Error en la búsqueda:", error.response?.data || error.message);
    }
  };
  
  const applyFilters = () => {
    console.log("Aplicando filtros:", JSON.stringify(filters, null, 2));
    let filtered = professionals;
  
    if (filters.profession) {
      filtered = filtered.filter((prof) => prof.profession === filters.profession);
    }
    if (filters.country) {
      filtered = filtered.filter((prof) => prof.location?.country === filters.country);
    }
    if (filters.state) {
      filtered = filtered.filter((prof) => prof.location?.state === filters.state);
    }
    if (filters.city) {
      filtered = filtered.filter((prof) => prof.location?.city === filters.city);
    }
  
    console.log("Profesionales filtrados:", JSON.stringify(filtered, null, 2));
    setFilteredProfessionals(filtered);
    setIsFilterOpen(false);
  };
  
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <Box sx={{ marginBottom: "2rem" }}>
          <img
            src={logo}
            alt="Professional Finder Logo"
            style={{
              maxWidth: "200px",
              width: "100%",
              height: "auto",
            }}
          />
        </Box>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          What kind of Professionals are you looking for?
        </Typography>

        <TextField
          select
          label="Profession"
          name="profession"
          value={searchCriteria.profession}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        >
          {professions.map((profession) => (
            <MenuItem key={profession} value={profession}>
              {profession}
            </MenuItem>
          ))}
        </TextField>

        {/* Campo adicional si se selecciona "Other" */}
        {searchCriteria.profession === "Other" && (
          <TextField
            label="Specify Profession"
            name="customProfession"
            value={searchCriteria.customProfession}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        )}

        <TextField
          label="Country"
          name="country"
          value={searchCriteria.country}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="State"
          name="state"
          value={searchCriteria.state}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="City"
          name="city"
          value={searchCriteria.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="Zipcode"
          name="zipcode"
          value={searchCriteria.zipcode}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          fullWidth
          sx={{
            padding: "0.75rem",
            fontSize: "1rem",
            backgroundColor: "#3f51b5",
            color: "white",
            borderRadius: "8px",
            marginTop: "1rem",
          }}
        >
          Find
        </Button>
      </Box>
    </Box>
  );
}

export default FinderPage;
