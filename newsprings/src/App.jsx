import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./component/nav/Nav";
import Footer from "./component/footer/Footer";
import Scrolldown from "./dependencies/Scrolldown";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import { useUser } from "./context/Usercontext";

const App = () => {
  // const {user, setUser} = useUser()
   const [isAuthenticated, setIsAuthenticated]  = useState(true); // Change initial state to null
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    // const storedAuth = localStorage.getItem("isAuthenticated");
    // const storedUser = localStorage.getItem("user");

    // Simulate a short delay to wait for loading state
    // setTimeout(() => {
      
    //   if (storedAuth === "true" && storedUser) {
    //     setIsAuthenticated(true);
    //     setUser(JSON.parse(storedUser));
    //   } else {
    //     setIsAuthenticated(false);
    //     setUser(null);
    //   }
    //   setIsLoading(false); // Set loading to false after authentication check
    // }, 500); // Optional: Adding a small delay to simulate loading
  }, []);

  if (isLoading) {
    return   <div className="testimonyFormLoader">
    <div className="loader"></div>
  </div>; 
  }
  return (
    <BrowserRouter>
      <Scrolldown />
      <Nav activePage={activePage} setIsAuthenticated={setIsAuthenticated} />
      {isAuthenticated ? (
        <AuthenticatedRoutes setActivePage={setActivePage} isAuthenticated={isAuthenticated} />
      ) : (
        <GuestRoutes setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />
      )}
      <Footer />
    </BrowserRouter>
  );
};

export default App;