import type { IBatchDAO } from "../interfaces/IBatchDAO";
import BatchModel from "../../models/Batch";
import type { IBatch } from "../../models/Batch";

export class BatchDAOMongo implements IBatchDAO {
  async createBatch(data: Partial<IBatch>): Promise<IBatch> {
    const batch = new BatchModel(data);
    return await batch.save();
  }

  async getAllBatches(): Promise<IBatch[]> {
    return await BatchModel.find()
      .populate("students")
      .populate("teachers")
      .populate({
    path: "course",
    populate: {
      path: "subtitle",
      model: "Subtopic",
      select: "title description notes videos assignments", // Optional: select only required fields
    },
  })
  }

  async getBatchById(id: string): Promise<IBatch | null> {
    return await BatchModel.findById(id)
      .populate("students")
      .populate("teachers")
      .populate({
    path: "course",
    populate: {
      path: "subtitle",
      model: "Subtopic",
      select: "title description notes videos assignments", // Optional: select only required fields
    },
  })
  }

  async updateBatch(id: string, data: Partial<IBatch>): Promise<IBatch | null> {
    return await BatchModel.findByIdAndUpdate(id, data, { new: true })
      .populate("students")
      .populate("teachers")
      .populate("course");
  }

  async deleteBatch(id: string): Promise<IBatch | null> {
    return await BatchModel.findByIdAndDelete(id);
  }

    async getMyBatches(userId: string, role: "student" | "teacher" | "admin"): Promise<IBatch[]> {
    const query: any = {};
    if (role === "student") query.students = userId;
    else if (role === "teacher") query.teachers = userId;
    return await BatchModel.find(query)
      .populate("students")
      .populate("teachers")
      .populate("course");
  }

  async getBatchMembers(batchId: string): Promise<{ students: string[]; teachers: string[] }> {
    const batch = await BatchModel.findById(batchId)
      .populate("students")
      .populate("teachers");

    if (!batch) throw new Error("Batch not found");

    return {
      students: batch.students.map((s: any) => s._id.toString()),
      teachers: batch.teachers.map((t: any) => t._id.toString()),
    };
  }
}
