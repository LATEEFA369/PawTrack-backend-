const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const DM = require('../models/directMessage.js');
const User = require('../models/user.js');
const router = express.Router();



// ========= Protected Routes =========

router.use(verifyToken);

router.get('/' , async (req,res)=>{

    try {
        
        const messages = await DM.find().populate('sender').populate('receiver');
        console.log(messages)
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})



router.post ('/:userid' , async(req,res)=>{
    try{
       const sender = req.user._id;
       console.log(req.user._id)
       const receiver = req.params.userid
   console.log(receiver)
   // Check if sender and receiver are valid users
   const senderUser = await User.findById(sender);
   const receiverUser = await User.findById(receiver);
   if (!senderUser || !receiverUser) {
       return res.status(404).json({ error: "jdnxjdnxcj" });
   }
    const {message}  = req.body;
    
   const newMessage = await DM.create({sender: req.user._id, receiver: req.params.userid, message})
   const sendersave = await User.findById(senderUser)
   const receiversave = await User.findById(receiverUser)
   if(sendersave){
      sendersave.print_message.push(newMessage._id)
      await sendersave.save()
   }
   if(receiversave){
    receiversave.print_message.push(newMessage._id)
    await receiversave.save()
   }
   
    res.status(201).json({ success: "Message sent!", message: newMessage });

    
}

   catch (error) {
       res.status(500).json({ error: "Server error" });
   }

});

module.exports = router;