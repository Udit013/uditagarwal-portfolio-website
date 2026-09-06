import type { CSSProperties } from 'react'
import { CERTIFICATIONS, EDUCATION, PHILOSOPHY, PILLARS, type Education } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { Counter } from './Counter'
import { Portrait } from './Portrait'

/** style helper for the `--d` stagger custom property */
const delay = (d?: string) => ({ '--d': d } as CSSProperties)

function EduCard({ edu }: { edu: Education }) {
  const { ref, inView } = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`edu-card glass-card reveal-up${inView ? ' in' : ''}`} style={delay(edu.delay)}>
      <div className="edu-left">
        <div className="edu-deg">{edu.degree}</div>
        <div className="edu-school">{edu.school}</div>
        <div className="edu-period">{edu.period}</div>
        <div className="edu-coursework">
          <div className="edu-cw-label">Relevant Coursework</div>
          <div className="edu-cw-grid">
            {edu.coursework.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </div>
      <Counter raw={edu.gpa} className="edu-gpa" ariaLabel={edu.gpaLabel} />
    </div>
  )
}

export function About() {
  const { ref: philosophyRef, inView: philosophyIn } = useReveal<HTMLDivElement>()
  const { ref: pillarsRef, inView: pillarsIn } = useReveal<HTMLDivElement>()
  const { ref: certsRef, inView: certsIn } = useReveal<HTMLDivElement>()

  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="contact-bg-text" aria-hidden="true">
        Profile
      </div>
      <div className="sec-label">
        <span className="sec-num">01</span> About
      </div>
      <div className="about-layout">
        <div className="about-sticky">
          <h2 id="about-heading" className="display-h split-h">
            Code
            <br />
            <span className="stroke-text">meets</span>
            <br />
            Intel&shy;li&shy;gence
          </h2>
          <p className="serif-intro">
            Software engineer and graduate student at Indiana University Bloomington. I design and build intelligent
            systems, from production software to applied AI research. Purposeful code. Genuinely useful solutions.
          </p>
          <p className="serif-now">
            Currently exploring: <span>LLM Agents</span> · <span>Health AI</span> · <span>Real-time Voice AI</span>
          </p>

          <div className="edu-stack" style={{ marginTop: '2rem' }}>
            <div className="cert-label">Education</div>
            {EDUCATION.map((edu) => (
              <EduCard key={edu.degree} edu={edu} />
            ))}
          </div>

          <div ref={certsRef} className={`cert-block glass-card reveal-up${certsIn ? ' in' : ''}`} style={delay('.1s')}>
            <div className="cert-label">Certifications</div>
            <div className="cert-list">
              {CERTIFICATIONS.map((c) => (
                <div className="cert-item" key={c.name}>
                  <span className="cert-issuer">{c.issuer}</span>
                  <span className="cert-name">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about-right">
          <Portrait />

          <div
            ref={philosophyRef}
            className={`philosophy-block reveal-up${philosophyIn ? ' in' : ''}`}
            style={delay('.05s')}
            role="list"
            aria-label="Engineering philosophy"
          >
            {PHILOSOPHY.map((p) => (
              <div className="philo-item" role="listitem" key={p.text}>
                <span className="philo-icon" aria-hidden="true">
                  {p.icon}
                </span>
                <span>{p.text}</span>
              </div>
            ))}
          </div>

          <div ref={pillarsRef} className={`pillar-stack glass-card reveal-up${pillarsIn ? ' in' : ''}`} style={delay('.08s')}>
            {PILLARS.map((pillar) => (
              <div className="pillar" key={pillar.title}>
                <div className="pillar-row">
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <span className="pillar-num" aria-hidden="true" />
                </div>
                <p className="pillar-desc">{pillar.desc}</p>
                <div className="chip-row" aria-label="Technologies">
                  {pillar.chips.map((c) => (
                    <span className="chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
