const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();


// ✅ Make sure the directory exists
const dataDir = path.join(__dirname, "../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const filePath = path.join(dataDir, "adminMessage.json");

// ✅ Ensure file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

router.post("/admin/message", (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.startsWith("Dear user"))
          return res.status(400).json({ success: false, message: "Message must start with 'Dear user'" });
      
        let messages = []
        const raw = fs.readFileSync(filePath, "utf8").trim();
        if(raw){
            try {
              const parsed = JSON.parse(raw) ;
              if(Array.isArray(parsed)) messages = parsed;
            } catch (error) {
                console.warn("Corrupted JSON file. Reinitializing to empty array.")
            }
        }
        const newMessage = { message, time: new Date().toISOString() }
        messages.push(newMessage);

        if(messages.length > 3){
            messages = messages.slice(1)
        }
        fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
      
        res.status(200).json({ success: true, newMessage });
    } catch (error) {
          console.error("error adding message:", error)
          return res.status(200).json({success:false, message:"unable to register message"})
    }

});

router.get("/admin/messages", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const messages = data.trim() === "" ? [] : JSON.parse(data);
    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: "Could not read file" });
  }
});

module.exports = router;