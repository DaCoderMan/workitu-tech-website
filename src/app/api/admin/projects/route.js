import { NextResponse } from 'next/server';
import { requireAuth } from '../../../../utils/auth';
import { validateProject, sanitizeInput } from '../../../../utils/validation';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');

function getProjects() {
  try {
    const data = fs.readFileSync(PROJECTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveProjects(projects) {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
}

async function getHandler(request) {
  try {
    const projects = getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function postHandler(request) {
  try {
    const projectData = await request.json();
    
    // Sanitize input
    const sanitizedProject = {
      title: sanitizeInput(projectData.title),
      description: sanitizeInput(projectData.description),
      image: sanitizeInput(projectData.image),
      link: sanitizeInput(projectData.link),
      category: sanitizeInput(projectData.category) || 'General'
    };
    
    // Validate project
    const validation = validateProject(sanitizedProject);
    if (!validation.isValid) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }
    
    const projects = getProjects();
    const newProject = {
      id: Date.now().toString(),
      ...sanitizedProject,
      dateAdded: new Date().toISOString(),
      featured: projectData.featured || false
    };
    
    projects.push(newProject);
    saveProjects(projects);
    
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function putHandler(request) {
  try {
    const { id, ...updateData } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { message: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    // Sanitize input
    const sanitizedUpdate = {};
    if (updateData.title) sanitizedUpdate.title = sanitizeInput(updateData.title);
    if (updateData.description) sanitizedUpdate.description = sanitizeInput(updateData.description);
    if (updateData.image) sanitizedUpdate.image = sanitizeInput(updateData.image);
    if (updateData.link) sanitizedUpdate.link = sanitizeInput(updateData.link);
    if (updateData.category) sanitizedUpdate.category = sanitizeInput(updateData.category);
    if (updateData.featured !== undefined) sanitizedUpdate.featured = updateData.featured;
    
    // Validate if updating required fields
    if (sanitizedUpdate.title || sanitizedUpdate.description || sanitizedUpdate.link) {
      const validation = validateProject({
        title: sanitizedUpdate.title || 'temp',
        description: sanitizedUpdate.description || 'temp',
        image: sanitizedUpdate.image || '/temp.jpg',
        link: sanitizedUpdate.link || 'https://temp.com'
      });
      
      if (!validation.isValid) {
        return NextResponse.json(
          { message: 'Validation failed', errors: validation.errors },
          { status: 400 }
        );
      }
    }
    
    const projects = getProjects();
    const projectIndex = projects.findIndex(p => p.id === id);
    
    if (projectIndex === -1) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }
    
    projects[projectIndex] = { ...projects[projectIndex], ...sanitizedUpdate };
    saveProjects(projects);
    
    return NextResponse.json(projects[projectIndex]);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function deleteHandler(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { message: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    const projects = getProjects();
    const filteredProjects = projects.filter(p => p.id !== id);
    
    if (projects.length === filteredProjects.length) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }
    
    saveProjects(filteredProjects);
    
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = getHandler;
export const POST = requireAuth(postHandler);
export const PUT = requireAuth(putHandler);
export const DELETE = requireAuth(deleteHandler);
