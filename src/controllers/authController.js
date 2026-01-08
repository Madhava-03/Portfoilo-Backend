import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppError from "../utilis/appError.js";
import catchAsync from "../utilis/catchAsync.js";
import crypto from "crypto";

//creating the jwt Token

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// creating the token and sending it to via cookies with expiry and hiding the password

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

//signing up

export const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return next(new AppError("Name,Email and Password are Required", 400));
  }

  const existuser = await User.findOne({ email });

  if (existuser) {
    return next(new AppError("User already exist with this Credentials"), 400);
  }

  const user = await User.create({
    name,
    email,
    password,

    role: role || "user",
  });

  createSendToken(user, 201, res);
});

//login

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user.isActive) {
    return next(new AppError("This user is deactivated!", 401));
  }
  // console.log(req.body);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  user.loginCount += 1; // this for our analytics
  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  createSendToken(user, 200, res);
});

//Protect Middleware

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("You are not logged in please login"), 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET); //this validate the token

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("the user belonging to this token no longer exist", 401)
    );
    // if this user is being deleted then we should not login using that token
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User changed password recently please login again", 401)
    );
  }

  req.user = currentUser; //finally user is validated and user is forwarded
  next();
});

//Role Based access

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      // if the role is not defined or not in the defined enum it will throw error
      return next(new AppError("You are not allowed to do this", 403));
    }
    next();
  };
};

//loggingOUT

export const logout = (req, res) => {
  res.clearCookie("jwt", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({
    status: "sucess",
    message: "Sucessfully Logged Out",
  });
};

//forgot password

export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("User with this mail does not exist", 404));
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${process.env.PASSWORD_RESET_URL}/${resetToken}`;

  console.log(resetURL); // we are accessign this from console now wil later automate via the email

  res.status(200).json({
    status: "success",
    message: "password token sent to gmail",
  });
});

//reset the password now birooooooo

export const resetPassword = catchAsync(async (req, res, next) => {
  const token = req.params.token;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is expired please try again", 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.passwordChangedAt = Date.now();

  await user.save({ validateBeforeSave: false }); //changes wont be done until we do this

  // login automatically after password reset

  createSendToken(user, 200, res);
});

// Deleting The User

export const deleteMe = catchAsync(async (req, res, next) => {
  //this user id is coming for protect middlware
  await User.findOneAndUpdate(req.user._id, { isActive: false });

  res.status(204).json({
    status: "success",
    message: "Account Deleted Successfully bro",
    data: null,
  });
});
