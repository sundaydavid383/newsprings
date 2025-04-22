import { createContext, useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
const UserContext = createContext();
import alarm from "../assets/alarm.mp3"

export const UserProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [serviceDescription, setServiceDescription] = useState("")
  const [user, setUser] = useState(null); // user = response.data.user
  const audioRef = useRef(new Audio(alarm));
  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/messages");
      setMessages(res.data.messages);
      // audioRef.current.play();
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };
  
  useEffect(() => {
    fetchMessages(); // initial fetch
  
    const interval = setInterval(() => {
      fetchMessages();
    }, 3000); // every 5 seconds
  
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