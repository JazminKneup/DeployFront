// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SelectionPage from "./pages/SelectionPage";
import ProfessionalRegisterPage from "./pages/ProfessionalRegisterPage";
import UserRegisterPage from "./pages/UserRegisterPage";
import CompleteProfilePage from "./pages/CompleteProfilePage";
import PaymentPage from "./pages/PaymentPage";
import LoginPage from "./pages/LoginPage";
import FinderPage from "./pages/FinderPage";
import AppProvider from "../context/AppProvider";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ProfessionalListPage from "./pages/ProfessionalListPage";
import ProfessionalDetailsForClient from "./pages/ProfessionalDetailsForClient";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/selection" element={<SelectionPage />} />
              <Route
                path="/register/professional"
                element={<ProfessionalRegisterPage />}
              />
              <Route path="/register/user" element={<UserRegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/finder" element={<FinderPage />} />{" "}
              {/* Página de búsqueda */}
              <Route
                path="/complete-profile"
                element={<CompleteProfilePage />}
              />
              <Route path="/payment" element={<PaymentPage />} />{" "}
              {/* Página de pago */}
              <Route path="/profilePage" element={<ProfilePage />} />{" "}
              {/* Página de perfil */}
              <Route
                path="/edit-profilePage"
                element={<EditProfilePage />}
              />{" "}
              {/* Página de edición */}
              <Route
                path="/professional-list"
                element={<ProfessionalListPage />}
              />{" "}
              {/* Página de profesionales */}
              <Route
                path="/professional-details/:id"
                element={<ProfessionalDetailsForClient />}
              />{" "}
              {/* Página de detalles */}
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
