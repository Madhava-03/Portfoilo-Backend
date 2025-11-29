import About from "../models/aboutModel.js";
import catchAsync from "../utlis/catchAsync.js";
import AppError from "../utlis/appError.js";

export const getAbout = catchAsync(async (req, res, next) => {
  const about = await About.findOne();

  if (!about) {
    return next(new AppError("About Does not Exists", 404));
  }

  res.status(200).json({
    status: "sucess",
    data: {
      about,
    },
  });
});

// protected HTTP requests for admin

export const createAbout = catchAsync(async (req, res, next) => {
  const exists = await About.findOne();

  if (exists) {
    return next(new AppError("About section already exists", 400));
  }

  const about = await About.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      about,
    },
  });
});

export const updateAbout = catchAsync(async (req, res, next) => {
  const exists = await About.findOne();

  if (!exists) {
    return next(new AppError("About section does not exists", 400));
  }

  const updatedAbout = await About.findOneAndUpdate({}, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      updatedAbout,
    },
  });
});

export const deleteAbout = catchAsync(async (req, res, next) => {
  const exist = await About.findOne();

  if (!exist) {
    return next(new AppError("Nothing to delete"));
  }

  await About.deleteOne();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// new controller to push to multivalue schemas

const pushToArray = (field) =>
  catchAsync(async (req, res, next) => {
    const exist = await About.findOneAndUpdate(
      {},
      {
        $push: { [field]: req.body },
      },
      { new: true, runValidators: true }
    );

    if (!exist) {
      return next(new AppError("About does not exist", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        exist,
      },
    });
  });

// new controller to update the new specific schemas

const updateSubdocument = (field) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updateData = {};

    Object.keys(req.body).forEach((key) => {
      updateData[`${field}.$.${key}`] = req.body[key];
    });

    const updated = await About.findOneAndUpdate(
      { [`${field}._id`]: id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return next(new AppError("Document does not exist", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        updated,
      },
    });
  });

const deleteSubdocument = (field) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const update = await About.findOneAndUpdate(
      {},
      {
        $pull: { [field]: { _id: id } },
      },
      { new: true, runValidators: true }
    );

    if (!update) {
      return next(new AppError("Document does not exist", 404));
    }

    res.status(200).json({
      status: "success",
      messaage: "item deleted",
    });
  });

export const addSkill = pushToArray("skills");
export const addEducation = pushToArray("education");
export const addExperience = pushToArray("experience");
export const addProject = pushToArray("projects");
export const addAchievement = pushToArray("achievements");
export const addExtracurricular = pushToArray("extraCurriculars");
export const addLanguage = pushToArray("langauges");
export const addHobby = pushToArray("hobbies");

export const updateSkill = updateSubdocument("skills");
export const updateEducation = updateSubdocument("education");
export const updateExperience = updateSubdocument("experience");
export const updateProject = updateSubdocument("projects");
export const updateAchievement = updateSubdocument("achievements");
export const updateExtracurricular = updateSubdocument("extraCurriculars");
export const updateLanguage = updateSubdocument("langauges");
export const updateHobby = updateSubdocument("hobbies");

export const deleteSkill = deleteSubdocument("skills");
export const deleteEducation = deleteSubdocument("education");
export const deleteExperience = deleteSubdocument("experience");
export const deleteProject = deleteSubdocument("projects");
export const deleteAchievement = deleteSubdocument("achievements");
export const deleteExtracurricular = deleteSubdocument("extraCurriculars");
export const deleteLanguage = deleteSubdocument("langauges");
export const deleteHobby = deleteSubdocument("hobbies");
