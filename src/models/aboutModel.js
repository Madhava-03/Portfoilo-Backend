import mongoose from "mongoose";
import skillSchema from "./aboutSchemas/skillsSchema.js";
import personalSchema from "./aboutSchemas/personalSchema.js";
import educationSchema from "./aboutSchemas/educationSchema.js";
import experienceSchema from "./aboutSchemas/exprienceSchema.js";
import projectSchema from "./aboutSchemas/projectSchema.js";
import achievementsSchema from "./aboutSchemas/achievementsSchema.js";
import extracurricularSchema from "./aboutSchemas/extracurricularSchema.js";
import languageSchema from "./aboutSchemas/languageSchema.js";
import hobbiesSchema from "./aboutSchemas/hobbiesSchema.js";

const aboutSchema = new mongoose.Schema(
  {
    personal: { type: personalSchema, default: [] },
    // we use this default bcoz while we get request from client it should not get array as undefined
    skills: { type: [skillSchema], default: [] },
    education: { type: [educationSchema], default: [] },
    experience: { type: [experienceSchema], default: [] },
    projects: { type: [projectSchema], default: [] },
    achievements: { type: [achievementsSchema], default: [] },
    extraCurriculars: { type: [extracurricularSchema], default: [] },
    langauges: { type: [languageSchema], default: [] },
    hobbies: { type: [hobbiesSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("About", aboutSchema);
