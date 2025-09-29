
import mongoose, { Schema, Document } from "mongoose";

export interface INote {
  text: string;
  images: string[];
}

export interface ISubtopic extends Document {
  title: string;
  description?: string;
  basecourseId: mongoose.Types.ObjectId;  // Make sure to use ObjectId type
  notes: INote[];
  videos: string[];
  assignments: string[];
}

const NoteSchema = new Schema<INote>({
  text: { type: String, required: true },
  images: [{ type: String }]
});

const SubtopicSchema = new Schema<ISubtopic>({

  basecourseId: {type: mongoose.Schema.Types.ObjectId,ref: "Basecourse",required: true},
  title: { type: String, required: true },
  notes: [NoteSchema],
  videos: [String],
  assignments: [String]
  
});

export const Subtopic = mongoose.model<ISubtopic>("Subtopic", SubtopicSchema);