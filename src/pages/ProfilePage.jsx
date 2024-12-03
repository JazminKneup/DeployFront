import { useState, useEffect } from "react";
import axios from "axios";
import EditProfilePage from "./EditProfilePage";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css"; // Importar el archivo CSS
import logo from "../assets/logo.png"; // Importar el logo

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No token found! Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("https://deploybackend-byyx.onrender.com/professional/view-profile", {
        headers: {
          token_user: token,
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error.message);
      setError("Error al obtener perfil");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (updatedProfile) => {
    try {
      if (!updatedProfile || !updatedProfile.user) {
        await fetchProfile();
      } else {
        setProfile(updatedProfile);
      }
      setEditMode(false);
    } catch (error) {
      console.error("Error fetching updated profile:", error.message);
      setError("Error al obtener perfil actualizado.");
    }
  };

  if (error) return <div className="error">{error}</div>;
  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="profile-box">
        {/* Logo en la parte superior */}
        <div className="profile-logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>

        <h1>Professional Profile</h1>
        {editMode ? (
          <EditProfilePage
            onSave={handleSave}
            onCancel={() => setEditMode(false)}
          />
        ) : (
          <div>
            <div className="profile-avatar">
              <img
                src={`https://deploybackend-byyx.onrender.com/${profile.profilePicture}`}
                alt="Profile"
                className="avatar-image"
              />
            </div>
            <h2>
              {profile.user.firstName} {profile.user.lastName}
            </h2>
            <div className="profile-details">
              <p className="profile-detail">
                <span className="label">Email:</span> {profile.user.email}
              </p>
              <p className="profile-detail">
                <span className="label">Profession:</span> {profile.profession}
              </p>
              <p className="profile-detail">
                <span className="label">License Number:</span> {profile.licenseNumber}
              </p>
              <p className="profile-detail">
                <span className="label">Description:</span> {profile.description}
              </p>
              <p className="profile-detail">
                <span className="label">Phone Number:</span> {profile.phoneNumber}
              </p>
              <p className="profile-detail">
                <span className="label">WhatsApp:</span> {profile.whatsappNumber}
              </p>
              <p className="profile-detail">
                <span className="label">Location:</span> {profile.location?.city},{" "}
                {profile.location?.state}, {profile.location?.country}
              </p>
            </div>

            <button className="edit-button" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
