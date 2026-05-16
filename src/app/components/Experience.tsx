import './experience.css';

export default function Experience() {
  return (
    <div className="section" style={{ width: '100%' }}>
      <h2>Experience</h2>
      <div className="timeline">
        
        {/* You can duplicate this timeline-item block to add more experience entries */}
        <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
                <h3>Research Intern</h3>
                <h4>CyStar (Centre for Cybersecurity, Trust and Reliability)</h4>
                <h4>IIT Madras</h4>
                <span className="timeline-date">May 2026 - Present</span>
                <p>
                    Currently working and learning in distributed systems and blockchain, with focus on BFT consensus, decentralized architectures, and the Hedera ecosystem through hands-on projects and experimentation
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
