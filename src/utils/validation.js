export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateProject(project) {
  const errors = [];
  
  if (!project.title || project.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }
  
  if (!project.description || project.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters long');
  }
  
  if (!project.link || !isValidUrl(project.link)) {
    errors.push('Please provide a valid URL');
  }
  
  if (!project.image || (!isValidUrl(project.image) && !project.image.startsWith('/'))) {
    errors.push('Please provide a valid image URL or upload an image');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateContactForm(formData) {
  const errors = [];
  
  if (!formData.name || formData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!formData.email || !validateEmail(formData.email)) {
    errors.push('Please provide a valid email address');
  }
  
  if (!formData.message || formData.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateContent(content) {
  const errors = [];
  
  if (!content.title || content.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }
  
  if (!content.description || content.description.trim().length < 10) {
    errors.push('Description must be at least 10 characters long');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;

  // HTML entity encoding to prevent XSS
  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  return input
    .trim()
    .replace(/[&<>"'`=/]/g, char => htmlEntities[char])
    .substring(0, 1000); // Limit length
}

export function sanitizeUrl(url) {
  if (typeof url !== 'string') return '';

  const trimmed = url.trim();

  // Only allow http, https, and relative URLs
  if (trimmed.startsWith('http://') ||
      trimmed.startsWith('https://') ||
      trimmed.startsWith('/')) {
    return trimmed.substring(0, 2000);
  }

  return '';
}
