export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("Authorizing user with role:", req.user.role);
    console.log("checking", roles.includes(req.user.role));
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: `Access denied for ${req.user.role} Role` });
    }
    next();
  };
};
