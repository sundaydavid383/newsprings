import React from "react";
import "./nav.css";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router";

const Nav = ({activePage}) => {
  return (
    <div className="nav">
      <div className="nav-upper">
        <a href="mailto:klanohelp@gmail" className="email">
          <i className="fa-solid fa-envelope"></i>klanohelp@gmail.com
        </a>
        <Link className="" to="/search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <p>Search</p>
        </Link>

        <Link className="" to="/signup">
          <i class="fa-solid fa-circle-user"></i>
          <p>Sign Up</p>
        </Link>
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
  <Link className={`${activePage == "about" ? "active" : ""}`} to="/mission-and-vision">
    <p>ABOUT</p>
    <div></div>
  </Link>
  <Link className={`${activePage == "sermons" ? "active" : ""}`} to="/sermon">
    <p>SERMONS</p>
    <div></div>
  </Link>
  <Link className={`${activePage == "giving" ? "active" : ""}`} to="/giving">
    <p>GIVE</p>
    <div></div>
  </Link>
  <Link className={`${activePage == "share-testimony" ? "active" : ""}`} to="/share-testimony">
    <p>SHARE TESTIMONY</p>
    <div></div>
  </Link>
  <Link className={`${activePage == "locations" ? "active" : ""}`} to="/locations">
    <p>LOCATIONS</p>
    <div></div>
  </Link>
  <div className="ministry">
    <div
      className="droper"
      onClick={() => {
        document.querySelector(".ministry_dropdown").classList.toggle("active");
      }}
    >
      <p>MINISTRIES <i className="fa-solid fa-caret-down"></i></p>
      <div></div>
    </div>
    <div className="ministry_dropdown">
      <Link
        className={`${activePage == "testimonies" ? "active" : ""}`}
        onClick={() => {
          document.querySelector(".ministry_dropdown").classList.remove("active");
        }}
        to="/stories"
      >
        <p>TESTIMONIES</p>
        <div></div>
      </Link>
      <Link
        className={`${activePage == "ministries" ? "active" : ""}`}
        onClick={() => {
          document.querySelector(".ministry_dropdown").classList.remove("active");
        }}
        to="/ministries"
      >
        <p>MINISTRIES</p>
        <div></div>
      </Link>
      <Link
        className={`${activePage == "next-steps" ? "active" : ""}`}
        onClick={() => {
          document.querySelector(".ministry_dropdown").classList.remove("active");
        }}
        to="/next-steps"
      >
        <p>NEXT STEPS</p>
        <div></div>
      </Link>
      <Link
        className={`${activePage == "events" ? "active" : ""}`}
        onClick={() => {
          document.querySelector(".ministry_dropdown").classList.remove("active");
        }}
        to="/events"
      >
        <p>EVENTS</p>
        <div></div>
      </Link>
      <Link
        className={`${activePage == "membership" ? "active" : ""}`}
        onClick={() => {
          document.querySelector(".ministry_dropdown").classList.remove("active");
        }}
        to="/membership-class"
      >
        <p>BELIVERS CLASS</p>
        <div></div>
      </Link>
    </div>
  </div>
</div>
        <Link className="btn" to="/connect">
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
