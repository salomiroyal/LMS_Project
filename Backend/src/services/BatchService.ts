import mongoose from "mongoose";
import { BatchDAOMongo } from "../dao/mongoDb/BatchDAOMongo";
import UserModel from "../models/user";
import type { IBatch } from "../models/Batch";

export class BatchService {
  private batchDAO: BatchDAOMongo;

  constructor(batchDAO: BatchDAOMongo) {
    this.batchDAO = batchDAO;
  }

  
  async createBatch(batchName: string, studentIds: string[], teacherIds: string[], courseIds: string[]) {
    const validStudents = await UserModel.find({
      _id: { $in: studentIds },
      role: "student",
    });

    // Validate teachers
    const validTeachers = await UserModel.find({
      _id: { $in: teacherIds },
      role: "teacher",
    });

    // Pass only validated IDs to DAO
    return this.batchDAO.createBatch({
      batchName,
      students: validStudents.map((s) => s._id),
      teachers: validTeachers.map((t) => t._id),
      course: courseIds.map((id) => new mongoose.Types.ObjectId(id)),
    });
  }

  // ✅ Update batch
  async updateBatch(batchId: string, data: Partial<IBatch>) {
    return this.batchDAO.updateBatch(batchId, data);
  }

  // ✅ Delete batch
  async deleteBatch(batchId: string) {
    const deleted = await this.batchDAO.deleteBatch(batchId);
    if (!deleted) throw new Error("Batch not found");
    return deleted;
  }

  // ✅ Get all batches
  async getAllBatches() {
    return this.batchDAO.getAllBatches();
  }

  // ✅ Get batch by ID
  async getBatchById(batchId: string) {
    return this.batchDAO.getBatchById(batchId);
  }

  // ✅ Get my batches
  async getMyBatches(userId: string, role: "student" | "teacher" | "admin") {
    return this.batchDAO.getMyBatches(userId, role);
  }

  // ✅ Get batch members
 async getBatchMembers(batchId: string) {
    return this.batchDAO.getBatchMembers(batchId);
  }
}
