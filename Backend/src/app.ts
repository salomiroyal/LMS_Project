import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { ServiceManager } from "./services/ServiceManager";
import { createUserRouter } from "./routes/userRoutes";
import { createCourseRouter } from "./routes/CourseRoute";
import { createBatchRouter } from "./routes/BatchRoute";

const app = express();
app.use(express.json());
app.use(cors());

export const setupApp = async () => {
  await ServiceManager.init();
  console.log("Services initialized successfully");
  app.use("/api", createUserRouter());
  app.use("/Course", createCourseRouter());
    app.use("/Batch", createBatchRouter());

  
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error middleware caught an error:", err);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  });
  return app; 
};