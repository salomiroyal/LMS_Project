
import { Router } from "express";
import { CourseController } from "../controllers/CourseController";
import { ServiceManager } from "../services/ServiceManager";
import { authenticate, isAdmin } from "../middleware/AuthMiddleware";

export function createCourseRouter() {
  const router = Router();
  const courseController = new CourseController(ServiceManager.courseService);

  router.post("/create-from-docs",authenticate,isAdmin,courseController.createCourseFromDocs);
  router.delete("/:id",authenticate,isAdmin,courseController.removeCourse);
  router.get("/", courseController.fetchAllCourses);
  router.get("/:id", courseController.fetchCourseById);

  return router;
};
