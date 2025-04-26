import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import image1 from "../../assets/church15.jpg";
import { useUser } from '../../context/Usercontext';
import "./admin.css"

const AdminSendmessage = () => {
  const fetchBaptisimRegistrant = async () => {
    const registrantsRes = await axios.get('http://localhost:4000/api/events/baptism/registrants');
    if (registrantsRes.data.success) {
      setRegistrants(registrantsRes.data.registrants);
    }
  }
  const [formData, setFormData] = useState({
    id: '',
    preacher: '',
    description: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);
const [editFormData, setEditFormData] = useState({
  fullName: '',
  email: '',
  phone: '',
  gender: '',
  age: ''
});
    const [message, setMessage] = useState("")
    const [newMsg, setNewMsg] = useState("");
    const [adminAuthorized, setAdminAuthorized] = useState(false)
    const [authText, setAuthText] = useState("")
    const [serviceDescription, setServiceDescription] = useState("")
    const {setMessages} = useUser()
    const [alertText, setAlertText] = useState(
        "I am here to alert to alert you about your problems"
      );
      const [alert, setAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    const [registrants, setRegistrants] = useState([]);

      // Handle update of registrant
      const updateBaptisimRegistrant = (index) => {
        setEditingIndex(index);
        setEditFormData(registrants[index]);
      };
      
      const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
      };
      
      const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`http://localhost:4000/api/events/baptism/register/${editingIndex}`, editFormData);
          if (response.data.success) {
            alert('Update successful!');
            const updated = [...registrants];
            updated[editingIndex] = editFormData;
            setRegistrants(updated);
            setEditingIndex(null);
          }
        } catch (err) {
          console.error('Error updating registrant:', err);
          alert('Update failed.');
        }
      };
  // Handle delete of registrant
  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/events/baptism/register/${index}`);
      if (response.data.success) {
        alert('Baptism registrant deleted successfully!');
        setRegistrants(prevRegistrants => prevRegistrants.filter((_, idx) => idx !== index));
        fetchBaptisimRegistrant()
      }
    } catch (error) {
      console.error('Error deleting registrant:', error);
      alert('Failed to delete registrant');
    }
  }; 
  useEffect(() => {
    fetchBaptisimRegistrant()
  }, [])
  

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
          let message = "❌ error while verifying admin check if password is correct."
          if(error.response?.data.message){
            message = error.response.data.message
          }
          console.error("Error verifying admin:", error);
          setAlertText(message);
          setLoading(false);
        }
    }
    const handleChange = (e) => {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.name === 'id' ? parseInt(e.target.value) : e.target.value
      }));
    };
    
  const handleSermonDataSubmit = async (e) => {
    e.preventDefault();
    if(formData.preacher.length<5){
      setAlert(true)
      setAlertText("the description feild too short it must have a length of more than 5")
    }
    else if(formData.description.length<50){
      setAlert(true)
      setAlertText("the preacher feild too short it must have a length of more than 50")
    }
    try {
      const res = await fetch('http://localhost:4000/api/update-sermon-configs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('Updated configs:', data);
      alert('Sermon updated successfully!');
    } catch (error) {
      console.error('Failed to update sermon config', error);
    }
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
          setLoading(false)
        }
      } catch (err) {
        setAlertText("Failed to send message");
        setAlert(true)
        setLoading(false)
      }
    };
  
    // useEffect(() => {
    //   fetchMessages();
    // }, []);


    const setLatestorLiveServiceText = async (e) => {
      e.preventDefault();
      if (serviceDescription.trim() === "") {
        setAlert(true);
        setAlertText("Input field is empty");
        return;
      }
  
      try {
        setLoading(true);
        const res = await axios.post("http://localhost:4000/api/service-description", {
          description: serviceDescription,
        });
        if (res.data.success) {
          setAlert(true);
          setAlertText("Service description updated successfully");
        } else {
          setAlert(true);
          setAlertText("Failed to update");
        }
      } catch (error) {
        console.error("Error updating description:", error);
        setAlert(true);
        setAlertText("Something went wrong");
      } finally {
        setLoading(false);
        setTimeout(() => setAlert(false), 3000);
      }
    };

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
    <h2>Send message on Email</h2>
    <textarea
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        name="message"
        id=""
        required
      />
      <button type="submit" className="btn">
        <p>Submit <i className="fa-solid fa-right-from-bracket"></i></p>
      </button>
    </form>
    <div className="signup-form">
    <h2>Send message to user in real time</h2>
          <textarea
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Dear user..."
          />
          <button className='btn' onClick={sendMessage}><p>Send<i className="fa-solid fa-paper-plane"></i></p></button>
        </div>

        <div className="signup-form">
        <h2>change service latest description</h2>
          <textarea
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            placeholder="live or latest service description..."
          />
          <button className='btn' onClick={setLatestorLiveServiceText}><p>Send<i className="fa-solid fa-paper-plane"></i></p></button>
        </div>


        <form className='signup-form' onSubmit={handleSermonDataSubmit}>
      <input type="number" name="id" max={2} placeholder="ID" onChange={handleChange} required />
      <input type="text" name="preacher" placeholder="Preacher" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
      <button className='btn' type="submit"><p>Update<i class="fa-solid fa-pen"></i></p></button>
    </form>


    <div className='baptisim-registrant'>
        <h2>Existing Registrants</h2>
        {registrants.length > 0 ? (
          <ul>
            {registrants.map((registrant, idx) => (
              <li key={idx}>
                {registrant.fullName} - {registrant.email}
                {editingIndex === idx ? (
  <form className='signup-form' onSubmit={handleEditSubmit}>
    <input
      name="fullName"
      value={editFormData.fullName}
      onChange={handleEditChange}
      placeholder="Full Name"
    />
    <input
      name="email"
      value={editFormData.email}
      onChange={handleEditChange}
      placeholder="Email"
    />
    <input
      name="phone"
      value={editFormData.phone}
      onChange={handleEditChange}
      placeholder="Phone"
    />
    <input
      name="gender"
      value={editFormData.gender}
      onChange={handleEditChange}
      placeholder="Gender"
    />
    <input
      name="age"
      value={editFormData.age}
      onChange={handleEditChange}
      placeholder="Age"
    />
    <button type="submit">Save</button>
    <button type="button" onClick={() => setEditingIndex(null)}>Cancel</button>
  </form>
) : (
  <>
    <button onClick={() => updateBaptisimRegistrant(idx)}>Update</button>
  </>
)}
                <button onClick={() => handleDelete(idx)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No registrants yet.</p>
        )}
      </div>
  </>
)}    </div>
  )
}

export default AdminSendmessage
