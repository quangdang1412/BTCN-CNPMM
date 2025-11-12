import bcrypt from "bcryptjs";
import User, { IUser } from "../models/user";

const salt = bcrypt.genSaltSync(10);

interface UserData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  address?: string;
  phoneNumber?: string;
  gender: string;
  roleId?: string;
  positionId?: string;
}

interface UpdateUserData {
  id: string;
  firstname: string;
  lastname: string;
  address: string;
}

const createNewUser = async (data: UserData): Promise<string> => {
  try {
    const hashPasswordFromBcrypt = await hashUserPassword(data.password);
    const newUser = new User({
      email: data.email,
      password: hashPasswordFromBcrypt,
      firstname: data.firstname,
      lastname: data.lastname,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === "1" ? true : false,
      roleId: data.roleId,
      positionId: data.positionId,
    });
    await newUser.save();
    return "OK create a new user successfull";
  } catch (e) {
    throw e;
  }
};

const hashUserPassword = (password: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = async (): Promise<any[]> => {
  try {
    const users = await User.find({}).lean();
    return users as any[];
  } catch (e) {
    throw e;
  }
};

const getUserInfoById = async (userId: string): Promise<any | null> => {
  try {
    const user = await User.findById(userId).lean();
    if (user) {
      return user as any;
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
};

const updateUser = async (data: UpdateUserData): Promise<any[] | null> => {
  try {
    const user = await User.findById(data.id);
    if (user) {
      user.firstname = data.firstname;
      user.lastname = data.lastname;
      user.address = data.address;
      await user.save();
      const allusers = await User.find({}).lean();
      return allusers as any[];
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
};

const deleteUserById = async (userId: string): Promise<void> => {
  try {
    await User.findByIdAndDelete(userId);
    return;
  } catch (e) {
    throw e;
  }
};

export default {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUser,
  deleteUserById,
};
