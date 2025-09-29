import { DAOManager } from "../dao/DAOManager";
import { CourseService } from "./CourseService";
import { BatchService } from "./BatchService";
import { UserService } from "./UserService";

export class ServiceManager {
  static userService: UserService;
  static courseService: CourseService;
  static batchService: BatchService;

  static async init() {
    
    await DAOManager.init();

    ServiceManager.userService = new UserService(DAOManager.userDao);
    ServiceManager.courseService = new CourseService(DAOManager.courseDao);
    ServiceManager.batchService = new BatchService(DAOManager.batchDao);
  }
}
