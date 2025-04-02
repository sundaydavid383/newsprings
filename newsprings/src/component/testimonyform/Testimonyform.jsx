import React, { useState, useEffect } from "react";
import "./testimonyform.css";
import PlacesAutocomplete from 'react-google-places-autocomplete';

const TestimonyForm = () => {
    const [formData, setFormData] = useState({
        image: null,
        name: "Sarah Akinwale",
        date: "2025-01-20",
        title: "Divine Favor in Immigration",
        testimony: "After years of trying to secure my residency abroad, I faced numerous rejections. Every attempt ended in disappointment. I decided to surrender my case to God, fasting and praying fervently. One Sunday, my pastor declared favor over pending applications, and I received it in faith. Miraculously, within weeks, my application was approved without any further hurdles! I now help others navigate their faith journey during immigration challenges.",
        scriptureReference: "Psalm 5:12",
        testimonyCategory: "Divine Favor",
        followUpAction: "Helping others trust God during immigration processes.",
        impact: "Encouraging people to put God first in major life decisions.",
        lessonLearned: "God’s favor opens doors no man can shut.",
        prayerRequest: "That I continue to walk in God's favor and be a blessing to others.",
        churchDetails: {
          name: "RCCG New Springs",
          location: "Lagos, Nigeria",
          pastor: "Pastor Jane Smith"
        }
      });
    // Initialize Google Maps API
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_API_KEY}&libraries=places`;
        script.async = true;  // This ensures async loading
        script.defer = true;  // This ensures deferred execution
        document.head.appendChild(script);
      
        return () => {
          document.head.removeChild(script); // Clean up the script tag on component unmount
        };
      }, []);
    
      const handleLocationChange = (e) => {
        const inputValue = e.target.value;
        setFormData({
          ...formData,
          churchDetails: {
            ...formData.churchDetails,
            location: inputValue,
          },
        });
    
        // Use AutocompleteSuggestion to get location predictions
        if (window.google) {
          const autoComplete = new google.maps.places.AutocompleteSuggestion();
    
          autoComplete.getQueryPredictions({ input: inputValue }, (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              console.log(predictions); // You can display the predictions here, for example
            }
          });
        }
      };

  return (
    <div className="testimony_form">
      <h2>
        We love hearing what God is doing in your life! Share your story here.
      </h2>
      <form>
  <div className="form-group">
    <label>Name:</label>
    <input
      type="text"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    />
  </div>
  
  <div className="form-group">
    <label>Date:</label>
    <input
      type="date"
      value={formData.date}
      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
    />
  </div>
  
  <div className="form-group">
    <label>Title:</label>
    <input
      type="text"
      value={formData.title}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
    />
  </div>
  
  <div className="form-group">
    <label>Image:</label>
    <input
      type="file"
      onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
    />
  </div>
  
  <div className="form-group">
    <label>Testimony:</label>
    <textarea
      value={formData.testimony}
      rows="5"
      onChange={(e) => setFormData({ ...formData, testimony: e.target.value })}
    />
  </div>
  
  <div className="form-group">
    <label>Scripture Reference:</label>
    <input
      type="text"
      value={formData.scriptureReference}
      onChange={(e) => setFormData({ ...formData, scriptureReference: e.target.value })}
    />
  </div>
  
  <div className="form-group">
    <label>Testimony Category:</label>
    <input
      type="text"
      value={formData.testimonyCategory}
      onChange={(e) => setFormData({ ...formData, testimonyCategory: e.target.value })}
    />
  </div>
  
  <div className="form-group">
    <label>Follow-Up Action:</label>
    <input
      type="text"
      value={formData.followUpAction}
      onChange={(e) => setFormData({ ...formData, followUpAction: e.target.value })}
    />
  </div>
  
  <div className="form-group">
    <label>Impact:</label>
    <input
      type="text"
      value={formData.impact}
      onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
    />
  </div>
  
  <div className="form-group">
    <label>Lesson Learned:</label>
    <input
      type="text"
      value={formData.lessonLearned}
      onChange={(e) => setFormData({ ...formData, lessonLearned: e.target.value })}
    />
  </div>
  
  <div className="form-group">
    <label>Prayer Request:</label>
    <textarea
      value={formData.prayerRequest}
      rows="3"
      onChange={(e) => setFormData({ ...formData, prayerRequest: e.target.value })}
    />
  </div>
  
  <h3>Church Details</h3>
  
  <div className="form-group">
    <label>Church Name:</label>
    <input
      type="text"
      value={formData.churchDetails.name}
      onChange={(e) => setFormData({ ...formData, churchDetails: { ...formData.churchDetails, name: e.target.value } })}
    />
  </div>
  
  <div className="form-group">
        <label>Location:</label>
        <PlacesAutocomplete
          value={formData.churchDetails.location}
          onChange={(value) =>
            setFormData({
              ...formData,
              churchDetails: { ...formData.churchDetails, location: value },
            })
          }
          onSelect={handleLocationChange}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search for location",
                  className: "location-search-input",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {suggestions.map((suggestion) => (
                  <div
                    {...getSuggestionItemProps(suggestion)}
                    key={suggestion.place_id}
                    className="suggestion-item"
                  >
                    {suggestion.description}
                  </div>
                ))}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
  
  <div className="form-group">
    <label>Pastor:</label>
    <input
      type="text"
      value={formData.churchDetails.pastor}
      onChange={(e) => setFormData({ ...formData, churchDetails: { ...formData.churchDetails, pastor: e.target.value } })}
    />
  </div>
</form>
    </div>
  );
};

export default TestimonyForm;
