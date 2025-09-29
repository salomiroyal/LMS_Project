import { Subtopic } from "../models/Subtopic";
import { Problem } from "../models/Problem";
import { CourseDAOMongo } from "../dao/mongoDb/CourseDAOMongo";
import type { ICourseDAO } from "../dao/interfaces/ICourseDAO";

export class CourseService {
  private courseDAO: ICourseDAO;

  constructor(courseDAO: ICourseDAO) {
    this.courseDAO = courseDAO;
  }

  async createCourseWithSubtopics(data: any) {
    const { title, description, category, subtopics = [] } = data;

    const savedCourse = await this.courseDAO.createCourse({ title, description, category });

    const createdSubtopics = await Promise.all(
      subtopics.map(async (sub: any) => {
        const newSub = new Subtopic({
          basecourseId: savedCourse._id,
          title: sub.subtopic,
          notes: sub.notes,
          videos: sub.videos,
          assignments: sub.assignments,
        });
        return await newSub.save();
      })
    );

    savedCourse.subtitle = createdSubtopics.map((s) => s._id);
    await savedCourse.save();

    return savedCourse;
  }

  async createCourseWithProblems(data: any) {
    const { title, description, category, problems = [] } = data;

    const savedCourse = await this.courseDAO.createCourse({ title, description, category });

    const createdProblems = await Promise.all(
      problems.map(async (problem: any) => {
        const newProblem = new Problem({
          basecourseId: savedCourse._id,
          title: problem.title,
          description: problem.description,
          difficulty: problem.difficulty,
          problemLink: problem.problemLink,
          videoLink: problem.videoLink,
          category: problem.category,
        });
        return await newProblem.save();
      })
    );

    savedCourse.problems = createdProblems.map((p) => p._id);
    await savedCourse.save();

    return savedCourse;
  }

  async getAllCourses() {
    return await this.courseDAO.getAllCourses();
  }

  async getCourseById(courseId: string) {
    return await this.courseDAO.getCourseById(courseId);
  }

  async deleteCourse(courseId: string) {
    return await this.courseDAO.deleteCourse(courseId);
  }
}  
