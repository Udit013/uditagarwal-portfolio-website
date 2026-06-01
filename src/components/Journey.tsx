import type { CSSProperties } from 'react'
import { JOURNEY, type JourneyEntry } from '../data/content'
import { useReveal } from '../hooks/useReveal'

function JourneyItem({ entry }: { entry: JourneyEntry }) {
  const { ref, inView } = useReveal<HTMLLIElement>()
  return (
    <li ref={ref} className={`jtl-item reveal-up${inView ? ' in' : ''}`} style={{ '--d': entry.delay } as CSSProperties}>
      <div className="jtl-node" aria-hidden="true">
        <div className="jtl-dot" />
        <div className="jtl-line" />
      </div>
      <div className="jtl-content glass-card">
        <div className="jtl-meta">
          <time className="journey-period" dateTime={entry.datetime}>
            {entry.period}
          </time>
          <span className="journey-type">{entry.type}</span>
        </div>
        <div className="journey-role">{entry.role}</div>
        <div className="journey-company">{entry.company}</div>
        <ul className="journey-bullets" aria-label="Key contributions">
          {entry.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className="chip-row" aria-label="Technologies">
          {entry.chips.map((c) => (
            <span className="chip" key={c}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </li>
  )
}

export function Journey() {
  return (
    <section id="journey" className="section" aria-labelledby="journey-heading">
      <div className="sec-label">
        <span className="sec-num">03</span> Professional Journey
      </div>
      <div className="journey-header">
        <h2 id="journey-heading" className="display-h split-h">
          EXPERIENCE
          <br />
          <span className="accent-text">
            <span className="stroke-text">&amp; IMPACT</span>
          </span>
        </h2>
      </div>
      <div className="contact-bg-text" aria-hidden="true">
        WORK
      </div>
      <ol className="journey-timeline" aria-label="Work experience timeline">
        {JOURNEY.map((entry) => (
          <JourneyItem key={entry.role} entry={entry} />
        ))}
      </ol>
    </section>
  )
}
