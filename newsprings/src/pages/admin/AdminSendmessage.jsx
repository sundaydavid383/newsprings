import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import image1 from "../../assets/church15.jpg";
import { useUser } from '../../context/Usercontext';
import "./admin.css"


const AdminSendmessage = () => {

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
  dob: ''
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
    const [registrants, setRegistrants] = useState([])
    const [heroSections, setHeroSections] = useState([]);
    const fetchBaptisimRegistrant = async () => {
      const registrantsRes = await axios.get('http://localhost:4000/api/events/baptism/registrants');
      if (registrantsRes.data.success) {
        setRegistrants(registrantsRes.data.registrants);
      }
    }

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
      
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+234|0)[789][01]\d{8}$/; // Nigerian phone number format
      
        if (!editFormData.fullName.trim()) {
          setAlert(true)
          setAlertText('Full name is required.');
          return;
        }
      
        if (!emailRegex.test(editFormData.email)) {
          setAlert(true)
          setAlertText('Please enter a valid email address.');
          return;
        }
      
        if (!phoneRegex.test(editFormData.phone)) {
          setAlert(true)
          setAlertText('Enter a valid Nigerian phone number.');
          return;
        }
      
        if (!editFormData.gender) {
          setAlert(true)
          setAlertText('Please select a gender.');
          return;
        }
      
        if (!editFormData.dob ) {
          setAlert(true)
          setAlertText('Please enter a valid age.');
          return;
        }
      
        const ageNumber = parseInt(editFormData.age);
        if (ageNumber < 14) {
          setAlert(true)
          setAlertText('Registrant must be at least 14 years old.');
          return;
        }
      
        try {
          const response = await axios.put(`http://localhost:4000/api/events/baptism/register/${editingIndex}`, editFormData);
          if (response.data.success) {
            setAlert(true)
            setAlertText('Update successful!');
            const updated = [...registrants];
            updated[editingIndex] = editFormData;
            setRegistrants(updated);
            setEditingIndex(null);
            setEditFormData({ fullName: '', email: '', phone: '', gender: '', age: '' });
          }
        } catch (err) {
          console.error('Error updating registrant:', err);
          setAlert(true)
          setAlertText('Update failed.');
        }
      };
  // Handle delete of registrant
  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/events/baptism/register/${index}`);
      if (response.data.success) {
        setAlert(true)
        setAlertText('Baptism registrant deleted successfully!');
        setRegistrants(prevRegistrants => prevRegistrants.filter((_, idx) => idx !== index));
        fetchBaptisimRegistrant()
      }
    } catch (error) {
      console.error('Error deleting registrant:', error);
      setAlert(true)
      setAlertText('Failed to delete registrant');
    }
  }; 
  useEffect(() => {
    //fetch the existing hero sections
    axios.get("http://localhost:4000/api/hero-sections")
     .then((response)=>{
      if(response.data && response.data.sections){
        setHeroSections(response.data.sections)
      }
     }).catch((err)=>{
      console.error("Error fetching data:", err)
     });

    const interval = setInterval(() => {
      fetchBaptisimRegistrant()
    }, 10000);
  
    return ()=>clearInterval(interval)
  }, [])


  const handleHeroAddSection = () =>{
    setHeroSections([
      ...heroSections,
      {
        id:heroSections.length+1,
        header:"",
        headerspan: "",
        ps: ["",""],
        sectionimage: ""
      }
    ])
  };

    // Update ps array for a specific section
    const handlePsChange = (sectionId, index, value) => {
      setHeroSections(prevSections =>
        prevSections.map(section => 
          section.id === sectionId
            ? {
                ...section,
                ps: section.ps.map((text, i) =>
                  i === index ? value : text
                )
              }
            : section
        )
      );
    };

  const handelRemoveHeroSection = (id) => {
    setHeroSections(heroSections.filter((section)=> section.id !== id))
  }

  const handleHeroChange = (e, id) =>{
    const {name,value} = e.target;
    const UpdateSections = heroSections.map((section)=>
    section.id === id ? {...section, [name]: name === "ps" ? value.split("\n") : value} : section);
    setHeroSections(UpdateSections)
  }
  
  const handleHeroSave = ()=>{
    setLoading(true)
    axios.post('http://localhost:4000/api/hero-sections', {sections: heroSections})
    .then((response) => {
      console.log("Updated hero sections:", response.data)
      setHeroSections(response.data.data)
      setAlert(true)
      setAlertText("the hero data has been saved")
      setLoading(false)
    })
    .catch((error)=>{
      console.error("Error saving data:", error)
      setAlert(true)
      setAlertText("unable to saved data refresh and try agian")
      setLoading(false)
    })
  }



    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:4000/admin/broadcast", {message});

            if(res.data.success){
                setAlert(true)
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
      setAlertText('Sermon updated successfully!');
      setAlert(true)
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
    <div className='sign container AdminSendmessage'>
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
      <button className='btn' type="submit"><p>Update<i className="fa-solid fa-pen"></i></p></button>
    </form>


    <div className='baptisim-registrant'>
        <h2>Existing Registrants</h2>
        {registrants.length > 0 ? (
          <ul>
            {registrants.map((registrant, idx) => (
              <li key={idx}>
                {registrant.fullName} - {registrant.email} 
                <div className='btns'>
                {editingIndex === idx ? (
  <form className='signup-form update_baptisim_form' onSubmit={handleEditSubmit}>
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
      name="dob"
      type='date'
      value={editFormData.dob}
      onChange={handleEditChange}
      placeholder="Age"
    />
    <div className='btns'>
    <button type="submit">Save</button>
    <button type="button" onClick={() => setEditingIndex(null)}>Cancel</button>
  </div></form>
) : (
  <>
    <button onClick={() => updateBaptisimRegistrant(idx)}>Update</button>
  </>
)}
                <button onClick={() => handleDelete(idx)}>Delete</button>
                </div>
                </li>
            ))}
          </ul>
        ) : (
          <p>No registrants yet.</p>
        )}
      </div>

    <div className='hero_hero'>
      <form className='signup-form'>
      <h2>Hero Sections</h2>
      {
        heroSections.map((section)=>(
          <div key={section.id} className='hero-section'>
          <input type='text' name='header' value={section.header} placeholder='Header' onChange={(e)=> handleHeroChange(e, section.id)}/>
          <input type='text' name='headerspan'  value={section.headerspan}  placeholder='Header Span"' onChange={(e)=> handleHeroChange(e, section.id)}/>
          {section.ps.map((paragraph, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={paragraph}
                  onChange={(e) => handlePsChange(section.id, index, e.target.value)}
                />
              </div>
            ))}<input type='text' name='sectionimage'  value={section.sectionimage} placeholder='"Image URL"' onChange={(e)=> handleHeroChange(e, section.id)}/>
          <button className='btn' type='button' onClick={()=> handelRemoveHeroSection(section.id)}><p>Remove <i className="fa-solid fa-arrow-right"></i></p></button>
          </div>
        ))
      }
       <button  className="btn" type="button" onClick={handleHeroAddSection}><p>Add  <i className="fa-solid fa-arrow-right"></i></p></button>
      </form>
      <button className="btn" type='button' onClick={handleHeroSave}><p>Save <i className="fa-solid fa-arrow-right"></i> </p></button>
    </div>
  </>
)}    </div>
  )
}

export default AdminSendmessage
