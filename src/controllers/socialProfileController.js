import Profile from "../models/socialProfileModel.js";
import catchAsync from "../utilis/catchAsync.js";
import AppError from "../utilis/appError.js";

export const getSocialMedia = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne();
  if (!profile) return next(new AppError("profile not found", 404));

  res.status(200).json({
    status: "success",
    data: profile,
  });
});

export const upsertSocialMedia = catchAsync(async (req, res, next) => {
  const existingProfile = await Profile.findOne();
  let profile;

  if (existingProfile) {
    profile = await Profile.findByIdAndUpdate(existingProfile.id, req.body, {
      new: true,
      runValidators: true,
    });
  } else {
    profile = await Profile.create(req.body);
  }

  res.status(existingProfile ? 200 : 201).json({
    status: "sucess",
    data: profile,
  });
});

export const deleteSocialMedia = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne();

  if (!profile) return next(new AppError("no profile exist for deletion"), 404);

  res.status(200).json({
    status: "success",
    data: null,
  });
});
