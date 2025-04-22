import React, { useState } from "react";
import image1 from "../../assets/church10.jpg";
import "./sign.css" // 
import { useNavigate, Link} from "react-router";
import axios from "axios";
import { useUser } from "../../context/Usercontext";


const SignUp = ({setIsAuthenticated}) => {
  const [showOtpInput, setShowOtpInput] = useState(false);
const [otp, setOtp] = useState("");
const [isOtpSent, setIsOtpSent] = useState(false);
  const {user, setUser } = useUser();
  const navigate = useNavigate();
  const [alertText, setAlertText] = useState(
    "I am here to alert to alert you about your problems"
  );
  const [alert, setAlert] = useState(false)
  const [loading, setLoading] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
    gender: "",
    occupation: "",
    hearAboutUs: "",
    interest: "",
    prayerRequest: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const maxLengths = {
    firstName: 50,
    lastName: 50,
    password: 50,
    phone: 20,
    occupation: 50,
    prayerRequest: 300,
  };
  const minLengths = {
    firstName: 2,
    lastName: 2,
    password: 6,
    phone: 7,
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (isOtpSent && showOtpInput) {
      // 2nd stage: Verify OTP and Register user
      try {
        setLoading(true);
        const verifyResponse = await axios.post("http://localhost:4000/verify-otp", {
          email: formData.email,
          otp,
        });
  
        if (!verifyResponse.data.success) {
          setAlertText("Invalid OTP. Please check your email and try again.");
          setAlert(true);
          setLoading(false);
          return;
        }
  
        const response = await axios.post("http://localhost:4000/register", formData);
        if (response.data.success) {
          setAlertText(`${response.data.message}. Check your inbox or spam.`);
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            dob: "",
            phone: "",
            gender: "",
            occupation: "",
            hearAboutUs: "",
            interest: "",
            prayerRequest: "",
          });
          setShowOtpInput(false);
          setOtp("");
        }
  
        setLoading(false);
      } catch (err) {
        let errorMessage = "Registration failed. Please try again."

         if(err.response && err.response.data && err.response.data.message){
          errorMessage = err.response.data.message;
         }
        setAlertText(errorMessage);
        setAlert(true);
        setLoading(false);
      }
      return;
    }
  
    else{
          const requiredFields = [
      "firstName", "lastName", "email", "password",
      "dob", "phone", "gender", "occupation",
      "hearAboutUs", "interest", "prayerRequest"
    ];
  
    for (const field of requiredFields) {
      if (!formData[field]) {
        setAlertText(`Please enter your ${field}.`);
        setAlert(true);
        return;
      }
    }
  
    // First Name
    if (formData.firstName.length > maxLengths.firstName) {
      setAlertText("First name is too long.");
      setAlert(true);
      return;
    }
    if (formData.firstName.length < minLengths.firstName) {
      setAlertText("First name is too short.");
      setAlert(true);
      return;
    }
  
    // Last Name
    if (formData.lastName.length > maxLengths.lastName) {
      setAlertText("Last name is too long.");
      setAlert(true);
      return;
    }
    if (formData.lastName.length < minLengths.lastName) {
      setAlertText("Last name is too short.");
      setAlert(true);
      return;
    }
  
    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setAlertText("Please enter a valid email address.");
      setAlert(true);
      return;
    }
  
    // Password
    if (formData.password.length < minLengths.password) {
      setAlertText("Password is too short. Use at least 6 characters.");
      setAlert(true);
      return;
    }
    if (formData.password.length > maxLengths.password) {
      setAlertText("Password is too long.");
      setAlert(true);
      return;
    }
  
    // Phone
    if (formData.phone.length < minLengths.phone) {
      setAlertText("Phone number is too short.");
      setAlert(true);
      return;
    }
    if (formData.phone.length > maxLengths.phone) {
      setAlertText("Phone number is too long.");
      setAlert(true);
      return;
    }
    if (!/^\d+$/.test(formData.phone)) {
      setAlertText("Phone number must contain only digits.");
      setAlert(true);
      return;
    }
  
    // // dob
    // if (!/^\d{1,2}$/.test(formData.dob)) {
    //   setAlertText("Please enter a valid dob (1-99).");
    //   setAlert(true);
    //   return;
    // }
  
    // Gender
    if (!["male", "female"].includes(formData.gender)) {
      setAlertText("Please select a valid gender.");
      setAlert(true);
      return;
    }
  
    // Occupation
    if (formData.occupation.length > maxLengths.occupation) {
      setAlertText("Occupation is too long.");
      setAlert(true);
      return;
    }
  
    // hearAboutUs
    const validSources = [
      "Friend/Family", "Church Event", "Facebook", "Instagram",
      "Twitter/X", "YouTube", "TikTok", "Flyer/Poster", "Walk-in", "Other"
    ];
    if (!validSources.includes(formData.hearAboutUs)) {
      setAlertText("Please select a valid option for how you heard about us.");
      setAlert(true);
      return;
    }
  
    // interest
    const validInterests = [
      "Choir", "Technical Team", "Evangelism", "Prayer Team",
      "Ushering", "Children Ministry", "Follow-up/Visitation"
    ];
    if (!validInterests.includes(formData.interest)) {
      setAlertText("Please select a valid area of interest.");
      setAlert(true);
      return;
    }
  
    // Prayer Request
    if (formData.prayerRequest.length > maxLengths.prayerRequest) {
      setAlertText("Prayer request is too long.");
      setAlert(true);
      return;
    }
  
    try {
      setLoading(true);

      //verify if email already use
      const checkEmailRes = await axios.post("http://localhost:4000/check-email", {
        email: formData.email,
      });

      if(!checkEmailRes.data.success){
        setAlertText(
          <>
            {checkEmailRes.data.message}{" "}
            <Link to="/signin" style={{ color: "blue", textDecoration: "underline" }}>
              Click here to sign in.
            </Link>
          </>
        );
        setAlert(true);
        setLoading(false);
        return;
      }
  // Send OTP
    const otpResponse = await axios.post("http://localhost:4000/send-otp", {
      email: formData.email,
    });

    if (otpResponse.data.success) {
      setShowOtpInput(true);
      setIsOtpSent(true);
      setAlertText("OTP sent to your email. Please enter it to complete registration.");
      setAlert(true);
      setLoading(false);
    }
    else {
      setAlertText("Failed to send OTP. Try again.");
      setAlert(true);
    }
  
      setLoading(false);
    } catch (error) {
      let message = "Failed to send OTP. Please try again."
      if(error.response?.data.message){
        message = error.response.data.message
      }
      console.error("Error sending OTP:", error);
      setAlertText("error sending otp");
      setAlert(true);
      setLoading(false);
    }
  }
  };
   setTimeout(() => {
    console.log(user)
   }, 3000);



  return (
    <div className="sign container">
         {loading ? (
        <div className="testimonyFormLoader">
          <div className="loader"></div>
        </div>
      ):(
      <>
      <div className="signuppage">
        <span></span>
        <img src={image1} alt="Church welcome" />
      </div>
      {alert ? (
            <div className="alert_holder">
              <div className="alert">
                {alertText}
                <div onClick={() => setAlert(false)} className="btn">
                  <p>OK</p>
                </div>
              </div>
            </div>
          ) : null}
      
   
      { showOtpInput ?
          <form onSubmit={handleSignUp} className="signup-form">
      <h2>Sign Up</h2>
      <div className="double_input">
  <div className="input_with_counter">
    <input
      type="text"
      name="firstName"
      placeholder="First Name"
      value={formData.firstName}
      onChange={handleChange}
      maxLength={maxLengths.firstName}
      
    />
    <small>{formData.firstName.length}/{maxLengths.firstName}</small>
  </div>

  <div className="input_with_counter">
    <input
      type="text"
      name="lastName"
      placeholder="Last Name"
      value={formData.lastName}
      onChange={handleChange}
      maxLength={maxLengths.lastName}
      
    />
    <small>{formData.lastName.length}/{maxLengths.lastName}</small>
  </div>
</div>

     
        <input
           name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          
        />
  <div className="input_with_counter">
  <input
    type="password"
    name="password"
    placeholder="Create Password"
    value={formData.password}
    onChange={handleChange}
    maxLength={maxLengths.password}
    
  />
  <small>{formData.password.length}/{maxLengths.password}</small>
</div>
        
<div className="double_input">

  <div className="input_with_counter">
    <input
      type="tel"
      name="phone"
      placeholder="Phone Number"
      value={formData.phone}
      onChange={handleChange}
      maxLength={maxLengths.phone}
    />
    <small>{formData.phone.length}/{maxLengths.phone}</small>
  </div>
  <input
    type="date"
    name="dob"
    placeholder="date of birth"
    value={formData.dob}
    onChange={handleChange}
  />
</div>

        
        <div className="double_input">
        <div className="input_with_counter">
    <input
      type="text"
      name="occupation"
      placeholder="Occupation"
      value={formData.occupation}
      onChange={handleChange}
      maxLength={maxLengths.occupation}
    />
    <small>{formData.occupation.length}/{maxLengths.occupation}</small>
  </div>

        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

  
  </div>


        

<select
  name="hearAboutUs"
  value={formData.hearAboutUs}
  onChange={handleChange}
>
  <option value="">How did you hear about us?</option>
  <option value="Friend/Family">Friend/Family</option>
<option value="Church Event">Church Event</option>
<option value="Facebook">Facebook</option>
<option value="Instagram">Instagram</option>
<option value="Twitter/X">Twitter/X</option>
<option value="YouTube">YouTube</option>
<option value="TikTok">TikTok</option>
<option value="Flyer/Poster">Flyer/Poster</option>
<option value="Walk-in">Walk-in</option>
<option value="Other">Other</option>
</select>

<select
  name="interest"
  value={formData.interest}
  onChange={handleChange}
>
  <option value="">Select Area of Interest</option>
  <option value="Choir">Choir</option>
  <option value="Technical Team">Technical Team</option>
  <option value="Evangelism">Evangelism</option>
  <option value="Prayer Team">Prayer Team</option>
  <option value="Ushering">Ushering</option>
  <option value="Children Ministry">Children Ministry</option>
  <option value="Follow-up/Visitation">Follow-up / Visitation</option>
</select>
<div className="input_with_counter">
  <textarea
    name="prayerRequest"
    placeholder="Any Prayer Request?"
    value={formData.prayerRequest}
    onChange={handleChange}
    maxLength={maxLengths.prayerRequest}
  ></textarea>
  <small>{formData.prayerRequest.length}/{maxLengths.prayerRequest}</small>
</div>
      <div className="signinorup">
        <button style={{border:0}}  className="btn" type="submit">
          <p>Register <i class="fa-solid fa-arrow-right"></i></p>
        </button>
             <Link to="/signin">SignIn</Link>
        </div></form>
          :
          <form onSubmit={handleSignUp} className="signup-form">
      <h2>Sign Up</h2> 
  <input
    type="text"
    placeholder="Enter OTP sent to your email"
    value={otp}
    onChange={(e) => setOtp(e.target.value)}
  />
     <button style={{border:0}}  className="btn" type="submit">
          <p>Register <i class="fa-solid fa-arrow-right"></i></p>
        </button>
        </form>
}
      

    </>
      )}
    </div>
  );
};

export default SignUp;