import { NextResponse } from 'next/server';
import { requireAuth } from '../../../../utils/auth';
import { validateProject, sanitizeInput } from '../../../../utils/validation';
import { getProjects as fetchProjects, saveProject, deleteProject as removeProject } from '../../../../lib/firestore-data';

async function getHandler(request) {
  try {
    const projects = await fetchProjects();
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
    
    const newProject = {
      id: Date.now().toString(),
      ...sanitizedProject,
      dateAdded: new Date().toISOString(),
      featured: projectData.featured || false
    };

    await saveProject(newProject);

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
    
    const projects = await fetchProjects();
    const existing = projects.find(p => p.id === id);

    if (!existing) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    const updated = { ...existing, ...sanitizedUpdate };
    await saveProject(updated);

    return NextResponse.json(updated);
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
    
    const deleted = await removeProject(id);

    if (!deleted) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

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
export const POST = postHandler;
export const PUT = putHandler;
export const DELETE = deleteHandler;
