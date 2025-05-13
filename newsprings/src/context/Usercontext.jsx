import { createContext, useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
const UserContext = createContext();
import alarm from "../assets/alarm.mp3"
import logo from "../assets/logo.png"

export const UserProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null); // user = response.data.user
  const lastMessageRef = useRef(null);
  const audioRef = useRef(new Audio(alarm));
  const baseUrl = 'https://newsprings.onrender.com/'


  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${baseUrl}api/admin/messages`);
        const data = res.data;

        if (data.success) {
          const latest = data.messages[data.messages.length - 1];
          
          // Only notify if there's a new message
          if (latest && latest.message !== lastMessageRef.current) {
            lastMessageRef.current = latest.message;
            setMessages(data.messages);
            //trigger browser notification
            audioRef.current.play()
            if (Notification.permission === "granted") {
              new Notification("📢 check the message box there is an updated for you", {
                body: latest.message,
                icon: logo
              });
            }
          }
        }
        else{
          setMessages(data.messages)
        }
      } catch (error) {
        console.error("Failed to fetch admin messages:", error);
      }

  };
  
  useEffect(() => {
    if(Notification.permission !== "granted"){
      Notification.requestPermission()
    }
    fetchMessages(); // initial fetch
  
    const interval = setInterval(fetchMessages, 3000); // every 5 seconds
  
    return () => clearInterval(interval);
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUser, messages, setMessages, fetchMessages }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access
export const useUser = () => useContext(UserContext);