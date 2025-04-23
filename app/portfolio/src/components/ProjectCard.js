import React from 'react';
import '../styles/ProjectCard.css';

function ProjectCard({ title, description, link, github }) {
  return (
    <div className="project-card">
      <div className="project-info">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-links">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="project-link">
              GitHub
            </a>
          )}
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
              View Project
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard; 