const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const DM = require('../models/directMessage.js');
const router = express.Router();



// ========= Protected Routes =========

router.use(verifyToken);

router.get('/messages' , async (req,res)=>{

    try {
        const { sender, receiver } = req.query;
        if (!sender || !receiver) {
            return res.status(400).json({ error: "Sender and receiver are required" });
        }

        // Fetch messages between two users (sorted by creation date)
        const userMessages = await Message.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ]
        }).sort({ createdAt: 1 });

        res.json(userMessages);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})


router.post ('/messages' , async(req,res)=>{
    
     try{
    const { sender, receiver, message } = req.body;
    const newMessage = new Message({ sender, receiver, message });
        await newMessage.save();
        res.status(201).json({ success: "Message sent!", message: newMessage });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;