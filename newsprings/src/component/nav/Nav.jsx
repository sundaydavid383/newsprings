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
                to="/next-steps"
              >
                <p>NEXT STEPS</p>
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
