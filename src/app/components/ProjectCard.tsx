export default function ProjectCard({ project }: { project: any }) {
  const docsLink = project.docs ? (
    <a href={project.docs} target="_blank" rel="noopener noreferrer" className="project-link-icon" title="API Docs">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
    </a>
  ) : null;

  return (
    <div className="project-card">
      <div className="project-image-container">
        {project.customIcon ? (
          <div className="custom-icon-wrapper" dangerouslySetInnerHTML={{ __html: project.customIcon }} />
        ) : (
          <img src={project.image} alt={project.title} className="project-image" />
        )}
        <div className="project-overlay">
          <div className="project-links">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-icon" title="View Code">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            {project.live && project.live !== "#" && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link-icon" title="Live Demo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            )}
            {docsLink}
          </div>
        </div>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag: string) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
