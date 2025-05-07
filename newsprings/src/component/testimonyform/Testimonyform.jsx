import React, { useState, useEffect } from "react";
import "./testimonyform.css";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router";
import "leaflet/dist/leaflet.css";

const TestimonyForm = ({ formData, setFormData }) => {
  console.log(formData);
  const navigate = useNavigate();
  const [alertText, setAlertText] = useState(
    "I am here to alert to alert you about your problems"
  );
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(null);
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
  const minLengths = {
    name: 3, // At least a short first name
    title: 5, // Title should be descriptive
    testimony: 300, // Ensure the testimony has some content
    scriptureReference: 3, // e.g., "John 3:16"
    testimonyCategory: 3, // "Healing", etc.
    impact: 20, // Short paragraph on how it impacted them
    churchDetails: {
      name: 3, // Church name should have at least a few characters
      location: 5, // More than just "NY" or "L.A."
      pastor: 5, // Full or partial name expected
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
  //  useEffect(() => {
  //   if(formData.video){
  //     const previewURL = URL.createObjectURL(file);
  //     setVideoPreview(previewURL);
  //   }
  //  }, [formData.video])

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("video/")) {
      setAlert(true);
      setAlertText("please upload a valid video");
      return;
    }
    const MAX_SIZE = 100 * 1024 * 1024; // 100MB
    if (file.size > MAX_SIZE) {
      return;
    }
    setFormData((prev) => ({ ...prev, video: file }));
    const previewURL = URL.createObjectURL(file);
    setVideoPreview(previewURL);
  };

  // Handle image upload and preview
  useEffect(() => {
    if (formData.image || typeof formData.image === "string") {
      setImagePreview(formData.image);
    }
  }, [formData.image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.name.match(/\.(jpg|png|jpeg)$/i)) {
      setAlert(false);
      setAlertText("Please select a valid image (jpg, jpeg, or png).");
      return;
    }
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
      setAlertText("Please enter your name.");
      setAlert(true);
      return;
    }
    if (formData.name.length > maxLengths.name) {
      setAlertText("Name is too long.");
      setAlert(true);
      return;
    }
    if (!formData.title) {
      setAlertText("Please enter a title for your testimony.");
      setAlert(true);
      return;
    }
    if (formData.title.length > maxLengths.title) {
      setAlertText("Title is too long.");
      setAlert(true);
      return;
    }
    if (!formData.video) {
      setAlertText("Add a video.");
      setAlert(true);
      return;
    }
    if (!formData.image) {
      setAlertText("Select an image.");
      setAlert(true);
      return;
    }
    if (!formData.testimony) {
      setAlertText("Please share your testimony.");
      setAlert(true);
      return;
    }
    if (formData.testimony.length < minLengths.testimony) {
      let testimonyleft = minLengths.testimony - formData.testimony.length;
      setAlertText(
        `Please your testimony is too short. Make it longer. Your current length is ${formData.testimony.length} and you have ${testimonyleft} characters left.`
      );
      setAlert(true);
      return;
    }
    if (formData.testimony.length > maxLengths.testimony) {
      setAlertText("Testimony is too long.");
      setAlert(true);
      return;
    }
    if (!formData.scriptureReference) {
      setAlertText("Please enter a scripture reference for your testimony.");
      setAlert(true);
      return;
    }
    if (formData.scriptureReference.length > maxLengths.scriptureReference) {
      setAlertText("Scripture reference is too long.");
      setAlert(true);
      return;
    }
    if (!formData.testimonyCategory) {
      setAlertText("Please enter a category for your testimony.");
      setAlert(true);
      return;
    }
    if (formData.testimonyCategory.length > maxLengths.testimonyCategory) {
      setAlertText("Testimony category is too long.");
      setAlert(true);
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "churchDetails") {
        for (const subkey in formData.churchDetails) {
          formDataToSend.append(
            `churchDetails[${subkey}]`,
            formData.churchDetails[subkey]
          );
        }
      } else if (
        typeof formData[key] === "object" &&
        key !== "video" &&
        key !== "image" && 
        key !== "validated"
      ) {
        formDataToSend.append(key, JSON.stringify(formData[key])); // Append objects as JSON strings
      } else if (key === "video" && formData.video) {
        formDataToSend.append("video", formData.video);
      } else if (key === "image" && formData.image) {
        formDataToSend.append("image", formData.image);
      } 
      else if (key === "validated") {
        formDataToSend.append("validated", formData.validated);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:4000/${formData._id ?"update-story":"uploading-story"}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setAlertText("You have successfully updated your testimony");
        setAlert(true);
        setTimeout(() => {
          navigate("/"); // Optional: redirect here
        }, 3000);
      }

      setFormData({
        video: null,
        image: null,
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
      setVideoPreview(null);
      setImagePreview(null);
      console.log("Successfully uploaded your story:", response.data);
      setLoading(false);
    } catch (error) {
      console.error("An error occurred while submitting:", error);
      setAlertText(`There was an error: ${error}`);
      setAlert(true);
      setLoading(false);
    }
  };

  return (
    <div className="testimony_form_holder">
      {loading ? (
        <div className="testimonyFormLoader">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="testimony_form">
          <h2>
            We love hearing what God is doing in your life! Share your story
            here.
          </h2>
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
                {formData._id ? (
                  <p>
                    Dont bother select new image if you dont want to change it
                  </p>
                ) : null}
                <label htmlFor="video-input" className="btn">
                  <p>
                    VIDOE <i className="fa-solid fa-video"></i>
                  </p>
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
                {videoPreview && (
                  <video controls>
                    <source src={videoPreview} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="image-input" className="btn">
                  <p>
                    Get Image <i className="fa-solid fa-image"></i>
                  </p>
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
              {imagePreview && <img src={imagePreview} alt="Preview" />}
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
                {formData.scriptureReference.length}/
                {maxLengths.scriptureReference}
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
                onChange={(e) =>
                  handleNestedInputChange(e, "churchDetails", "name")
                }
                placeholder="Enter your church's name"
              />
              <div>
                {formData.churchDetails.name.length}/
                {maxLengths.churchDetails.name}
              </div>
            </div>

            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                value={formData.churchDetails.location}
                onChange={(e) => {
                  handleLocationChange(e);
                  handleNestedInputChange(e, "churchDetails", "location");
                }}
                placeholder="Enter your church's location"
              />
              <div>
                {formData.churchDetails.location.length}/
                {maxLengths.churchDetails.location}
              </div>
            </div>

            {/* Location Map */}
            <div className="form-group">
              <MapContainer
                center={coordinates}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
                {formData.churchDetails.pastor.length}/
                {maxLengths.churchDetails.pastor}
              </div>
            </div>
            <div>
              {formData._id ? (
                <p>
                  <button className="btn" type="submit">
                    <p>Update Testimony</p>
                  </button>
                </p>
              ) : (
                <button className="btn" type="submit">
                  <p>Submit Testimony</p>
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TestimonyForm;
