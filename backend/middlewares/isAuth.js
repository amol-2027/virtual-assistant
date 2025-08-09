import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "token not found" });
    }
    const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    const verifyToken = await jwt.verify(token, jwtSecret);
    req.userId = verifyToken.userId;

    next();
  } catch (error) {
    console.log(error);
    // If it's an invalid signature error, clear the token and return unauthorized
    if (error.name === "JsonWebTokenError") {
      res.clearCookie("token");
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "is Auth error" });
  }
};

export default isAuth;
