"use client";

import { useRef } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectCarousel({ projects }: { projects: any[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <div className="carousel-wrapper">
      <button className="carousel-btn left-btn" aria-label="Scroll Left" onClick={scrollLeft}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      
      <div className="project-carousel" ref={carouselRef}>
        {projects.map((project) => (
          <ProjectCard key={project.projectId} project={project} />
        ))}
      </div>

      <button className="carousel-btn right-btn" aria-label="Scroll Right" onClick={scrollRight}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
    </div>
  );
}
