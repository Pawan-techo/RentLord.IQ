import { createUser, getUserByEmail } from "../services/userServices.js";
import { generateToken } from "../config/jwtProvider.js";
import bcrypt from "bcrypt";

// Register user
export const register = async (req, res) => {
  try {
    const user = await createUser(req.body);
    const jwt = generateToken(user._id);

    return res.status(201).json({
      jwt,
      message: "Registered Successfully!!",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid email or password" });

    const jwt = generateToken(user._id);

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(200).json({
      message: "Login successful",
      jwt,
      user: userObj,
    });

  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};