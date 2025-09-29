
import type{ Request, Response } from "express";
import { CourseService } from "../services/CourseService";
import { fetchGoogleDocAsMarkdown } from "../services/googleDocService";
import { parseMarkdownContent } from "../utils/parseMarkdown";

export class CourseController {
  private courseService: CourseService;

  constructor(courseService:CourseService) {
    this.courseService = courseService;
  }

  
  createCourseFromDocs = async (req: Request, res: Response) => {
    try {
      const { docLink } = req.body;

      if (!docLink || typeof docLink !== "string") {
        return res.status(400).json({ error: "Doc link is required and must be a string" });
      }

      const docId = docLink.split("/d/")[1]?.split("/")[0];
      if (!docId) {
        return res.status(400).json({ error: "Invalid Google Doc URL" });
      }

      const markdown = await fetchGoogleDocAsMarkdown(docId);;
      console.log(markdown);
      if (!markdown) {
        return res.status(500).json({ error: "Failed to fetch document content." });
      }

      const structuredData = parseMarkdownContent(markdown) as {
        title?: string;
        description?: string;
        category?: string;
        subtopics?: any[];
        problems?: any[];
      };

      console.log("Parsed structuredData:", structuredData);

      const category = structuredData.category?.toLowerCase();
      if (!category || !["web", "dsa", "c"].includes(category)) {
        return res.status(400).json({
          message: "Invalid category. Should be 'web', 'dsa', or 'c'.",
        });
      }

      let savedCourse;
      if (category === "web") {
        savedCourse = await this.courseService.createCourseWithSubtopics(structuredData);
      } else {
        savedCourse = await this.courseService.createCourseWithProblems(structuredData);
      }

      return res.status(201).json({
        message: "Course created successfully",
        course: savedCourse,
      });
    } catch (error: any) {
      console.error("Error creating course from doc:", error);
      return res.status(500).json({
        error: "Something went wrong",
        details: error.message,
      });
    }
  };

  fetchAllCourses = async (req: Request, res: Response) => {
    try {
      const courses = await this.courseService.getAllCourses();
      return res.status(200).json(courses);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  fetchCourseById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const course = await this.courseService.getCourseById(id);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      return res.status(200).json(course);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  removeCourse = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedCourse = await this.courseService.deleteCourse(id);

      if (!deletedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }

      return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
}
