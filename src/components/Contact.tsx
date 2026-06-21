import { useRef, useState, type FormEvent } from 'react'
import { CONTACT_LINKS } from '../data/content'
import { useReveal } from '../hooks/useReveal'

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

export function Contact() {
  const avail = useReveal<HTMLDivElement>()
  const formWrap = useReveal<HTMLDivElement>()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    const company = (form.elements.namedItem('company') as HTMLInputElement).value.trim()
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()

    if (!name) return setError('Please enter your name.')
    if (!email) return setError('Please enter your email.')
    if (!isValidEmail(email)) return setError('Please enter a valid email address.')
    if (!message) return setError('Please enter a message.')

    setSubmitting(true)
    const sub = encodeURIComponent('Portfolio Inquiry — Udit Agarwal')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`)
    window.location.href = `mailto:agarwaludit13@gmail.com?subject=${sub}&body=${body}`
    setTimeout(() => setSubmitting(false), 2000)
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="sec-label">
        <span className="sec-num">05</span> Contact
      </div>
      <div className="contact-bg-text" aria-hidden="true">
        CONNECT
      </div>

      <div className="contact-layout">
        <div className="contact-left">
          <h2 id="contact-heading" className="display-h split-h contact-h">
            Let's
            <br />
            <span className="stroke-text">build</span>
            <br />
            something
          </h2>
          <p className="serif-body" style={{ marginTop: '1.75rem', maxWidth: 380 }}>
            Open to full-time roles in SWE, AI/ML, and Data Engineering. Research collaborations and interesting projects welcome.
          </p>

          <div className="contact-links" role="list" aria-label="Contact methods">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="clink glass-card"
                data-magnetic
                data-cursor={link.cursor}
                role="listitem"
                aria-label={link.ariaLabel ?? (link.external ? `${link.label} profile (opens in new tab)` : undefined)}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <div className="clink-icon" aria-hidden="true">
                  {link.icon}
                </div>
                <div className="clink-info">
                  <span className="clink-label">{link.label}</span>
                  <span className="clink-val">{link.value}</span>
                </div>
                <span className="clink-arr" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>

          <div ref={avail.ref} className={`avail-block reveal-up${avail.inView ? ' in' : ''}`}>
            <span className="live-dot" aria-hidden="true" />
            <p>
              Available for full-time opportunities starting June 2026. Based in Bloomington, IN — open to remote, hybrid,
              and relocation anywhere in the US. Seeking Software · AI/ML · Data · Consultant roles.
            </p>
          </div>
        </div>

        <div ref={formWrap.ref} className={`contact-form glass-card reveal-up${formWrap.inView ? ' in' : ''}`}>
          <form ref={formRef} className="form-inner" noValidate aria-label="Contact form" onSubmit={onSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label className="form-label" htmlFor="fname">
                  Name <span aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input className="form-input" id="fname" name="name" type="text" placeholder="Your name" required autoComplete="name" aria-required="true" />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="femail">
                  Email <span aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input className="form-input" id="femail" name="email" type="email" placeholder="you@example.com" required autoComplete="email" aria-required="true" />
              </div>
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="fcompany">
                Company
              </label>
              <input className="form-input" id="fcompany" name="company" type="text" placeholder="Optional" autoComplete="organization" />
            </div>
            <div className="form-field message-field">
              <label className="form-label" htmlFor="fmsg">
                Message <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <textarea className="form-input form-textarea" id="fmsg" name="message" placeholder="Tell me about the role, project, or collaboration…" required aria-required="true" />
            </div>
            {error && (
              <div className="form-error" role="alert" aria-live="assertive">
                {error}
              </div>
            )}
            <button className="form-submit" type="submit" data-magnetic data-cursor="Send" disabled={submitting}>
              {submitting ? 'Opening…' : 'Send Message →'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
