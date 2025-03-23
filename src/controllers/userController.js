const User = require("../models/userModel");
const { sendToken } = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, mobileNum, password } = req.body;
  const user = await User.create({
    name,
    email,
    mobileNum,
    password,
  });

  //send vaerification mail

  await user.requestEmailVerification(
    (token) => `${process.env.DOMAIN}/auth/verify-email?token=${token}`,
    (url) => `
     <p>
          Thank you for joining. We are glad to have you with us. Please click on the below link to verify your Email. This will help us ensure that you receive the updates related to your orders and products.
          <br>
        </p>
        <a href="${url}">
          <button>
            Verify now
          </button>
        </a>
    
    `
  );
  sendToken(user, res);
  res.status(201).json({
    success: true,
    user,
  });
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, res);
  res.status(200).json({
    success: true,
    user,
  });
});

//logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  sendToken(user, res);
  res.status(200).json({
    success: true,
    user,
  });
});
