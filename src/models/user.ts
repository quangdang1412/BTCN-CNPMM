import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  address?: string;
  phoneNumber?: string;
  gender: boolean;
  roleId?: string;
  positionId?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    gender: {
      type: Boolean,
      default: false,
    },
    roleId: {
      type: String,
    },
    positionId: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
