import jwt from "jsonwebtoken";

const genToken = async (userId) => {
  try {
    const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    const token = await jwt.sign({ userId }, jwtSecret, { expiresIn: "10d" });
    return token;
  } catch (error) {
    console.log(error);
  }
};

export default genToken;
