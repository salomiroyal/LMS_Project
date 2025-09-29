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


