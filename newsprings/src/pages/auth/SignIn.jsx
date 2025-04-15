import { useState, useEffect } from "react";
import "./sign.css"
import image1 from "../../assets/church15.jpg";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { useUser } from "../../context/Usercontext";

function SignIn({setIsAuthenticated}){
    const navigate = useNavigate()
    const {user, setUser} = useUser()
    const [alertText, setAlertText] = useState(
      "I am here to alert to alert you about your problems"
    );
    const [alert, setAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      console.log(formData)
      const response = await axios.post('http://localhost:4000/api/login', formData);
      if (response.data.success) {
        setAlertText(`${response.data.message}. check your email or spam list in your email to get latest response`);
        setIsAuthenticated(true)
        localStorage.setItem("isAuthenticated", "true");
        setLoading(false)
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user))
        console.log(user)
        console.log("response data of user:",response.data.user)
        setAlert(true)
        // You can redirect or store a token here
         // ✅ Redirect to homepage after successful login
         navigate("/");
      } else {
        setAlertText(response.data.message)
        setLoading(false)
        setAlert(true)
      }
    } catch (error) {
      console.error('Login error:', error);
      setAlertText('An error occurred during login.');
      setLoading(false)
      setAlert(true)
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
           {alert ? (
            <div className="alert_holder">
              <div className="alert">
                <p>{alertText}</p>
                <div onClick={() => setAlert(false)} className="btn">
                  <p>OK</p>
                </div>
              </div>
            </div>
          ) : null}
       <div className="signuppage">
              <span></span>
              <img src={image1} alt="Church welcome" />
            </div>
    <form onSubmit={handleLogin} className="signup-form">
      <h2>Login</h2>

      <input
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <div className="input_with_counter">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          maxLength={30}
          required
        />
        <small>{formData.password.length}/30</small>
      </div>
      <div className="signinorup">
      <button style={{ border: 0 }} className="btn" type="submit">
        <p>Login <i className="fa-solid fa-arrow-right"></i></p>
      </button>
     <Link to="/signup">SignUp</Link>
      </div>

    </form>
    </> )}
    </div>
  );
}

export default SignIn;