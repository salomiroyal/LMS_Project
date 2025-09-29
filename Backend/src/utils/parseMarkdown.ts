export function parseMarkdownContent(markdown: string) {
  try {
    const titleMatch = markdown.match(/Title:\s*(.*)/i);
    const descriptionMatch = markdown.match(/Description:\s*(.*)/i);
    const categoryMatch = markdown.match(/Category:\s*(.*)/i);

    const title = titleMatch?.[1]?.trim() || "";
    const description = descriptionMatch?.[1]?.trim() || "";
    const category = categoryMatch?.[1]?.trim().toLowerCase() || "";

    const subtopics: any[] = [];
    const subtopicRegex = /Subtopic:\s*([\s\S]+?)(?=(Subtopic:|$))/g;

    let match: RegExpExecArray | null;
    while ((match = subtopicRegex.exec(markdown)) !== null) {
      const block = match[0];
      const subtopicTitle = match[1].trim();

      
      const videos = (block.match(/https?:\/\/[^\s]+/g) || []).filter((v) =>
        v.includes("youtu")
      );

      
      const assignmentSection = block.split("Assignments:")[1] || "";
      const assignments = assignmentSection
        .split("\n")
        .map((line) => line.trim().replace(/^- /, ""))
        .filter((line) => line && !line.startsWith("YouTube"));

      
      const notesSection = block
        .split("YouTube Videos:")[0]
        .replace(/^Subtopic:[^\n]+\n/, "");
      const notes = notesSection
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("Subtopic"))
        .map((line) => ({ text: line })); 

      subtopics.push({
        subtopic: subtopicTitle,
        notes,        
        videos,
        assignments,
      });
    }

    return {
      title,
      description,
      category,
      subtopics,
    };
  } catch (error) {
    console.error("Error parsing markdown content:", error);
    return {
      title: "",
      description: "",
      category: "",
      subtopics: [],
    };
  }
};
