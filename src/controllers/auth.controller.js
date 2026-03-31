import { loginUser, registerUser } from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    console.log("Registering hit:", req.body);
    const user = await registerUser(req.body);
    console.log("Registered user:", user);
    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await loginUser(req.body);
    console.log("Login data:", data);
    res.status(200).json({ success: true, ...data });
  } catch (error) {
    next(error);
  }
};
