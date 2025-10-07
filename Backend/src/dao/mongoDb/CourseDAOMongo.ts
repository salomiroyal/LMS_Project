
import type { ICourseDAO } from "../interfaces/ICourseDAO";
import { Basecourse} from "../../models/Course"; 
import type { IBaseCourse } from "../../models/Course";

export class CourseDAOMongo implements ICourseDAO {
  
  async createCourse(courseData: Partial<IBaseCourse>): Promise<IBaseCourse> {
    const course = new Basecourse(courseData);
    return await course.save();
  }

  async getAllCourses(): Promise<IBaseCourse[]> {
    return await Basecourse.find()
         .populate({
      path: "subtitle",
      model: "Subtopic", 
      select: "title description notes videos assignments", 
    })
    .exec();
  }

  async getCourseById(courseId: string): Promise<IBaseCourse | null> {
  return await Basecourse.findById(courseId)
    .populate({
      path: "subtitle",
      model: "Subtopic", 
      select: "title description notes videos assignments", 
    })
    .exec();
}

  async deleteCourse(courseId: string): Promise<IBaseCourse | null> {
    return await Basecourse.findByIdAndDelete(courseId).exec();
  }

  async updateCourse(courseId: string, updateData: Partial<IBaseCourse>): Promise<IBaseCourse | null> {
    return await Basecourse.findByIdAndUpdate(courseId, updateData, { new: true }).exec();
  }
};
