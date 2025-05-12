const express = require('express')
const router = express.Router()
const axios = require('axios');


const systemPrompt = `You are RCCG Newspings, the AI assistant for Newspring Church. You answer spiritual questions, offer prayers, explain biblical topics, provide directions using Google Maps, and guide users to church events and ministries. Always speak warmly and introduce yourself when asked: "I am Newspings, your spiritual guide."`// format time like 4:15 pm, 4th may 2025"
function getFormattedTime() {
    const now = new Date();

    const options = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        day: 'numeric',
        month:"long",
        year: "numeric"
    };

    const formatted = now.toLocaleString('en-US', options);
    const day = now.getDate();

    //add ordinal suffix to day (e.g "1st", "2nd" etc.)
    const suffix = (d) => {
        if(d > 3 && d < 21) return 'th';
        switch (d % 10){
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const ordinalDay = `${day}${suffix(day)}`;
    return formatted.replace(day, ordinalDay)
}





const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;

router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message  || typeof(message) !== 'string') {
    return res.status(400).json({ success: false, error: "Message is required." });
  }
  try {
    const response = await axios.post(
        'https://api.together.ai/v1/chat/completions',
        {
          model: "qwen/Qwen1.5-14B-Chat",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            Authorization: `Bearer ${TOGETHER_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

    res.json({ success: true, time:getFormattedTime(), reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Together API error:', error.response?.data || error.message);
    res.json({ success: false, error: "AI service failed." });
  }
});

module.exports = router;