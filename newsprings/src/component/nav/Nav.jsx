import "./nav.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import React, { useState,  } from "react";
import { useUser } from "../../context/Usercontext"; // Adjust the path based on your project

const Nav = ({ activePage, setIsAuthenticated }) => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  const handleColorClick = () => {
    document.documentElement.style.setProperty(
      "--background-color",
      isDark ? "white" : "rgb(32, 32, 34)"
    );
     document.documentElement.style.setProperty(
      "--nav-color",
      isDark ? "white" : "black"
    );
    document.documentElement.style.setProperty(
      "--text-color",
      isDark ? "black" : "white"
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      isDark ? "rgb(5, 4, 65)" : "rgba(199, 199, 224, 0.7)"
    );
        document.documentElement.style.setProperty(
      "--box-shadow",
      isDark ? "0px 0px 18px 1px rgba(34, 34, 34,.4);" : "0px 0px 18px 1px rgba(255, 255, 255, 0.4);"
    );
     document.documentElement.style.setProperty(
      "--light-text-color",
      isDark ? "rgb(122, 122, 122)" : "rgb(207, 204, 204)"
    );
    document.documentElement.style.setProperty(
      "--gray",
      isDark ? "rgb(209, 209, 209)" : "rgb(127, 127, 128)"
    );

    
    
    
    
    setIsDark(!isDark);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    console.log(user);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setShowUserDetails(false)
     // Optionally store in localStorage
    // Redirect to the login page
    navigate("/signin"); // or use <Navigate /> to redirect
  };
  console.log("user",user);
  return (
    <div className="nav">
      <div className="nav-upper">
        <i
      className={`fa ${isDark ? "fa-sun" : "fa-moon"}`}
      onClick={handleColorClick}
      style={{ cursor: "pointer", fontSize: "24px" }}
    ></i>
        <a href="mailto:rccgnewsprings@yahoo.com" className="email">
          <i className="fa-solid fa-envelope"></i>rccgnewsprings@yahoo.com
        </a>
        <Link className="" to="/search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <p>Search</p>
        </Link>
        {user && (
  <div className="user_holder">
    <div className="iconactive user" onClick={() => setShowUserDetails(prev => !prev)}>
      <h3>{user.firstName.slice(0, 2)}</h3>
    </div>

    {showUserDetails && (
      <div className="user_dropdown">
        <i onClick={()=>setShowUserDetails(false)} className="fa-solid fa-times iconactive"></i>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button className="btn" onClick={handleLogout}>
          <p>Logout<i className="fa-solid fa-right-from-bracket"></i></p> 
        </button>
      </div>
    )}
  </div>
)}
      </div>
      <div className="nav-lower">
        <Link to="/" className="logo">
          <img src={logo} alt="" />
        </Link>
        <div className="links">
          <Link className={`${activePage == "home" ? "active" : ""}`} to="/">
            <p>HOME</p>
            <div></div>
          </Link>
          <Link
            className={`${activePage == "about" ? "active" : ""}`}
            to="/mission-and-vision"
          >
            <p>ABOUT</p>
            <div></div>
          </Link>
          <Link
            className={`${activePage == "sermons" ? "active" : ""}`}
            to="/sermon"
          >
            <p>SERMONS</p>
            <div></div>
          </Link>
          <Link
            className={`${activePage == "giving" ? "active" : ""}`}
            to="/giving"
          >
            <p>GIVE</p>
            <div></div>
          </Link>
          <Link
            className={`${activePage == "share-testimony" ? "active" : ""}`}
            to="/share-testimony"
          >
            <p>SHARE TESTIMONY</p>
            <div></div>
          </Link>
          <Link
            className={`${activePage == "locations" ? "active" : ""}`}
            to="/locations"
          >
            <p>LOCATIONS</p>
            <div></div>
          </Link>
          <div className="ministry">
            <div
              className="droper"
              onClick={() => {
                document
                  .querySelector(".ministry_dropdown")
                  .classList.toggle("active");
              }}
            >
              <p>
                MINISTRIES <i className="fa-solid fa-caret-down"></i>
              </p>
              <div></div>
            </div>
            <div className="ministry_dropdown">
              <Link
                className={`dropdown_link ${
                  activePage == "testimonies" ? "active" : ""
                }`}
                onClick={() => {
                  document
                    .querySelector(".ministry_dropdown")
                    .classList.remove("active");
                }}
                to="/stories"
              >
                <p>TESTIMONIES</p>
                <div></div>
              </Link>
              <Link
                className={`dropdown_link ${
                  activePage == "ministries" ? "active" : ""
                }`}
                onClick={() => {
                  document
                    .querySelector(".ministry_dropdown")
                    .classList.remove("active");
                }}
                to="/ministries"
              >
                <p>MINISTRIES</p>
                <div></div>
              </Link>
              <Link
                className={`dropdown_link ${
                  activePage == "next-steps" ? "active" : ""
                }`}
                onClick={() => {
                  document
                    .querySelector(".ministry_dropdown")
                    .classList.remove("active");
                }}
                to="/baptisim"
              >
                <p>WATER BAPTISMS</p>
                <div></div>
              </Link>
              <Link
                className={`dropdown_link ${
                  activePage == "events" ? "active" : ""
                }`}
                onClick={() => {
                  document
                    .querySelector(".ministry_dropdown")
                    .classList.remove("active");
                }}
                to="/events"
              >
                <p>EVENTS</p>
                <div></div>
              </Link>
              <Link
                className={`dropdown_link ${
                  activePage == "membership" ? "active" : ""
                }`}
                onClick={() => {
                  document
                    .querySelector(".ministry_dropdown")
                    .classList.remove("active");
                }}
                to="/membership-class"
              >
                <p>BELIVERS CLASS</p>
                <div></div>
              </Link>
            </div>
          </div>
        </div>
        <Link className="btn" to="/contact">
          <p>
            CONTACT <i className="fa-solid fa-arrow-right-long"></i>
          </p>
          <div></div>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
