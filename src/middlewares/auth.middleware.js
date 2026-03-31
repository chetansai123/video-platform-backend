import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    console.log("Protect middleware hit");
    let token;
    if (
      req?.headers?.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token found:", token);
      console.log(
        "Authorization header:",
        req.headers.authorization,
        req.headers.authorization.startsWith("Bearer"),
        req.headers.authorization.split(" ")[1],
      );
    }
    console.log("Token in protect middleware:", token);
    if (!token) {
      res.status(401).json({ message: "Not authorized, no token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
    console.log("User found:", user);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
