///TRIED HARD TO MAP THIS JSON WITH RENDER CV YAML FILE AND USE RENDERCV TO GENRATE THE LATEX RESUMES BUT LOST PATIENCE AFTER POINT OF TIME DIDNT WANTED TO DELTE THIS TRIED FOR FREAKING 4 HRS

import About from "../models/aboutModel.js";
import catchAsync from "../utlis/catchAsync.js";
import AppError from "../utlis/appError.js";

const mapSocialNetworks = (socials = {}) => {
  const baseUrls = {
    Github: "https://github.com/",
    Linkedin: "https://linkedin.com/in/",
    Instagram: "https://instagram.com/",
    Twitter: "https://twitter.com/",
  };

  return Object.entries(socials)
    .filter(([_, url]) => url) // remove empty strings
    .filter(([network]) => network !== "Portfolio") // handled separately as website
    .map(([network, url]) => ({
      network: network === "Github" ? "GitHub" : network,
      username: url.includes("http") ? url.replace(baseUrls[network], "") : url,
    }));
};

const mapSkills = (skills = []) => {
  const grouped = {};

  skills.forEach((skill) => {
    const category = skill.category || "Other";

    if (!grouped[category]) {
      grouped[category] = [];
    }

    grouped[category].push(skill.name);
  });

  return Object.entries(grouped).map(([category, skills]) => ({
    label: category.charAt(0).toUpperCase() + category.slice(1),
    details: skills.join(", "),
  }));
};

export const filteredData = catchAsync(async (req, res, next) => {
  const about = await About.findOne().lean();

  if (!about) return next(new AppError("About doesn't Exist", 404));

  const cv = {
    name: about.personal.fullName,
    headline: about.personal?.headline,
    location: about.personal?.location,
    photo: about.personal?.profileImg,
    email: about.personal.email,
    phone: about.personal.phone,
    website: about.personal?.socials?.Portfolio,

    socials_networks: mapSocialNetworks(about.personal.socials),

    custom_connections: {
      sections: {
        skills: mapSkills(about.skills),

        education: about.education.map((e) => ({
          institution: e.institution,
          area: e.fieldOfStudy,
          degree: e.degree,
          start_date: e.startYear,
          end_Date: e.endYear,
          isCurrent: e.isCurrent,
          grade: e.grade,
          summary: e.description,
        })),

        experience: about.experience.map((exp) => ({
          company: exp.company,
          position: exp.role,
          start_date: exp.startDate,
          end_date: exp.endDate,
          location: exp.location,
          employmentType: exp.employmentType,
          summary: exp.description,
          technologies: exp.technologies,
          achievements: exp.achievements,
        })),

        projects: about.projects.map((p) => ({
          name: p.title,
          summary: p.description,
          techStack: p.techStack,
          role: p.role,
          start_date: p.startDate,
          end_date: p.endDate,
          liveUrl: p.liveUrl,
        })),

        achievements: about.achievements.map((a) => ({
          title: a.title,
          description: a.description,
          date: a.date,
        })),

        extraCurriculars: about.extraCurriculars.map((ec) => ({
          title: ec.title,
          organization: ec.organization,
          role: ec.role,
          achievements: ec.achievements,
          startDate: ec.startDate,
          isOngoing: ec.isOngoing,
        })),

        langauges: about.langauges.map((l) => ({
          name: l.name,
          proficiency: l.proficiency,
        })),

        hobbies: about.hobbies.map((h) => ({
          name: h.name,
          description: h.description,
        })),
      },
    },
  };

  console.log(cv);

  res.status(200).json({
    status: "success",
    cv,
  });
});
