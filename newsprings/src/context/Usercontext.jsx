import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [serviceDescription, setServiceDescription] = useState("")
  const [user, setUser] = useState(null); // user = response.data.user
  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/admin/messages");
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };
  
  useEffect(() => {
    fetchMessages();
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUser, messages, setMessages, fetchMessages }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy access
export const useUser = () => useContext(UserContext);