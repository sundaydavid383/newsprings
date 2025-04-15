import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import NotSignIn from "../pages/notsignin/NotSignIn";
import { Routes, Route, Navigate } from "react-router";

const GuestRoutes = ({ setIsAuthenticated, isAuthenticated }) => {
  return (
    <Routes>
      <Route
        path="/signin"
        element={isAuthenticated ? <Navigate to="/" /> : <SignIn setIsAuthenticated={setIsAuthenticated} />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/" /> : <SignUp setIsAuthenticated={setIsAuthenticated}  />}
      />
      <Route path="/notsignin" element={<NotSignIn />} />
      <Route path="*" element={<NotSignIn />} />
    </Routes>
  );
};

export default GuestRoutes;