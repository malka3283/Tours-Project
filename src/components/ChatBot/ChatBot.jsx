import { useState, useRef, useEffect } from "react";
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  IconButton, 
  Fab, 
  Avatar, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Collapse,
  Zoom,
  Divider
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import "./ChatBot.css";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "שלום! אני הצ'אטבוט של חברת התעופה. איך אוכל לעזור לך היום?", sender: "bot" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  
  // Sample responses for demo purposes
  const botResponses = [
    "אשמח לעזור לך בבחירת טיסה מתאימה.",
    "האם תרצה מידע על יעדים פופולריים?",
    "אוכל לעזור לך בבדיקת סטטוס הזמנה קיימת.",
    "האם יש לך שאלות לגבי מדיניות הכבודה שלנו?",
    "אני יכול לספק מידע על מחלקות הטיסה השונות שלנו.",
    "האם אתה מעוניין במידע על מבצעים מיוחדים?"
  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user"
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot"
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box className="chatbot-container">
      {/* Chat toggle button */}
      <Zoom in={!isOpen}>
        <Fab 
          color="primary" 
          aria-label="chat"
          className="chat-toggle-button"
          onClick={toggleChat}
        >
          <ChatIcon />
        </Fab>
      </Zoom>
      
      {/* Chat window */}
      <Collapse in={isOpen} className="chat-window-collapse">
        <Paper elevation={3} className="chat-window">
          {/* Chat header */}
          <Box className="chat-header">
            <Box className="header-title">
              <SmartToyIcon className="header-icon" />
              <Typography variant="h6">צ'אטבוט שירות</Typography>
            </Box>
            <IconButton 
              size="small" 
              onClick={toggleChat}
              className="close-button"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Divider />
          
          {/* Chat messages */}
          <List className="chat-messages">
            {messages.map((message) => (
              <ListItem 
                key={message.id} 
                className={`message-item ${message.sender === "bot" ? "bot-message" : "user-message"}`}
              >
                <ListItemAvatar className="message-avatar">
                  <Avatar className={message.sender === "bot" ? "bot-avatar" : "user-avatar"}>
                    {message.sender === "bot" ? <SmartToyIcon /> : <PersonIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={
                    <Typography 
                      variant="body1" 
                      className="message-text"
                    >
                      {message.text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
          
          <Divider />
          
          {/* Chat input */}
          <Box className="chat-input">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="הקלד הודעה..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              size="small"
              InputProps={{
                className: "input-field"
              }}
            />
            <IconButton 
              color="primary" 
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ""}
              className="send-button"
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
};