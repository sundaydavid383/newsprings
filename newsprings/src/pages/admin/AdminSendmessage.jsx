import axios from 'axios';
import React, { useState, useEffect } from 'react'
import image1 from "../../assets/church15.jpg";
import { useUser } from '../../context/Usercontext';
import "./admin.css"

const AdminSendmessage = () => {
    const [message, setMessage] = useState("")
    const [newMsg, setNewMsg] = useState("");
    const [adminAuthorized, setAdminAuthorized] = useState(false)
    const [authText, setAuthText] = useState("")
    const {setMessages} = useUser()
    const [alertText, setAlertText] = useState(
        "I am here to alert to alert you about your problems"
      );
      const [alert, setAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:4000/admin/broadcast", {message});

            if(res.data.success){
                setAlertText('✅ Message sent to all users.');
                setAlert(true)
                setMessage("")
                setLoading(false);
            }
            else{
                setAlertText('❌ Something went wrong.');
                setAlert(true)  
                setLoading(false);
            }

        } catch (error) {
             console.error("there was an error sending messages:", error)
             setAlertText("❌ Error sending message.")
             setAlert(true)
             setLoading(false);
        }
    }
    const hanleAuth = async (e)=>{
        e.preventDefault()
        if (authText === "") {
          setAlert(true);
          setAlertText("Input field is empty");
          return;
        }
      
        try {
          setLoading(true)
          const res = await axios.post("http://localhost:4000/verify/admin", { password: authText });
      
          if (res.data.success) {
            setAdminAuthorized(true);
            setLoading(false)
          } else {
            setAlert(true);
            setAlertText("❌ Invalid admin password.");
            setLoading(false)
          }
        } catch (error) {
          setAlert(true);
          console.error("Error verifying admin:", error);
          setAlertText("❌ Server error while verifying admin.");
          setLoading(false);
        }
    }

    
  const fetchMessages = async () => {
    const res = await axios.get("http://localhost:4000/api/admin/messages");
    setMessages(res.data.messages);
  };


    const sendMessage = async () => {
      if (!newMsg.startsWith("Dear user")) {
        setAlert(true)
        setAlertText("Message must start with 'Dear user'");
        return;
      }
      try {
        setLoading(true)
        const res = await axios.post("http://localhost:4000/api/admin/message", {
          message: newMsg,
        });
  
        if (res.data.success) {
          setAlertText("Message sent!");
          setAlert(true)
          setNewMsg("");
          fetchMessages();
          setLoading(false)
        }
      } catch (err) {
        setAlertText("Failed to send message");
        setAlert(true)
        setLoading(false)
      }
    };
  
    useEffect(() => {
      fetchMessages();
    }, []);
  return (
    <div className='sign  container AdminSendmessage'>
{loading ? (
  <div className="testimonyFormLoader">
    <div className="loader"></div>
  </div>
) : !adminAuthorized ? (
  <>
    <div className="signuppage">
    {alert && (
      <div className="alert_holder">
        <div className="alert">
          <p>{alertText}</p>
          <div onClick={() => setAlert(false)} className="btn">
            <p>OK</p>
          </div>
        </div>
      </div>
    )}
      <span></span>
      <img src={image1} alt="Church welcome" />
    </div>
    <form onSubmit={hanleAuth} className="signup-form">
      <h2>Verify You Are An Admin</h2>
      <input
        value={authText}
        onChange={(e) => setAuthText(e.target.value)}
        type="password"
        name="authorized-text"
      />
      <button type="submit" className="btn">
        <p>Verify <i className="fa-solid fa-certificate"></i></p>
      </button>
    </form>
  </>
) : (
  <>
    {alert && (
      <div className="alert_holder">
        <div className="alert">
          <p>{alertText}</p>
          <div onClick={() => setAlert(false)} className="btn">
            <p>OK</p>
          </div>
        </div>
      </div>
    )}
    <div className="signuppage">
      <span></span>
      <img src={image1} alt="Church welcome" />
    </div>
    <form className="signup-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        name="message"
        id=""
      />
      <button type="submit" className="btn">
        <p>Submit <i className="fa-solid fa-right-from-bracket"></i></p>
      </button>
    </form>
    <div className="signup-form">
          <textarea
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Dear user..."
          />
          <button className='btn' onClick={sendMessage}><p>Send<i className="fa-solid fa-paper-plane"></i></p></button>
        </div>

  </>
)}    </div>
  )
}

export default AdminSendmessage
