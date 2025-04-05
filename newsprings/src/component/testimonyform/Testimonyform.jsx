import React, { useState, useEffect } from "react";
import "./testimonyform.css";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const TestimonyForm = () => {
  const [formData, setFormData] = useState({
    video: "",
    image: "",
    name: "",
    title: "",
    testimony: "",
    scriptureReference: "",
    testimonyCategory: "",
    followUpAction: "",
    impact: "",
    lessonLearned: "",
    prayerRequest: "",
    churchDetails: {
      name: "",
      location: "",
      pastor: "",
    },
  });

  const [videoPreview, setVideoPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [locationSearch, setLocationSearch] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [coordinates, setCoordinates] = useState([6.5244, 3.3792]); // Default to Lagos
  const testimonyCategories = [
    "Healing",
    "Financial Breakthrough",
    "Spiritual Growth",
    "Deliverance",
    "Marriage and Family",
    "Job and Career",
    "Miracles",
    "Salvation",
    "Peace and Joy",
    "Other",
  ];
  const pastorsList = [
    "Pastor Daniel Floyd",
    "Pastor John Doe",
    "Pastor Jane Smith",
    "Pastor Michael Johnson",
    "Pastor Emily White",
    "Pastor Richard Brown",
    // Add other pastors as needed
  ];
  const maxLengths = {
    name: 50,
    title: 100,
    testimony: 500,
    scriptureReference: 200,
    testimonyCategory: 100,
    impact: 500,
    churchDetails: {
      name: 100,
      location: 200,
      pastor: 100,
    },
  };

  // Handle input changes
  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleNestedInputChange = (e, field, subField) => {
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [subField]: e.target.value,
      },
    });
  };

  // Handle video upload and preview
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, video: file }));
    const previewURL = URL.createObjectURL(file);
    setVideoPreview(previewURL);
  };

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Handle location search
  const handleLocationChange = (e) => {
    setLocationSearch(e.target.value);
    // Here you can add logic to fetch location suggestions (e.g., using a geolocation API)
    if (e.target.value.length > 2) {
      axios
        .get(
          `https://nominatim.openstreetmap.org/search?q=${e.target.value}&format=json&addressdetails=1&limit=5`
        )
        .then((response) => {
          setLocationSuggestions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching location suggestions:", error);
        });
    }
  };
  //to change testimony categories
  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      testimonyCategory: e.target.value,
    });
  };
  const handlePastorChange = (e) => {
    setFormData({
      ...formData,
      churchDetails: {
        ...formData.churchDetails,
        pastor: e.target.value,
      },
    });
  };
  // Handle location select from suggestions
  const handleLocationSelect = (location) => {
    setCoordinates([location.lat, location.lon]);
    setLocationSearch(location.display_name);
    setLocationSuggestions([]); // Clear suggestions after selection
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate each field individually
    if (!formData.name) {
      alert("Please enter your name.");
      return;
    }
    if (formData.name.length > maxLengths.name) {
      alert("Name is too long.");
      return;
    }
    if (!formData.title) {
      alert("Please enter a title for your testimony.");
      return;
    }
    if (formData.title.length > maxLengths.title) {
      alert("Title is too long.");
      return;
    }
    if (!formData.testimony) {
      alert("Please share your testimony.");
      return;
    }
    if (formData.testimony.length > maxLengths.testimony) {
      alert("Testimony is too long.");
      return;
    }
    if (!formData.scriptureReference) {
      alert("Please enter a scripture reference for your testimony.");
      return;
    }
    if (formData.scriptureReference.length > maxLengths.scriptureReference) {
      alert("Scripture reference is too long.");
      return;
    }
    if (!formData.testimonyCategory) {
      alert("Please enter a category for your testimony.");
      return;
    }
    if (formData.testimonyCategory.length > maxLengths.testimonyCategory) {
      alert("Testimony category is too long.");
      return;
    }
 

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "churchDetails") {
        for (const subkey in formData.churchDetails) {
          formDataToSend.append(`churchDetails[${subkey}]`, formData.churchDetails[subkey]);
        }
      } else if (typeof formData[key] === "object" && key !== "video" && key !== "image") {
        formDataToSend.append(key, JSON.stringify(formData[key])); // Append objects as JSON strings
      } else if (key === "video" && formData.video) {
        formDataToSend.append("video", formData.video);
      } else if (key === "image" && formData.image) {
        formDataToSend.append("image", formData.image);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post("http://localhost:4000/uploading-story", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Clear form fields after successful submission
      setFormData({
        video: "",
        image: "",
        name: "",
        title: "",
        testimony: "",
        scriptureReference: "",
        testimonyCategory: "",
        followUpAction: "",
        impact: "",
        lessonLearned: "",
        prayerRequest: "",
        churchDetails: {
          name: "",
          location: "",
          pastor: "",
        },
      });
      console.log("Successfully uploaded your story:", response.data);
    } catch (error) {
      console.error("An error occurred while submitting:", error);
    }
  };

  return (
    <div className="testimony_form_holder">
      <div className="testimony_form">
        <h2>We love hearing what God is doing in your life! Share your story here.</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange(e, "name")}
              placeholder="FirstName Lastname"
            />
            <div>
              {formData.name.length}/{maxLengths.name}
            </div>
          </div>

          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange(e, "title")}
              placeholder="Enter the title of your testimony"
            />
            <div>
              {formData.title.length}/{maxLengths.title}
            </div>
          </div>

          <div className="form-group-media">
            <div className="form-group">
              <label htmlFor="video-input" className="btn">
                <p>CONTACT <i className="fa-solid fa-video"></i></p>
              </label>
              <input
                type="file"
                id="video-input"
                name="video"
                onChange={handleVideoChange}
                placeholder="Choose a video to upload"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image-input" className="btn">
                <p>Get Image <i className="fa-solid fa-image"></i></p>
              </label>
              <input
                type="file"
                id="image-input"
                name="image"
                onChange={handleImageChange}
                placeholder="Choose an image to upload"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Testimony:</label>
            <textarea
              value={formData.testimony}
              rows="5"
              onChange={(e) => handleInputChange(e, "testimony")}
              placeholder="Share your testimony here"
            />
            <div>
              {formData.testimony.length}/{maxLengths.testimony}
            </div>
          </div>

          <div className="form-group">
            <label>Scripture Reference:</label>
            <input
              type="text"
              value={formData.scriptureReference}
              onChange={(e) => handleInputChange(e, "scriptureReference")}
              placeholder="Enter a scripture reference for your testimony"
            />
            <div>
              {formData.scriptureReference.length}/{maxLengths.scriptureReference}
            </div>
          </div>

          <div className="form-group">
            <label>Testimony Category:</label>
            <select
              value={formData.testimonyCategory}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select a category</option>
              {testimonyCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Church details */}
          <h3>Church Details</h3>
          <div className="form-group">
            <label>Church Name:</label>
            <input
              type="text"
              value={formData.churchDetails.name}
              onChange={(e) => handleNestedInputChange(e, "churchDetails", "name")}
              placeholder="Enter your church's name"
            />
            <div>
              {formData.churchDetails.name.length}/{maxLengths.churchDetails.name}
            </div>
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              value={formData.churchDetails.location}
              onChange={(e) => {handleLocationChange(e); handleNestedInputChange(e, "churchDetails", "location")}}
              placeholder="Enter your church's location"
            />
            <div>
              {formData.churchDetails.location.length}/{maxLengths.churchDetails.location}
            </div>
          </div>



          {/* Location Map */}
          <div className="form-group">
            <MapContainer center={coordinates} zoom={13} style={{ height: "300px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={coordinates}>
                <Popup>{locationSearch}</Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className="form-group">
            <label>Pastor's Name:</label>
            <select
              value={formData.churchDetails.pastor}
              onChange={handlePastorChange}
              required
            >
              <option value="">Select a pastor</option>
              {pastorsList.map((pastor, index) => (
                <option key={index} value={pastor}>
                  {pastor}
                </option>
              ))}
            </select>
            <div>
              {formData.churchDetails.pastor.length}/{maxLengths.churchDetails.pastor}
            </div>
          </div>
          <div>
            <button className="btn" type="submit"><p>Submit Testimony</p></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonyForm;