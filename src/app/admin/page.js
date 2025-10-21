'use client';

import { useState, useEffect } from 'react';

export default function Admin() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [content, setContent] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    category: '',
    featured: false
  });
  const [editingProject, setEditingProject] = useState(null);
  const [editingContent, setEditingContent] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [projectsRes, contentRes, analyticsRes, submissionsRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/content'),
        fetch('/api/analytics/track'),
        fetch('/api/admin/submissions')
      ]);

      if (projectsRes.ok) setProjects(await projectsRes.json());
      if (contentRes.ok) setContent(await contentRes.json());
      if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
      if (submissionsRes.ok) setSubmissions(await submissionsRes.json());
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProject ? '/api/admin/projects' : '/api/admin/projects';
      const method = editingProject ? 'PUT' : 'POST';
      const body = editingProject ? { id: editingProject.id, ...newProject } : newProject;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setNewProject({ title: '', description: '', image: '', link: '', category: '', featured: false });
        setEditingProject(null);
        loadData();
        showToast(editingProject ? 'Project updated!' : 'Project added!', 'success');
      } else {
        const data = await response.json();
        showToast(data.message || 'Operation failed', 'error');
      }
    } catch (error) {
      showToast('Operation failed', 'error');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        loadData();
        showToast('Project deleted!', 'success');
      } else {
        showToast('Delete failed', 'error');
      }
    } catch (error) {
      showToast('Delete failed', 'error');
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProject(project);
    setActiveTab('projects');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-gold-400 flex items-center justify-center">
        <div className="loading-spinner"></div>
        <span className="ml-3">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gold-400">
      {/* Header */}
      <div className="bg-black/90 border-b border-gold-500/20 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="text-gold-400/70 text-sm">
            Full Access - No Authentication Required
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-black/80 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            {['dashboard', 'projects', 'content', 'analytics', 'submissions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium capitalize ${
                  activeTab === tab
                    ? 'border-gold-400 text-gold-400'
                    : 'border-transparent text-gold-300 hover:text-gold-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Total Projects</h3>
              <p className="text-3xl font-bold text-gold-400">{projects.length}</p>
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Total Views</h3>
              <p className="text-3xl font-bold text-gold-400">{analytics?.totalViews || 0}</p>
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">Contact Submissions</h3>
              <p className="text-3xl font-bold text-gold-400">{submissions.length}</p>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="glass rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title *</label>
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="input-gold w-full px-4 py-3 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <input
                      type="text"
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="input-gold w-full px-4 py-3 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="input-gold w-full px-4 py-3 rounded-lg"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Image URL *</label>
                    <input
                      type="url"
                      value={newProject.image}
                      onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                      className="input-gold w-full px-4 py-3 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Link *</label>
                    <input
                      type="url"
                      value={newProject.link}
                      onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                      className="input-gold w-full px-4 py-3 rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newProject.featured}
                    onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="featured" className="text-sm">Featured Project</label>
                </div>
                <div className="flex space-x-4">
                  <button type="submit" className="btn-gold px-6 py-3 rounded-lg">
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(null);
                        setNewProject({ title: '', description: '', image: '', link: '', category: '', featured: false });
                      }}
                      className="px-6 py-3 border border-gold-400/30 text-gold-400 rounded-lg hover:bg-gold-400/10"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="glass rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Projects</h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 bg-gold-400/5 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-gold-400/70">{project.category}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="px-3 py-1 bg-gold-400/20 text-gold-400 rounded text-sm hover:bg-gold-400/30"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="glass rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Site Analytics</h2>
              {analytics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gold-400/10 rounded-lg p-4">
                    <h3 className="text-sm text-gold-400/70">Total Views</h3>
                    <p className="text-2xl font-bold">{analytics.totalViews}</p>
                  </div>
                  <div className="bg-gold-400/10 rounded-lg p-4">
                    <h3 className="text-sm text-gold-400/70">Unique Visitors</h3>
                    <p className="text-2xl font-bold">{analytics.uniqueVisitors}</p>
                  </div>
                  <div className="bg-gold-400/10 rounded-lg p-4">
                    <h3 className="text-sm text-gold-400/70">Desktop Users</h3>
                    <p className="text-2xl font-bold">{analytics.deviceTypes?.desktop || 0}</p>
                  </div>
                  <div className="bg-gold-400/10 rounded-lg p-4">
                    <h3 className="text-sm text-gold-400/70">Mobile Users</h3>
                    <p className="text-2xl font-bold">{analytics.deviceTypes?.mobile || 0}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="glass rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Form Submissions</h2>
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div key={submission.id} className="bg-gold-400/5 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{submission.name}</h3>
                    <span className="text-sm text-gold-400/70">
                      {new Date(submission.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gold-400/70 mb-2">{submission.email}</p>
                  <p className="text-sm">{submission.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg ${
          toast.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
