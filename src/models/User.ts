import mongoose from "mongoose";

export interface IUser {
  name: string;
  password: string;
  email: string;
}

const schema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 100,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("user", schema);
