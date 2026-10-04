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
      {/* Degree and GPA share a row; coursework spans the full card below it,
          so the chips wrap across the card instead of beside the GPA. */}
      <div className="edu-top">
        <div className="edu-left">
          <div className="edu-deg">{edu.degree}</div>
          <div className="edu-school">{edu.school}</div>
          <div className="edu-period">{edu.period}</div>
        </div>
        <Counter raw={edu.gpa} className="edu-gpa" ariaLabel={edu.gpaLabel} />
      </div>
      <div className="edu-coursework">
        <div className="edu-cw-label">Relevant Coursework</div>
        <div className="edu-cw-grid">
          {edu.coursework.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Three bands, each balanced on its own, so the section stays even as
 * credentials grow:
 *   1. Intro: heading, copy and philosophy beside the portrait.
 *   2. Credentials: education cards and certification tiles in full-width
 *      auto-fit grids. A new course or certificate adds to a grid row instead
 *      of lengthening one column. (Previously everything that grows sat in a
 *      sticky left column that had become taller than the right, so it never
 *      stuck and left the right column ending ~230px early.)
 *   3. Pillars: a 2×2 grid leading into the Skills section.
 */
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

      <div className="about-intro">
        <h2 id="about-heading" className="display-h split-h about-head">
          Code
          <br />
          <span className="stroke-text">meets</span>
          <br />
          Intel&shy;li&shy;gence
        </h2>
        <div className="about-copy">
          <p className="serif-intro">
            Software engineer with an MS in Computer Science from Indiana University Bloomington. I design and build
            intelligent systems, from production software to applied AI research. Purposeful code. Genuinely useful solutions.
          </p>
          <p className="serif-now">
            Currently exploring: <span>LLM Agents</span> · <span>Health AI</span> · <span>Real-time Voice AI</span>
          </p>
        </div>

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
      </div>

      <div className="about-creds">
        <div className="creds-group">
          <h3 className="cert-label">Education</h3>
          <div className="edu-grid">
            {EDUCATION.map((edu) => (
              <EduCard key={edu.degree} edu={edu} />
            ))}
          </div>
        </div>

        <div ref={certsRef} className={`creds-group reveal-up${certsIn ? ' in' : ''}`} style={delay('.1s')}>
          <h3 className="cert-label">Certifications</h3>
          <ul className="cert-list">
            {CERTIFICATIONS.map((c) => (
              <li className="cert-item" key={c.name}>
                <span className="cert-issuer">{c.issuer}</span>
                <span className="cert-name">{c.name}</span>
              </li>
            ))}
          </ul>
        </div>
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
    </section>
  )
}
