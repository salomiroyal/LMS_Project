import type { Request, Response } from "express";
import { BatchService } from "../services/BatchService";


export class BatchController {
  private batchService: BatchService;

  constructor(batchService:BatchService) {
    this.batchService = batchService;
  }

  
  createBatch = async (req: Request, res: Response) => {
    try {
      const { batchName, studentIds = [], teacherIds = [], courseIds = [] } = req.body;
      const batch = await this.batchService.createBatch(batchName, studentIds, teacherIds, courseIds);
      res.status(201).json({ message: "Batch created successfully", batch });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to create batch", error: error.message });
    }
  };

  
  getAllBatches = async (req: Request, res: Response) => {
    try {
      const batches = await this.batchService.getAllBatches();
      res.status(200).json({ batches });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch batches", error: error.message });
    }
  };

  
  getBatchById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const batch = await this.batchService.getBatchById(id);
      if (!batch) return res.status(404).json({ message: "Batch not found" });
      res.status(200).json({ batch });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch batch", error: error.message });
    }
  };

  getMyBatches = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const role = (req as any).user.role; // assuming role is in JWT/session

    const myBatches = await this.batchService.getMyBatches(userId, role);

    res.status(200).json({ myBatches });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch my batches", error: error.message });
  }
};

  
getBatchMembers = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const members = await this.batchService.getBatchMembers(id);
      res.status(200).json(members);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch batch members", error: error.message });
    }
  };

  
  updateBatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedBatch = await this.batchService.updateBatch(id, data);
      if (!updatedBatch) return res.status(404).json({ message: "Batch not found" });
      res.status(200).json({ message: "Batch updated successfully", batch: updatedBatch });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to update batch", error: error.message });
    }
  };

  
  deleteBatch = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedBatch = await this.batchService.deleteBatch(id);
      res.status(200).json({ message: "Batch deleted successfully", batch: deletedBatch });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to delete batch", error: error.message });
    }
  };
} 