
import mongoose, { Document, Schema } from 'mongoose';


export interface IBatch extends Document {
  batchName: string;
  course:mongoose.Types.ObjectId[];
  students: mongoose.Types.ObjectId[]; 
  teachers: mongoose.Types.ObjectId[]; 
}

const BatchSchema = new Schema<IBatch>(
  {
    batchName: { type: String, required: true },
    course:[{ type:mongoose.Schema.Types.ObjectId, ref:"Basecourse" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true 
  }
);

const BatchModel = mongoose.model<IBatch>('Batch', BatchSchema);

export default BatchModel;

