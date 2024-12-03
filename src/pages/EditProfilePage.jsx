import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Avatar, Stack } from "@mui/material";
import logo from "../assets/logo.png"; // Importar el logo

const EditProfilePage = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found! Please log in.");
        setError("No token found! Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          `https://deploybackend-byyx.onrender.com/professional/view-profile`,
          {
            headers: {
              token_user: token,
            },
          }
        );
        setFormData(response.data);
      } catch (error) {
        console.error(
          "Error fetching profile for editing:",
          error.response?.data || error.message
        );
        setError("Error fetching profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const field = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "location") {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (profilePicture) {
        formDataToSend.append("profilePicture", profilePicture);
      }

      const response = await axios.put(
        `https://deploybackend-byyx.onrender.com/professional/edit-profile`,
        formDataToSend,
        {
          headers: {
            token_user: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onSave(response.data.updatedProfile);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
      setError("Error updating profile.");
    }
  };

  if (error) return <Typography color="error">{error}</Typography>;
  if (!formData) return <Typography>Loading...</Typography>;

  return (
    <Box
      component="form"
      onSubmit={handleEditSubmit}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      {/* Logo */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            maxWidth: "100px",
            height: "auto",
          }}
        />
      </Box>

      <Typography variant="h4" textAlign="center" mb={3}>
        Edit Professional Profile
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Profession"
          name="profession"
          value={formData.profession || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="License Number"
          name="licenseNumber"
          value={formData.licenseNumber || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={3}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="WhatsApp Number"
          name="whatsappNumber"
          value={formData.whatsappNumber || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Country"
          name="location.country"
          value={formData.location?.country || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="State"
          name="location.state"
          value={formData.location?.state || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="City"
          name="location.city"
          value={formData.location?.city || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Zip Code"
          name="location.zipCode"
          value={formData.location?.zipCode || ""}
          onChange={handleInputChange}
          fullWidth
        />
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            alt="Profile Picture"
            src={
              formData.profilePicture
                ? `https://deploybackend-byyx.onrender.com/${formData.profilePicture}`
                : undefined
            }
            sx={{ width: 80, height: 80 }}
          />
          <Button variant="outlined" component="label">
            Upload Picture
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button type="button" variant="outlined" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EditProfilePage;
