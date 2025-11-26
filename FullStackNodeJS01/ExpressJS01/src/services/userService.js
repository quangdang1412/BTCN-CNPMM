import "dotenv/config.js";
import { User } from "../config/configdb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;

export const createUserService = async (
  name,
  email,
  password,
  role = "User"
) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      console.log(">>> user exist, chọn 1 email khác: ${email}");
      return null;
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);
    //save user to database
    let result = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: "User",
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      //compare password
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return {
          EC: 2,
          EM: "Email/Password không hợp lệ",
        };
      } else {
        //create an access token
        const payload = {
          email: user.email,
          name: user.name,
          role: user.role,
        };

        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE || "1d",
        });
        const refresh_token = jwt.sign(
          payload,
          process.env.REFRESH_JWT_SECRET || process.env.JWT_SECRET,
          {
            expiresIn: process.env.REFRESH_JWT_EXPIRE || "7d",
          }
        );

        return {
          EC: 0,
          access_token,
          refresh_token,
          user: {
            email: user.email,
            name: user.name,
            role: user.role,
          },
        };
      }
    } else {
      return {
        EC: 1,
        EM: "Email/Password không hợp lệ",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserService = async () => {
  try {
    let result = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
