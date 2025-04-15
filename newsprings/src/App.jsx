import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./component/nav/Nav";
import Footer from "./component/footer/footer";
import Scrolldown from "./dependencies/Scrolldown";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import { useUser } from "./context/Usercontext";

const App = () => {
  const {user, setUser} = useUser()
  const [activePage, setActivePage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") !== "true");
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("user")
     if (storedAuth === "true" && storedAuth){
      setIsAuthenticated(true)
      setUser(JSON.parse(storedUser))
     }
     else{
      setIsAuthenticated(false);
       setUser(null);
     }
  }, []);
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