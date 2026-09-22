import Link from "next/link";
import "./experience.css";

export default function Experience() {
  return (
    <div className="section" style={{ width: "100%" }}>
      <h2>Experience</h2>

      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot"></div>

          <div className="timeline-content">
            <h3>Intern</h3>
            <h4>CyStar (Centre for Cybersecurity, Trust and Reliability)</h4>
            <h4>
              Under{" "}
              <Link
                href="https://www.cse.iitm.ac.in/~augustine/"
                target="_blank"
                rel="noopener noreferrer"
                className="timeline-link"
              >
                Prof. John Augustine
              </Link>
            </h4>
            <h4>IIT Madras</h4>

            <span className="timeline-date">May 2026 – July 2026</span>

            <p>
              Contributing to <strong>Sethu</strong>, a decentralized trust layer for secure and verifiable digital interactions using decentralized identities (DIDs) and verifiable credentials. Developing full-stack web applications and implementing distributed systems components in Rust, with a focus on BFT consensus, DAG-based architectures, and verifiable data structures. Exploring zero-knowledge proofs (ZKPs) and their applications in privacy-preserving identity and verification systems.


            </p>
          </div>
        </div>
      </div>
    </div>
  );
}