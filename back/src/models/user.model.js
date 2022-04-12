'use strict';

import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required! - DB'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is requried! = DB'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.encryptPassword = async password =>
  await bcryptjs.hash(password, 12);

UserSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  user.uid = user._id;

  delete user._id;
  delete user.password;

  return user;
};

export default model('User', UserSchema);
