const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter full Name"],
      maxLength: [30, "Name should not exceed 30 character"],
      minLength: [3, "Name should be more than 3 chracters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    mobileNum: {
      type: String,
      required: [true, "mobile number is required"],
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, "any");
        },
      },
      message: "Please enter a valid mobile number",
      unique: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    mobileVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
