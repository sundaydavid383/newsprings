import React from "react";
import "./nav.css";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router";

const Nav = () => {
  return (
    <div className="nav">
      <div className="nav-upper">
        <p className="email">
          <i className="fa-solid fa-envelope"></i>klanohelp@gmail.com
        </p>
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
          <Link to="/">
            <p>HOME</p>
            <div></div>
          </Link>
          <Link to="/about">
            <p>ABOUT</p>
            <div></div>
          </Link>
          <Link to="/watch">
            <p>SERMONS</p>
            <div></div>
          </Link>
          <Link to="/give">
            <p>GIVE</p>
            <div></div>
          </Link>
          <Link to="/locations">
            <p>LOCATIONS</p>
            <div></div>
          </Link>
          <div className="ministy">
            <div
              className="droper"
              onClick={() => {
                document
                  .querySelector(".ministry_dropdown")
                  .classList.toggle("active");
              }}
              to="/locations"
            >
              <p>MINISTIRES<i class="fa-solid fa-caret-down"></i></p>
              <div></div>
            </div>
            <div className="ministry_dropdown">
              <Link
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
