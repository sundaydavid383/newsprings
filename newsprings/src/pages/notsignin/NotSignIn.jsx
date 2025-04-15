import React from 'react';
import "./notsignin.css"
import image1 from "../../assets/church5.jpg"
import notsignin from "../../assets/notsignin.png"
import { Link } from 'react-router-dom';

const NotSignIn = () => {
  return (
    <div className='container notsignin'>
        <div className="notsigninimage">
        <span></span>
            <img src={image1} alt="" />
        </div>
        <div className="notsinginimage_text">
            <img src={notsignin} alt="" />
        <h2>You are not signed in!</h2>
        <div className="links">
        <Link className='btn' to="/signin"><p>Go to Sign In <i className="fa-solid fa-arrow-right"></i> </p></Link>
        <Link className='btn' to="/signup"><p>Create an Account <i className="fa-solid fa-arrow-right"></i> </p></Link>
        </div>

        </div>

    </div>
  );
};

export default NotSignIn;
