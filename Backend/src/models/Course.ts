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
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
});

// ✅ Remove irrelevant fields before saving
BaseCourseSchema.pre<IBaseCourse>("save", function (next) {
  if (this.category === Category.WEB) {
    this.set("problems", undefined, { strict: false });
  } else if (this.category === Category.PROBLEM) {
    this.set("subtitle", undefined, { strict: false });
  }
  next();
});


BaseCourseSchema.set("toJSON", {
  transform: function (doc, ret: any) {
    if (ret.category === Category.WEB) {
      delete ret.problems;
    } else if (ret.category === Category.PROBLEM) {
      delete ret.subtitle;
    }
    return ret;
  },
});


export const Basecourse = mongoose.model<IBaseCourse>("Basecourse", BaseCourseSchema);
