const { google } = require("googleapis");
const readline = require("readline");
require("dotenv").config();

//load the OAUTH2 credentials from enviroment variable
  const CLIENT_ID = process.env.CLIENT_ID; 
  const CLIENT_SECRET = process.env.CLIENT_SECRET
  const REDIRECT_URI = process.env.REDIRECT_URI

  //set up OAuth2 client
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  )


// Generate authentication URL
const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline", // Needed for refresh token
  scope: ["https://www.googleapis.com/auth/youtube.upload"], // Scopes required for YouTube upload
  prompt: "consent", // Forces Google to always return a refresh token
});

console.log("Authorize this app by visiting this URL:", authUrl);
