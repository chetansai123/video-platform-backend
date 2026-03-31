import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (data) => {
  const { name, email, password, role } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const allowedRoles = ["viewer", "editor", "admin"];

  const userRole = allowedRoles.includes(role) ? role : "viewer";

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: userRole,
  });
  return newUser;
};

export const loginUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  return { user, token };
};
