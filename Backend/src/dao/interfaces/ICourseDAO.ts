
import type { IBaseCourse } from "../../models/Course";

export interface ICourseDAO {
  
  createCourse(courseData: Partial<IBaseCourse>): Promise<IBaseCourse>;
  getAllCourses(): Promise<IBaseCourse[]>;
  getCourseById(courseId: string): Promise<IBaseCourse | null>;
  updateCourse(courseId: string, updateData: Partial<IBaseCourse>): Promise<IBaseCourse | null>;
  deleteCourse(courseId: string): Promise<IBaseCourse | null>;
}
