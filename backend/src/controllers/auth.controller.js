import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;
  if (!email || !password || !fullName) {
    res.status(404).json({
      message: "Enter all details",
    });
  }
  try {
    if (password.length < 6) {
      res.status(400).json({
        message: "Password length should have at least 6 characters",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        message: "User is already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else
      res.status(500).json({
        message: "Internal Server Error, try again later!!",
      });
  } catch (error) {
    console.log(`Error in signup controller: ${error}`);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      message: "Enter all credentials",
    });
  }
  console.log(req.body);
  try {
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      res.status(404).json({
        message: "User have not registered yet",
      });
    }

    const isPaswordCorrect = await bcrypt.compare(
      password,
      existedUser.password
    );
    if (!isPaswordCorrect) {
      res.status(404).json({
        message: "Invalid credentials",
      });
    }
    generateToken(existedUser._id, res);
    res.status(200).json({
      _id: existedUser._id,
      fullName: existedUser.fullName,
      email: existedUser.email,
      profilePic: existedUser.profilePic,
    });
  } catch (error) {
    console.log(`Error in login controller: ${error}`);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(`Error in logout controller: ${error}`);
  }
};

export const profileUpdate = async (req, res) => {
  try {
    const userId = req.user._id;
    const { profilePic } = req.body;
    if (!profilePic) {
      res.status(404).json({
        message: "Profile Pic not provided",
      });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json({
      updatedUser,
    });
  } catch (error) {
    console.log(`Update Profie error: ${error}`);
  }
};

export const checkUser = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(`Error in Authorization: ${error}`);
  }
};
