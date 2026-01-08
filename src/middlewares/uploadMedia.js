// // we will be using multer and multer-storage-cloudinary for handling files between server and cloud

// import multer from "multer";
// import CloudinaryStorage from "multer-storage-cloudinary";
// import cloudinary from "../Config/cloudinary.js";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     console.log("➡️ Multer received file:", file.originalname);
//     const isVideo = file.mimetype.startsWith("video");

//     return {
//       folder: "social-content",
//       resource_type: isVideo ? "video" : "image",
//       allowed_formats: isVideo
//         ? ["mp4", "mov"]
//         : ["jpg", "jpeg", "png", "webp"],
//     };
//   },
// });

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024,
//   },
// });

// export default upload;

import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

export default upload;
