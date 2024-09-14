import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
};

export const getFeaturedProjects = async (req, res) => {
  try {
    const featuredProjects = await Project.find({ isFeatured: true });
    res.json(featuredProjects);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching featured projects",
        error: error.message,
      });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating project", error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating project", error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(204).end();
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting project", error: error.message });
  }
};
