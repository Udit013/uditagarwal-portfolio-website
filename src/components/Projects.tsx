import { useState } from 'react'
import { PROJECTS, PROJECT_FILTERS, type Project, type ProjectType } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { Counter } from './Counter'

type Filter = ProjectType

function ProjectCard({ project, hidden }: { project: Project; hidden: boolean }) {
  const { ref, inView } = useReveal<HTMLElement>()
  return (
    <article
      ref={ref}
      className={`proj-card glass-card${inView ? ' in' : ''}${hidden ? ' pc-hidden' : ''}`}
      data-type={project.types.join(' ')}
      aria-label={`Project: ${project.title}`}
      aria-hidden={hidden}
    >
      <div className="proj-card-top">
        <div className="proj-tags-wrap">
          {project.badges.map((b) => (
            <span className={`proj-badge ${b.cls}`} key={b.label}>
              {b.label}
            </span>
          ))}
        </div>
      </div>
      <div className="proj-card-num" aria-hidden="true">
        {project.num}
      </div>
      <h3 className="proj-card-title">{project.title}</h3>
      <p className="proj-card-desc">{project.desc}</p>
      {project.stats && (
        <div className="proj-card-stats" aria-label="Model performance metrics">
          {project.stats.map((s) => (
            <div className="proj-stat" key={s.label}>
              <Counter raw={s.value} className="proj-stat-val" />
              {s.suffix && <small>{s.suffix}</small>}
              <span className="proj-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      )}
      <div className="proj-card-chips" aria-label="Technologies">
        {project.chips.map((c) => (
          <span className="chip" key={c}>
            {c}
          </span>
        ))}
      </div>
      <div className="proj-card-links" aria-label="Project links">
        {project.live ? (
          <a className="proj-link proj-link-live" href={project.live} target="_blank" rel="noopener noreferrer" data-cursor="Live">
            Live Demo ↗
          </a>
        ) : project.demoSoon ? (
          <span className="proj-link proj-link-soon" aria-disabled="true">
            Demo coming soon
          </span>
        ) : null}
        {project.repo && (
          <a className="proj-link" href={project.repo} target="_blank" rel="noopener noreferrer" data-cursor="Code">
            Code ↗
          </a>
        )}
        {project.paper && (
          <a className="proj-link proj-link-paper" href={project.paper} target="_blank" rel="noopener noreferrer" data-cursor="Paper">
            IEEE Paper ↗
          </a>
        )}
        {project.note && (
          <span className="proj-link proj-link-soon" aria-disabled="true">
            {project.note}
          </span>
        )}
      </div>
    </article>
  )
}

function PublicationBlock() {
  const { ref, inView } = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`pub-block glass-card reveal-up${inView ? ' in' : ''}`} style={{ marginTop: '2rem' }} aria-label="IEEE Publication">
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
  const [filter, setFilter] = useState<Filter>(PROJECT_FILTERS[0].id)

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
        <div className="filter-bar" role="group" aria-label="Filter projects by type">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f.id}
              className={`filter-btn${filter === f.id ? ' active' : ''}`}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="proj-grid">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.num} project={project} hidden={!project.types.includes(filter)} />
        ))}
      </div>

      <PublicationBlock />
    </section>
  )
}
