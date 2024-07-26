import React, { useState } from 'react';
import { IconButton, Tooltip, Popper, Paper, TextField, Fab, Badge, Zoom } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import { useScrollTrigger } from "@mui/material";

const Chatbot = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const fetchAIResponse = async (userMessage) => {
    // Mocking AI response for demonstration
    // Replace this with actual API call to AI service
    const responses = {
      "hello": "Hi there! How can I assist you today?",
      "what is your name": "I am your helpful chatbot.",
      "what are your return policies": "You can return any item within 30 days of purchase. Please visit our return policy page for more details.",
      "recommend a product": "Based on your preferences, I recommend checking out our latest collection on Cart.",
      "how can I track my order": "You can track your order using the tracking number provided in your confirmation email.",
      "what's trending in fashion": "Our current trending items include the latest in fashion trends. Check them out on our homepage!",
      "do you have any sales or discounts": "Yes, we have ongoing sales on selected fashion items. Visit our sales page to view the latest discounts!",
      "can you help me find a dress for a special occasion": "Sure! I recommend exploring our dress collection for special occasions. You can filter by color, size, and style.",
      "how do I choose the right size for clothing": "You can find size guides for each product on its details page. If you need further assistance, feel free to ask!",
      "what brands do you carry": "We carry a variety of top fashion brands known for quality and style. Explore our brand directory for more information."
    };
  
    // Check if userMessage matches any predefined responses, otherwise return a default response
    return responses[userMessage.toLowerCase()] || "I'm sorry, I didn't understand that. Can you please rephrase?";
  };
  
  const handleSendMessage = async () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { sender: "user", text: message }]);
      const aiResponse = await fetchAIResponse(message);
      setChatHistory((prevHistory) => [...prevHistory, { sender: "bot", text: aiResponse }]);
      setMessage("");
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div>
      <Tooltip title="Chat with us" arrow>
        <Fab
          size="large"
          sx={{ position: "fixed", bottom: 33, right: 33 }}
          aria-label="add"
        >
          <IconButton aria-describedby={id} onClick={handleToggle} color="primary">
            <Badge badgeContent={chatHistory.length} color="secondary">
              <ChatIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Fab>
      </Tooltip>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Paper style={{ padding: 20, width: 300 }}>
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {chatHistory.map((chat, index) => (
              <div key={index} style={{ textAlign: chat.sender === "user" ? "right" : "left" }}>
                <p>{chat.text}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', marginTop: 10 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={message}
              onChange={handleMessageChange}
              placeholder="Type your message..."
            />
            <Fab
              onClick={handleSendMessage}
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
            >
              <SendIcon />
            </Fab>
          </div>
        </Paper>
      </Popper>
    </div>
  );
};

export default Chatbot;
