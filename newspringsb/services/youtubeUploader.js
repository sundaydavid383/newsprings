const { google } = require("googleapis");
const fs = require("fs");
const { refreshAccessTokenIfNeeded, oauth2Client } = require("../config/googleAuth");

async function uploadVideoToYouTube(videoPath, title, description) {
  await refreshAccessTokenIfNeeded();
  oauth2Client.setCredentials({ access_token: oauth2Client.credentials.access_token });

  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  const response = await youtube.videos.insert({
    part: "snippet,status",
    requestBody: {
      snippet: {
        title,
        description,
      },
      status: {
        privacyStatus: "public",
      },
    },
    media: {
      body: fs.createReadStream(videoPath),
    },
  });

  return response.data.id; // YouTube Video ID
}

module.exports = uploadVideoToYouTube;