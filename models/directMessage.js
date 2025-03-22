const mongoose = require('mongoose');

// Direct message schema
const directMessageSchema = new mongoose.Schema(
  {
    sender: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', // Reference to the user who sent the message
      required: true 
    },
    receiver: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', // Reference to the user who received the message
      required: true 
    },
    message: { 
      type: String, 
      required: true // The content of the message
    },
    timestamp: { 
      type: Date, 
      default: Date.now // The time the message was sent
    }
  }
);

