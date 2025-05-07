import React, { useState } from 'react';

const Base64Gen = () => {
  const [base64, setBase64] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result);
        console.log('Base64 string:', reader.result); // You can remove this if unnecessary
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{marginTop:"6rem"}} className="container">
      <h2>Convert File to Base64</h2>

      <label className='btn' for="base64img"><p>select image</p> </label>

      <input type="file" id='base64img' accept='image/*' onChange={handleFileChange} />
      {base64 && (
        <div>
          <h4>File: {fileName}</h4>
          <textarea
            value={base64}
            rows={8}
            cols={60}
            readOnly
          />
          <img src={base64} width={"200px"}/>
        </div>
      )}
    </div>
  );
};

export default Base64Gen;