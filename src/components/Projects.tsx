import { useReveal } from '../hooks/useReveal'
import { ProjectsBelt } from './ProjectsBelt'

function PublicationBlock() {
  const { ref, inView } = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`pub-block glass-card reveal-up${inView ? ' in' : ''}`} style={{ marginTop: '2.5rem' }} aria-label="IEEE Publication">
      <div>
        <div className="pub-label">📄 IEEE Publication</div>
      </div>
      <div className="pub-content">
        <div className="pub-title">"Identifying Various Types of Brain Tumors using Deep Neural Network based Image Features"</div>
        <div className="pub-venue">ICC-ROBINS 2024 · DOI: 10.1109/ICC-ROBINS60238.2024.10533941</div>
        <div className="pub-stats" aria-label="Publication stats">
          <span>99.84% Accuracy</span>
          <span>7,023 MRI Scans</span>
          <span>EfficientNetB3</span>
          <span>Co-authored</span>
        </div>
      </div>
      <a
        href="https://doi.org/10.1109/ICC-ROBINS60238.2024.10533941"
        target="_blank"
        rel="noopener noreferrer"
        className="pub-link"
        data-cursor="Read"
        aria-label="Read IEEE paper (opens in new tab)"
      >
        Read Paper ↗
      </a>
    </div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="sec-label">
        <span className="sec-num">04</span> Projects
      </div>
      <div className="contact-bg-text" aria-hidden="true">
        PROJECTS
      </div>
      <div className="proj-header">
        <h2 id="projects-heading" className="display-h split-h">
          Selected
          <br />
          <span className="accent-text">
            <span className="stroke-text">Work</span>
          </span>
        </h2>
      </div>

      <ProjectsBelt />

      <PublicationBlock />
    </section>
  )
}
