
import { Router } from "express";
import { BatchController } from "../controllers/BatchController";
import { ServiceManager } from "../services/ServiceManager";
import { authenticate, isAdmin } from "../middleware/AuthMiddleware";

export function createBatchRouter() {
  const router = Router();
  const batchController = new BatchController(ServiceManager.batchService);

router.post("/create", authenticate, isAdmin, batchController.createBatch);
router.put("/:id", authenticate, isAdmin, batchController.updateBatch);
router.delete("/:id", authenticate, isAdmin, batchController.deleteBatch);
router.get("/all", batchController.getAllBatches);
router.get("/my-batches", authenticate, batchController.getMyBatches);
router.get("/:id/members", batchController.getBatchMembers);
router.get("/:id", batchController.getBatchById);

  

  return router;
};
