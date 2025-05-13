
import React, { useState } from 'react';
import axios from "axios";
import "./chat.css"

const Chat = () => {
    const [seeForm, setSeeForm] = useState(false)
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("what is going on i dont understand");
    const openRouterApiKey = "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"
    const sendMessage = async (message) => {
        try {
          const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {  
                model: "openai/gpt-3.5-turbo", // free + smart
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
                    "HTTP-Referer": "https://newsprings-raqf.vercel.app", // must match your deployed frontend
                    "X-Title": "RCCG Newspings Chatbot"
                  },
            }
          );
          console.log("API Key:", openRouterApiKey);
          return response.data.choices[0].message.content;
        } catch (error) {
          console.error("OpenRouter error:", error.response?.data || error.message);
          return "Sorry, there was a problem replying. Please try again shortly.";
        }
      };
  return (
    <div>
        {!seeForm ? 
        <div className='bot_state'>
        <div className="chat_bot_words">hello how are you doing</div>
    <i onClick={()=>setSeeForm(true)} className='chat iconactive chat_state fa-solid fa-robot'></i>
     </div>   
        :(
        <div className='chat_box_holder'>
                        <i onClick={()=>setSeeForm(false)} className="fa-solid fa-times"></i>
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




