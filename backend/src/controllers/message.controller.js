import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUserForSidebars = async (req, res) => {
  const { myId: loggedInUserId } = req.body;
  try {
    if (!loggedInUserId) {
      res.status(404).json({
        message: "userId not sent",
      });
    }
    console.log(req.user);
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(`Error in getSideBarUser: ${error}`);
  }
};

export const getMessages = async (req, res) => {
  const friendId = req.params.id;
  const myId = req.user._id;
  try {
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: friendId },
        { senderId: friendId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(`Error in getMessages: ${error}`);
  }
};

export const sendMessages = async (req, res) => {
  const myId = req.user._id;
  const friendId = req.params.id;
  const { text, image } = req.body;
  try {
    let imageUrl;
    if (image) {
      const uploaderResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploaderResponse.secure_url;
    }
    const newMessage = new Message({
      senderId: myId,
      receiverId: friendId,
      text,
      image: imageUrl,
    });
    if (!newMessage) {
      res.status(500).json({ message: "Server Error in sending message" });
    }
    await newMessage.save();
    res.status(200).json({
      message: "Message sent successfully",
      newMessage: newMessage,
    });
  } catch (error) {
    console.log(`Error in sendMessages: ${error}`);
  }
};
