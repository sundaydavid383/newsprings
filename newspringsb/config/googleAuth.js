// config/googleAuth.js
const { google } = require("googleapis");
require("dotenv").config()

const YOUR_CLIENT_ID = process.env.CLIENT_ID
const YOUR_CLIENT_SECRET = process.env.CLIENT_SECRET
const YOUR_REDIRECT_URI = process.env.REDIRECT_URI

const oauth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URI
);

// A function to refresh the access token
async function refreshAccessTokenIfNeeded() {
  const credentials = oauth2Client.credentials;

  if (
    !credentials ||
    !credentials.expiry_date || 
    credentials.expiry_date <= Date.now()
  ) {
    const { credentials: newCredentials } = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(newCredentials);
  }
}

module.exports = {
  oauth2Client,
  refreshAccessTokenIfNeeded,
}