import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AppError from "../utilis/appError.js";
import catchAsync from "../utilis/catchAsync.js";

// this function will take you to the google auth websitre ang get back with the code which will be later used to exahnce with tokens
export const googleAuth = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    return res.status(400).json({
      status: "fail",
      message: "You are already logged in!",
    });
  }

  const googleURL =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=openid profile email` +
    `&access_type=offline` +
    `&prompt=consent`;

  res.redirect(googleURL);
});

export const googleCallback = catchAsync(async (req, res, next) => {
  const { code } = req.query;

  if (!code) {
    return next(new AppError("Google Login Failed !", 400));
  }

  const tokenRes = await axios.post(
    "https://oauth2.googleapis.com/token",
    new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const { access_token, id_token } = tokenRes.data;
  // const data = jwt.decode(id_token);
  // console.log(data);
  // console.log(tokenRes);
  if (!access_token) {
    return next(new AppError("Failed to obatin the access token", 500));
  }

  const userRes = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );

  // console.log(userRes);
  const gUser = userRes.data;

  if (!gUser.email) {
    return next(new AppError("Google account doesn't have mail", 400));
  }

  let user = await User.findOne({ email: gUser.email });

  if (user && user.provider !== "google") {
    return res.status(400).json({
      status: "fail",
      message: "This email already exists with normal signup",
    });
  }

  if (!user) {
    user = await User.create({
      name: gUser.name,
      email: gUser.email,
      avatar: gUser.picture,
      googleId: gUser.sub,
      provider: "google",
    });
  }

  const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  res.cookie("jwt", jwtToken, cookieOptions);
  res.redirect("/dashboard.html");
});
