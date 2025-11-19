import "dotenv/config.js";
import jwt from "jsonwebtoken";
import { User } from "../config/configdb.js";

const auth = async (req, res, next) => {
  const white_lists = ["/v1/api/register", "/v1/api/login"];
  if (white_lists.find((item) => req.originalUrl === item)) {
    next();
  } else {
    if (req.headers?.authorization?.split(" ")?.[1]) {
      const token = req.headers.authorization.split(" ")[1];

      //verify token
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { email: decoded.email } });
        if (user) {
          req.user = {
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } else {
          return res.status(401).json({
            message: "User not found",
          });
        }
        console.log(">>> check token: ", decoded);
        next();
      } catch (error) {
        return res.status(401).json({
          message: "Token bị hết hạn/hoặc không hợp lệ",
        });
      }
    } else {
      return res.status(401).json({
        message: "Bạn chưa truyền Access Token ở header/hoặc token bị hết hạn",
      });
    }
  }
};

export default auth;
