const bcrypt = require("bcryptjs");
const User = require("../models/user");

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  try {
    let hashPasswordFromBcrypt = await hashUserPassword(data.password);
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

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUser = async () => {
  try {
    let users = await User.find({}).lean();
    return users;
  } catch (e) {
    throw e;
  }
};

let getUserInfoById = async (userId) => {
  try {
    let user = await User.findById(userId).lean();
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
};

let updateUser = async (data) => {
  try {
    let user = await User.findById(data.id);
    if (user) {
      user.firstname = data.firstname;
      user.lastname = data.lastname;
      user.address = data.address;
      await user.save();
      let allusers = await User.find({}).lean();
      return allusers;
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
};

let deleteUserById = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
    return;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUser: updateUser,
  deleteUserById: deleteUserById,
};
