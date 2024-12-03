import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.setItem("isAuthenticated", "false");
    navigate("/login");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#3F51B5" }}>
      <Toolbar>
        {/* Título o logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Professionals Finder
        </Typography>

        {/* Navegación */}
        <Box>
          <Button
            onClick={() => navigate("/profilePage")}
            sx={{
              backgroundColor: "white",
              color: "#3F51B5",
              marginLeft: "10px",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            Profile
          </Button>
          <Button
            onClick={() => navigate("/profilePage")}
            sx={{
              backgroundColor: "white",
              color: "#3F51B5",
              marginLeft: "10px",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            Dashboard
          </Button>
        </Box>

        {/* Botón de logout */}
        <Button
          color="inherit"
          onClick={handleLogout}
          sx={{
            backgroundColor: "#424242", // Gris oscuro
            color: "white",
            marginLeft: "10px",
            "&:hover": { backgroundColor: "#616161" }, // Más claro al pasar el cursor
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
