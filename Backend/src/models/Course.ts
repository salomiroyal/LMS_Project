import mongoose, { Document, Schema } from "mongoose";
import { Category } from "../enum/Category";


export interface IBaseCourse extends Document {
  title: string;
  description: string;
  category: Category;
  subtitle: mongoose.Types.ObjectId[];
  problems: mongoose.Types.ObjectId[];
}

const BaseCourseSchema = new Schema<IBaseCourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: Object.values(Category), required: true },
  subtitle: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subtopic" }],
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }]
});

BaseCourseSchema.pre<IBaseCourse>("save", function (next) {
  if (this.category === Category.WEB) {
    this.problems = [];
  } else if (this.category === Category.PROBLEM) {
    this.subtitle = [];
  }
  next();
});



export const Basecourse = mongoose.model<IBaseCourse>("Basecourse", BaseCourseSchema); 


// import { Subtopic } from "../models/Subtopic";
// import { Problem } from "../models/Problem";
// import { Basecourse } from "../models/Basecourse";
// import { Types } from "mongoose";

// // Create a course with subtopics or problems depending on category
// export const createCourse = async (data: any) => {
//   try {
//     const { title, description, category, phase, subtopics, problems } = data;
    
//     if (!title || !description || !category || !phase) {
//       throw new Error("Missing required course fields.");
//     }
//     const course = new Basecourse({ title, description, category, phase });
//      let savedCourse;
//     try {
//       savedCourse = await course.save();
//       console.log("Saved course:", savedCourse);
//     } catch (err) {
//       console.error("Error saving course:", err);
//       throw new Error("Database save failed");
//     }

//     // Handle subtopics for 'web'
//     if (category === "web" && Array.isArray(subtopics) && subtopics.length > 0) {
//       const createdSubtopics = await Promise.all(
//         subtopics.map(async (sub: any) => {
//           const newSub = new Subtopic({
//             basecourseId: savedCourse._id,
//             title: sub.subtopic,
//             notes: sub.notes,
//             videos: sub.videos,
//             assignments: sub.assignments,
//           });
//            console.log("Saved Subtopic ID:", savedCourse._id);
//           return await newSub.save();
//         })
//       );
//      savedCourse.subtitle = createdSubtopics.map((s) => s._id) as Types.ObjectId[];
//     }

//     // Handle problems for 'problem'
//     if (category === "problem" && Array.isArray(problems) && problems.length > 0) {
//       const createdProblems = await Promise.all(
//         problems.map(async (problem: any) => {
//           const newProblem = new Problem({
//             basecourseId: savedCourse._id,
//             title: problem.title,
//             description: problem.description,
//             difficulty: problem.difficulty,
//             problemLink: problem.problemLink,
//             videoLink: problem.videoLink,
//             category: problem.category,
            
//           });
//           return await newProblem.save();
//         })
//       );
//       savedCourse.problems = createdProblems.map((p) => p._id) as Types.ObjectId[];
//     }

//     await savedCourse.save();
//     return savedCourse;

//   } catch (error: any) {
//     throw new Error(`Failed to create course: ${error.message}`);
//   }

// export const createCourseFromDocs = async (req: Request, res: Response) => {
//   try {
//     const { docLink } = req.body;

//     // 1. Validate docLink
//     if (!docLink || typeof docLink !== "string") {
//       return res.status(400).json({
//         success: false,
//         error: "Google Docs link is required",
//       });
//     }

//     // 2. Extract the Google Doc ID
//     const docId = docLink.split("/d/")[1]?.split("/")[0];
//     if (!docId) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid Google Docs URL",
//       });
//     }

// }; create a course here have some problem  