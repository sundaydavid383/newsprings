import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import image1 from "../../assets/church15.jpg";
import { useUser } from '../../context/Usercontext';
import "./admin.css"
import ConnectedUsersList from './ConnectedUsersList';


const AdminSendmessage = () => {
  const Base_url =  "https://newsprings.onrender.com/";
  const [formData, setFormData] = useState({
    id: '',
    preacher: '',
    description: ''
  });

  const [baptismEventData, setBaptismEventData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
  fullName: '',
  email: '',
  phone: '',
  gender: '',
  age: ''
});
    const [prayerAndFasting, setPrayerAndFasting] = useState(null)
    const [message, setMessage] = useState("")
    const [newMsg, setNewMsg] = useState("");
    const [adminAuthorized, setAdminAuthorized] = useState(false)
    const [authText, setAuthText] = useState("")
    const [serviceDescription, setServiceDescription] = useState("")
    const [serviceTime, setServiceTime] = useState("")
    const {setMessages} = useUser()
    const [alertText, setAlertText] = useState(
        "I am here to alert to alert you about your problems"
      );
      const [alert, setAlert] = useState(false)
    const [loading, setLoading] = useState(false)
    const [registrants, setRegistrants] = useState([])
    const [heroSections, setHeroSections] = useState([]);



    //fetching the baptism event data
    useEffect(() => {
      setLoading(true)
      axios.get(`${Base_url}api/events/baptism`)
        .then(res => {
          if (res.data.success) {
            setBaptismEventData(res.data.event);
          }
        })
        .catch(err => {setAlertText('Failed to load data');setAlert(true)})
        .finally(() => setLoading(false));
    }, []);
    
    //handling the baptism event change for each input
    const handleBaptismEventChange = (e, index, field) => {
      if (index !== undefined) {
        const updated = [...baptismEventData.upcomingEvents];
        updated[index][field] = e.target.value;
        setBaptismEventData({ ...baptismEventData, upcomingEvents: updated });
      } else {
        setBaptismEventData({ ...baptismEventData, [e.target.name]: e.target.value });
      }
    };
  
    //handling the baptism event change for each file changes like images etc..
    const handleBaptismEventFileChange = (e, index, field) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          if (index !== undefined) {
            const updated = [...baptismEventData.upcomingEvents];
            updated[index][field] = base64String;
            setBaptismEventData({ ...baptismEventData, upcomingEvents: updated });
          } else {
            setBaptismEventData({ ...baptismEventData, [field]: base64String });
          }
        };
        reader.readAsDataURL(file);
      }
    };
  
    //submitting the updated change value of the baptism event
    const handleBaptismEventSubmit = (e) => {
      e.preventDefault();
      axios.put(`${Base_url}api/events/baptism`, baptismEventData)
        .then(res => {setAlert(true)
          setAlertText("successfully updated baptism event")})
        .catch(err => { setAlert(true)
          setAlertText("there was an error updating the baptism event")});
    };

  //prayer and fasting change and manipulation 
    useEffect(() => {
      setLoading(true)
      axios.get(`${Base_url}api/prayer-and-fasting`)
        .then(res => {
          setPrayerAndFasting(res.data);
         setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
          setAlert(true)
          setAlertText("there was an error fetcihng the prayer and fasting content")
        });
    }, []);
    
  const handlePrayerAndFastingInputChange = (section, field, value) => {
    setPrayerAndFasting(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handlePrayerAndFastingListChange = (section, index, value) => {
    const updated = [...prayerAndFasting[section]];
    updated[index] = value;
    setPrayerAndFasting(prev => ({ ...prev, [section]: updated }));
  };

  const handlePrayerAndFastingGalleryChange = (index, key, value) => {
    const updated = [...prayerAndFasting.gallery];
    updated[index][key] = value;
    setPrayerAndFasting(prev => ({ ...prev, gallery: updated }));
  };

  const handlePrayerAndFastingGalleryImageUpload = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      handlePrayerAndFastingGalleryChange(index, 'src', reader.result);
    };
    reader.readAsDataURL(file);
  }


  const handlePrayerAndFastingSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true)
      await axios.put(`${Base_url}api/prayer-and-fasting`, prayerAndFasting);
      setLoading(false)
      setAlert(true)
      setAlertText('Content updated successfully');
    } catch (err) {
      console.error(err);
      setLoading(false)
      setAlert(true)
      setAlertText('Error updating content');
    }
  };








    
    
   // fetching the baptisim registrant  
    const fetchBaptisimRegistrant = async () => {
      const registrantsRes = await axios.get(`${Base_url}api/events/baptism/registrants`);
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
      
      const handleBapitsmRegistrant = async (e) => {
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
      
        if (!editFormData.age ) {
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
          const response = await axios.put(`${Base_url}api/events/baptism/register/${editingIndex}`, editFormData);
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
      const response = await axios.delete(`${Base_url}api/events/baptism/register/${index}`);
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
    axios.get(`${Base_url}api/hero-sections`)
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


  //upload hero image 
  const handleHeroImageUpload = (id, file)=>{
     const reader =  new FileReader();
     reader.onloadend = () =>{
      setHeroSections(prevSections => 
        prevSections.map(section=>
          section.id === id ?  {...section, sectionimage: reader.result}:section
      )
    );
  }
  if(file) reader.readAsDataURL(file)

  }

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
   
    //handling remove section from the hero section
  const handelRemoveHeroSection = (id) => {
    setHeroSections(heroSections.filter((section)=> section.id !== id))
  }
  //changing basic input for hero section
  const handleHeroChange = (e, id) =>{
    const {name,value} = e.target;
    const UpdateSections = heroSections.map((section)=>
    section.id === id ? {...section, [name]: value} : section);
    setHeroSections(UpdateSections)
  }
  //saving hero data
  const handleHeroSave = ()=>{
    setLoading(true)
    console.log(heroSections)
    axios.post(`${Base_url}api/hero-sections`, {sections: heroSections})
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
  const handleHeroAddSection = () =>{
    setHeroSections([
      ...heroSections,
      {
        id:Date.now(),
        header:"",
        headerspan: "",
        ps: ["",""],
        sectionimage: ""
      }
    ])
  };


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            const res = await axios.post(`${Base_url}admin/broadcast`, {message});

            if(res.data.success){
                setAlert(true)
                setAlertText('✅ Message sent to all users.');
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
          const res = await axios.post(`${Base_url}verify/admin`, { password: authText });
      
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
      const res = await fetch(`${Base_url}api/update-sermon-configs`, {
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
        const res = await axios.post(`${Base_url}api/admin/message`, {
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
        const res = await axios.post(`${Base_url}api/service-description`, {
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
 <div className="EasterLoader">
  <div className="visualizer">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
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
  <form className='signup-form update_baptisim_form' onSubmit={handleBapitsmRegistrant}>
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
      type='date'
      value={editFormData.age}
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
        heroSections.map((section, index)=>(
          <div key={section.id} className='hero-section'>
          <input type='text' name='header' value={section.header} placeholder='Header' onChange={(e)=> handleHeroChange(e, section.id)}/>
          <input type='text' name='headerspan'  value={section.headerspan}  placeholder='Header Span"' onChange={(e)=> handleHeroChange(e, section.id)}/>
          {section.ps.map((paragraph, indext) => (
              <div key={indext}>
                <input
                  type="text"
                  value={paragraph}
                  placeholder='real talks'
                  onChange={(e) => handlePsChange(section.id, indext, e.target.value)}
                />
              </div>
            ))}
<label htmlFor={`sectionimage-${index}`}>Upload Section Image:</label>
<input
  id={`sectionimage-${index}`}
  type="file"
  name="sectionimage"
  accept="image/*"
  onChange={(e) => handleHeroImageUpload(section.id, e.target.files[0])}
/>
            {section.sectionimage && (
              <img src={section.sectionimage} alt="preview" style={{ width: '200px' }} />
            )}
          <button className='btn' type='button' onClick={()=> handelRemoveHeroSection(section.id)}><p>Remove <i className="fa-solid fa-arrow-right"></i></p></button>
          </div>
        ))
      }
       <button  className="btn" type="button" onClick={handleHeroAddSection}><p>Add  <i className="fa-solid fa-arrow-right"></i></p></button>
      </form>
      <button className="btn" type='button' onClick={handleHeroSave}><p>Save <i className="fa-solid fa-arrow-right"></i> </p></button>
    </div>  

    <form className='signup-form' onSubmit={handlePrayerAndFastingSubmit}>
  <h2>Header</h2>
  <input
    type="text"
    value={prayerAndFasting.header.title}
    onChange={(e) => handlePrayerAndFastingInputChange('header', 'title', e.target.value)}
    placeholder="Title"
  />
  <textarea
    value={prayerAndFasting.header.subtitle}
    onChange={(e) => handlePrayerAndFastingInputChange('header', 'subtitle', e.target.value)}
    placeholder="Subtitle"
  />

  <h2>Why Fast</h2>
  {prayerAndFasting.whyFast.map((item, i) => (
    <textarea
      key={i}
      value={item}
      onChange={(e) => handlePrayerAndFastingListChange('whyFast', i, e.target.value)}
    />
  ))}

  <h2>How to Participate</h2>
  {prayerAndFasting.howToParticipate.map((item, i) => (
    <textarea
      key={i}
      value={item}
      onChange={(e) => handlePrayerAndFastingListChange('howToParticipate', i, e.target.value)}
    />
  ))}

  <h2>Prayer Focus</h2>
  {prayerAndFasting.prayerFocus.map((item, i) => (
    <textarea
      key={i}
      value={item}
      onChange={(e) => handlePrayerAndFastingListChange('prayerFocus', i, e.target.value)}
    />
  ))}

  <h2>Gallery</h2>
  {prayerAndFasting.gallery.map((item, i) => (
    <div key={i}>
      <input
        type="text"
        value={item.alt}
        placeholder="Alt text"
        onChange={(e) => handlePrayerAndFastingGalleryChange(i, 'alt', e.target.value)}
      />
      <input
        type="text"
        value={item.src}
        placeholder="Image URL"
        onChange={(e) => handlePrayerAndFastingGalleryChange(i, 'src', e.target.value)}
      />
      {item.src && <img src={item.src} alt={item.alt} width={100} />}
    </div>
  ))}

  <h2>Join</h2>
  {prayerAndFasting.join.map((p,index)=>(
  <input
  type="text"
  key={index}
  value={p}
  onChange={(e) => handlePrayerAndFastingListChange('join', index, e.target.value)}
  placeholder="Join text"
  />
  ))
}
  <h2>Video</h2>
  <input
    type="text"
    value={prayerAndFasting.videoId}
    onChange={(e) => setPrayerAndFasting(prev=>({...prev, videoId:e.target.value}))}
    placeholder="YouTube Video ID"
  />
  {prayerAndFasting.videoId && (
    <iframe
      width="300"
      height="180"
      src={`https://www.youtube.com/embed/${prayerAndFasting.videoId}`}
      title="YouTube Video"
      frameBorder="0"
      allowFullScreen
    />
  )}

  <br /><br />
  <button type="submit">Update prayerAndFasting</button>
</form>

<form className='signup-form' onSubmit={handleBaptismEventSubmit}>
      <input name="title" value={baptismEventData.title} onChange={handleBaptismEventChange} placeholder="Title" />
      <input name="date" value={baptismEventData.date} onChange={handleBaptismEventChange} placeholder="Date" />
      <input name="time" value={baptismEventData.time} onChange={handleBaptismEventChange} placeholder="Time" />
      <input name="location" value={baptismEventData.location} onChange={handleBaptismEventChange} placeholder="Location" />
      <input name="videoId" value={baptismEventData.videoId} onChange={handleBaptismEventChange} placeholder="Video ID" />
      <textarea name="description" value={baptismEventData.description} onChange={handleBaptismEventChange} placeholder="Description" />
      <label className='btn' htmlFor={`singlefile`}>
        <p>Upload Image:</p>
      </label>
      <input type="file" id={`singlefile`} accept="image/*" onChange={(e) => handleBaptismEventFileChange(e, undefined, 'backgroundformimage')} />
      <img width={"300px"} src={baptismEventData.backgroundformimage}/>

      <h2>Upcoming Events</h2>
      {baptismEventData.upcomingEvents.map((ev, i) => (
        <div className='each-form' key={i}>
          <input value={ev.title} onChange={(e) => handleBaptismEventChange(e, i, 'title')} placeholder="Title" />
          <input value={ev.date} onChange={(e) => handleBaptismEventChange(e, i, 'date')} placeholder="Date" />
          <input value={ev.time} onChange={(e) => handleBaptismEventChange(e, i, 'time')} placeholder="Time" />
          <input value={ev.location} onChange={(e) => handleBaptismEventChange(e, i, 'location')} placeholder="Location" />
          <textarea value={ev.description} onChange={(e) => handleBaptismEventChange(e, i, 'description')} placeholder="Description" />
          <label className='btn' htmlFor={`file-upload${i}`}>
           <p> Upload Image:</p>
          </label>
          <input type="file" id={`file-upload${i}`} accept="image/*" onChange={(e) => handleBaptismEventFileChange(e, i, 'image')} />
          <img width={"300px"} src={ev.image || ''}/>
        </div>
      ))}

      <button className='btn' type="submit">Save Changes</button>
    </form>
    <ConnectedUsersList/>
  </>
)}   
 
    </div>



  )
}

export default AdminSendmessage
