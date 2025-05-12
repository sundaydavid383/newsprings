
import React, { useState } from 'react';
import axios from "axios";

const Chat = () => {
    const [seeForm, setSeeForm] = useState(false)
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const openRouterApiKey = "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";
    const sendMessage = async (message) => {
        try {
          const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
              model: "mistralai/mistral-7b-instruct", // free + smart
              messages: [
                {
                  role: "system",
                  content: "You are Newspings, a friendly Christian chatbot for RCCG Newspring Church. Offer spiritual guidance, prayer, directions, and event help.",
                },
                {
                  role: "user",
                  content: message,
                },
              ],
            },
            {
              headers: {
                "Authorization": `Bearer ${openRouterApiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://newsprings-raqf.vercel.app/", // your actual domain
                "X-Title": "RCCG Newspings Chatbot"
              },
            }
          );
      
          return response.data.choices[0].message.content;
        } catch (error) {
          console.error("OpenRouter error:", error.response?.data || error.message);
          return "Sorry, there was a problem replying. Please try again shortly.";
        }
      };
  return (
    <div>
        {!seeForm ? <div onClick={()=>setSeeForm(true)} className='ai iconactive message_state'>
            <div className="words">hello how are you doing</div>
            <i className="fa-solid fa-robot"></i>qw
        </div>
        :(
        <div className='chat_box_holder'>
            {response && <div className="bot-reply">{response}</div>}

<form
  className=""
  onSubmit={async (e) => {
    e.preventDefault();
    const reply = await sendMessage(query);
    setResponse(reply);
    console.log("Bot reply:", reply); // You can store this in state and display it
    setQuery(""); // Clear input
  }}
>
            <i onClick={()=>setSeeForm(false)} className="fa-solid fa-times"></i>
            <input
  type="text"
  placeholder="Ask newsprings anything"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/><button type="submit"><i className="fa-solid fa-paper-plane"></i></button>
        </form></div>)}
    </div>
  )
}

export default Chat    




