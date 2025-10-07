
import type { IBatch } from "../../models/Batch";

export interface IBatchDAO {
  
  createBatch(data: Partial<IBatch>): Promise<IBatch>;
  getAllBatches(): Promise<IBatch[]>;
  getBatchById(id: string): Promise<IBatch | null>;
  updateBatch(id: string, data: Partial<IBatch>): Promise<IBatch | null>;
  deleteBatch(id: string): Promise<IBatch | null>;
  getMyBatches(userId: string, role: "student" | "teacher" | "admin"): Promise<IBatch[]>; 
  getBatchMembers(batchId: string): Promise<{ students: string[]; teachers: string[] }>;

};
















