
import { appConfig } from "../Config/appConfig";
import { mongoConnection } from "../db/mongoConnection";
import type { IUserDAO } from "./interfaces/IUserDAO";
import type { ICourseDAO } from "./interfaces/ICourseDAO";
import type { IBatchDAO } from "./interfaces/IBatchDAO";

export class DAOManager {
  static userDao: IUserDAO;
  static courseDao: ICourseDAO;
  static batchDao: IBatchDAO;

  static async init() {
    if (appConfig.DBType === "mongo") {
      
      await mongoConnection();

    
      const { default: UserDAOMongo } = await import("./mongoDb/UserDAOMongo");
      DAOManager.userDao = new UserDAOMongo();

    
      const { CourseDAOMongo } = await import("./mongoDb/CourseDAOMongo");
      DAOManager.courseDao = new CourseDAOMongo();

      
      const { BatchDAOMongo } = await import("./mongoDb/BatchDAOMongo");
      DAOManager.batchDao = new BatchDAOMongo();
    }
  }
};
