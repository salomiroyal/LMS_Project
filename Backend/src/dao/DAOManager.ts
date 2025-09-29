import { appConfig } from "../Config/appConfig";
import { mongoConnection } from "../db/mongoConnection";
import type { IUserDAO } from "./interfaces/IUserDAO";

export class DAOManager {
  static userDao: IUserDAO;

  static async init() {
    if (appConfig.DBType === "mongo") {
      await mongoConnection();
      const { default: UserDAOMongo } = await import("./mongoDb/UserDAOMongo");
      DAOManager.userDao = new UserDAOMongo();
    }
  }
}
