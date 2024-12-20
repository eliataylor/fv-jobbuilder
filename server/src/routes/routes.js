// routes/projectRoutes.js
import express from 'express';
import Project from '../models/Project';

const router = express.Router();

// PROJECT LEVEL OPERATIONS
// -----------------------

// Create new project
router.post('/projects', async (req, res) => {
  try {
    const { projectTitle, author, steps = [] } = req.body;
    const project = new Project({
      projectTitle,
      author,
      steps
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all projects (with optional filtering)
router.get('/projects', async (req, res) => {
  try {
    const { author, search } = req.query;
    let query = {};

    if (author) query.author = author;
    if (search) {
      query.projectTitle = { $regex: search, $options: 'i' };
    }

    const projects = await Project.find(query)
      .sort({ updatedAt: -1 })
      .select('projectTitle author createdAt updatedAt');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get specific project
router.get('/projects/:projectId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project metadata
router.patch('/projects/:projectId', async (req, res) => {
  try {
    const { projectTitle, author } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        $set: {
          projectTitle,
          author,
          lastModified: new Date()
        }
      },
      { new: true }
    );
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete project
router.delete('/projects/:projectId', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// STEP LEVEL OPERATIONS
// --------------------

// Add new step to project
router.post('/projects/:projectId/steps', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const newStepId = project.steps.length > 0
      ? Math.max(...project.steps.map(s => s.id)) + 1
      : 1;

    const newStep = {
      id: newStepId,
      ...req.body
    };

    project.steps.push(newStep);
    project.lastModified = new Date();
    await project.save();

    res.status(201).json(newStep);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update specific step
router.patch('/projects/:projectId/steps/:stepId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const stepIndex = project.steps.findIndex(s => s.id === parseInt(req.params.stepId));
    if (stepIndex === -1) return res.status(404).json({ error: 'Step not found' });

    // Update step fields while preserving id
    project.steps[stepIndex] = {
      ...project.steps[stepIndex],
      ...req.body,
      id: parseInt(req.params.stepId)
    };

    project.lastModified = new Date();
    await project.save();

    res.json(project.steps[stepIndex]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete specific step
router.delete('/projects/:projectId/steps/:stepId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const stepIndex = project.steps.findIndex(s => s.id === parseInt(req.params.stepId));
    if (stepIndex === -1) return res.status(404).json({ error: 'Step not found' });

    project.steps.splice(stepIndex, 1);
    project.lastModified = new Date();
    await project.save();

    res.json({ message: 'Step deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PARAMETER OPERATIONS
// -------------------

// Add parameter to step
router.post('/projects/:projectId/steps/:stepId/parameters', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const step = project.steps.find(s => s.id === parseInt(req.params.stepId));
    if (!step) return res.status(404).json({ error: 'Step not found' });

    const newParameter = {
      id: Date.now().toString(),
      ...req.body
    };

    step.parameters.push(newParameter);
    project.lastModified = new Date();
    await project.save();

    res.status(201).json(newParameter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update parameter
router.patch('/projects/:projectId/steps/:stepId/parameters/:parameterId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const step = project.steps.find(s => s.id === parseInt(req.params.stepId));
    if (!step) return res.status(404).json({ error: 'Step not found' });

    const paramIndex = step.parameters.findIndex(p => p.id === req.params.parameterId);
    if (paramIndex === -1) return res.status(404).json({ error: 'Parameter not found' });

    step.parameters[paramIndex] = {
      ...step.parameters[paramIndex],
      ...req.body,
      id: req.params.parameterId
    };

    project.lastModified = new Date();
    await project.save();

    res.json(step.parameters[paramIndex]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete parameter
router.delete('/projects/:projectId/steps/:stepId/parameters/:parameterId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const step = project.steps.find(s => s.id === parseInt(req.params.stepId));
    if (!step) return res.status(404).json({ error: 'Step not found' });

    const paramIndex = step.parameters.findIndex(p => p.id === req.params.parameterId);
    if (paramIndex === -1) return res.status(404).json({ error: 'Parameter not found' });

    step.parameters.splice(paramIndex, 1);
    project.lastModified = new Date();
    await project.save();

    res.json({ message: 'Parameter deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
