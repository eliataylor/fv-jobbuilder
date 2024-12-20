import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Search, Plus, ArrowUpRight } from 'lucide-react';
import api from '@/services/api';
import { Project } from '@/types';

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    projectTitle: '',
    author: ''
  });

  // Load projects
  const loadProjects = async (search?: string) => {
    setLoading(true);
    try {
      const data = await api.project.getAll({ search });
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadProjects();
  }, []);

  // Handle search
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      loadProjects(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  // Create new project
  const handleCreateProject = async () => {
    try {
      const created = await api.project.create({
        ...newProject,
        steps: []
      });
      setProjects(prev => [created, ...prev]);
      setShowNewProjectDialog(false);
      setNewProject({ projectTitle: '', author: '' });
      navigate(`/projects/${created._id}`);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Manufacturing Projects</CardTitle>
              <CardDescription>
                Manage and create assembly process documentation
              </CardDescription>
            </div>
            <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label>Project Title</label>
                    <Input
                      placeholder="Enter project title"
                      value={newProject.projectTitle}
                      onChange={(e) => setNewProject(prev => ({
                        ...prev,
                        projectTitle: e.target.value
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <label>Author</label>
                    <Input
                      placeholder="Enter author name"
                      value={newProject.author}
                      onChange={(e) => setNewProject(prev => ({
                        ...prev,
                        author: e.target.value
                      }))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleCreateProject}
                    disabled={!newProject.projectTitle || !newProject.author}
                  >
                    Create Project
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {loading ? (
            <div className="text-center py-8">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? 'No projects found' : 'No projects yet. Create your first project!'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project._id}>
                    <TableCell className="font-medium">{project.projectTitle}</TableCell>
                    <TableCell>{project.author}</TableCell>
                    <TableCell>
                      {new Date(project.lastModified).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(project.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/projects/${project._id}`)}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectList;
