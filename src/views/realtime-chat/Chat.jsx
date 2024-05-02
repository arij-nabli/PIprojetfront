import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const token = localStorage.getItem('token')
  const [user,setUser]=useState(null)
  const fetchUserData = async ()=>{
    const response = await axios.get(
      'http://localhost:5000/auth/getUserDataFromToken',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log(response.data)
    setUser(response.data.user)
  }
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/messages/get-all');
      const sortedMessages = response.data.map(message => ({
        ...message,
        timestamp: new Date(message.timestamp) // Convert timestamp to Date object
      })).sort((a, b) => a.timestamp - b.timestamp);
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  
  useEffect(() => {
     
    fetchUserData()
    fetchMessages();
    try
{   
   const socket = io('http://localhost:5000'); 
socket.on('connect',(socket)=>{
  console.log("socket connected",socket)
  console.log("aaaaaaa")
})
socket.on('message', (message) => {
  setMessages((prevMessages) => [...prevMessages, {
    ...message,
    timestamp: new Date(message.timestamp) // Convert timestamp to Date object
  }]);
  console.log(message)

      
});
}    catch(e){console.log(e)}
console.log("connected")  
  },[]);
  const sendMessage = async () => {

      // Remplacez par l'ID du destinataire souhaité
    
      const newMessage = {
        senderId: "662237d36ac6898d4578ba8c",
        receiverId: '663385e710873381f3446120',
        content: input,
      };
    
    console.log(newMessage);
    await axios.post('http://localhost:5000/api/messages/send-message', newMessage);

    const response = await axios.get('http://localhost:5000/api/messages/get-all');
    const sortedMessages = response.data.map(message => ({
      ...message,
      timestamp: new Date(message.timestamp) // Convert timestamp to Date object
    })).sort((a, b) => a.timestamp - b.timestamp);
    setMessages(sortedMessages);
        setInput('');
  };

  const formatDate = (timestamp) => {
    const options = { 
      hour12: false, 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric', 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    };
    return timestamp.toLocaleString('en-US', options);
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100vh',
        background: '#f8f8f8',
        padding: '20px',
      }}
    >
{user && (
  <div 
    style={{
      width: '400px',
      height: '500px',
      overflowY: 'scroll',
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '10px',
      marginBottom: '20px',
      background: '#fff',
    }}
  >
    {messages.map((message, index) => (
      <div 
        key={index}
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '10px',
        }}
      >
        <div 
          className={message.receiverId === user._id ? "flex justify-end" : "flex justify-start"}
        >
          <div 
            style={{
              padding: '8px',
              borderRadius: '5px',
              marginBottom: '5px',
              wordWrap: 'break-word',
            }}
            className={message.receiverId === user._id ? "bg-black" : "bg-red-500"}
          >
            {message.content}
          </div>
        </div>
        <div
          style={{
            color: '#888',
            fontSize: '12px',
          }}
        >
          {formatDate(message.timestamp)}
        </div>
      </div>
    ))}
  </div>
)}

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: '300px',
            padding: '8px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '8px 16px',
            borderRadius: '5px',
            border: 'none',
            background: '#007bff',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;