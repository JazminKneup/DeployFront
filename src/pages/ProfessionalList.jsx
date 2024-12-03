import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Rating,
} from "@mui/material";
import axios from "axios";
import logo from "../assets/logo.png"; // Importa el logo

const ProfessionalResultsPage = () => {
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [filters, setFilters] = useState({
    profession: "",
    country: "",
    state: "",
    city: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const professions = [
    "Lawyer",
    "Engineer",
    "Doctor",
    "Architect",
    "Teacher",
    "Electrician",
    "Other",
  ];

  useEffect(() => {
    const fetchProfessionals = async () => {
      console.log("Obteniendo profesionales...");
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get("https://deploybackend-byyx.onrender.com/professionals", {
          headers: { token_user: token },
        });
        console.log("Profesionales registrados:", JSON.stringify(response.data, null, 2));
        setProfessionals(response.data);
        setFilteredProfessionals(response.data);
      } catch (error) {
        console.error("Error al obtener profesionales:", error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfessionals();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
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

    setFilteredProfessionals(filtered);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      profession: "",
      country: "",
      state: "",
      city: "",
    });
    setFilteredProfessionals(professionals);
    setIsFilterOpen(false);
  };

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: "10px" }}>
          Loading professionals...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "2rem" }}>
      {/* Logo */}
      <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "150px",
            height: "auto",
          }}
        />
      </Box>

      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
        Professionals Found
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" textAlign="center" mb={4}>
        {filteredProfessionals.length} results in your area
      </Typography>

      <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsFilterOpen(true)}
        >
          Search by Filters
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredProfessionals.map((professional) => (
          <Grid item xs={12} sm={6} md={4} key={professional.id}>
            <Card
              sx={{
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "1.5rem",
                }}
              >
                <Avatar
                  src={`https://deploybackend-byyx.onrender.com/${professional.profilePicture}`}
                  alt={`${professional.firstName} ${professional.lastName}`}
                  sx={{ width: 80, height: 80, marginBottom: "1rem" }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {professional.firstName} {professional.lastName}
                </Typography>
                <Rating value={professional.rating || 0} readOnly />
                <Typography variant="body2" color="textSecondary">
                  {professional.profession}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {professional.location?.city}, {professional.location?.state},{" "}
                  {professional.location?.country}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  +1 {professional.phoneNumber}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        <DialogTitle>Search Filters</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Profession"
            name="profession"
            value={filters.profession}
            onChange={handleFilterChange}
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
          <TextField
            label="Country"
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="State"
            name="state"
            value={filters.state}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="City"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={clearFilters} color="secondary">
            Clear Filters
          </Button>
          <Button onClick={applyFilters} variant="contained" color="primary">
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfessionalResultsPage;
