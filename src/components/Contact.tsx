import { useRef, useState, type FormEvent } from 'react'
import { CONTACT_LINKS } from '../data/content'
import { useReveal } from '../hooks/useReveal'

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
const EMAIL = 'agarwaludit13@gmail.com'

export function Contact() {
  const avail = useReveal<HTMLDivElement>()
  const formWrap = useReveal<HTMLDivElement>()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const draftRef = useRef('')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — the address is visible in the message anyway */
    }
  }

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draftRef.current)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* no-op */
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    const company = (form.elements.namedItem('company') as HTMLInputElement).value.trim()
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()

    if (!email) return setError('Please enter your email.')
    if (!isValidEmail(email)) return setError('Please enter a valid email address.')
    if (!message) return setError('Please enter a message.')

    setSubmitting(true)
    const sub = encodeURIComponent('Portfolio Inquiry: Udit Agarwal')
    const bodyText = `${name ? `Name: ${name}\n` : ''}Email: ${email}${company ? `\nCompany: ${company}` : ''}\n\n${message}`
    draftRef.current = bodyText
    window.location.href = `mailto:${EMAIL}?subject=${sub}&body=${encodeURIComponent(bodyText)}`
    // A mailto: can silently no-op when no mail client is registered, so always
    // surface a confirmation panel with a direct-email fallback.
    window.setTimeout(() => {
      setSubmitting(false)
      setSent(true)
    }, 700)
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
              Open to full-time opportunities. Based in Bloomington, IN; available for remote, hybrid, and
              relocation anywhere in the US. Seeking Software · AI/ML · Data · Consultant roles.
            </p>
          </div>
        </div>

        <div ref={formWrap.ref} className={`contact-form glass-card reveal-up${formWrap.inView ? ' in' : ''}`}>
          {sent ? (
            <div className="form-sent" role="status" aria-live="polite">
              <div className="form-sent-icon" aria-hidden="true">
                ✓
              </div>
              <h3 className="form-sent-title">Your mail app should be opening</h3>
              <p className="form-sent-copy">
                If nothing happened, your browser may not have an email app set up. You can copy the message and send it
                directly instead; I reply within 24 hours.
              </p>
              <div className="form-sent-actions">
                <button type="button" className="proj-link proj-link-live" onClick={copyDraft}>
                  {copied ? 'Copied ✓' : 'Copy message'}
                </button>
                <button type="button" className="proj-link" onClick={copyEmail}>
                  {copied ? 'Copied ✓' : `Copy ${EMAIL}`}
                </button>
                <button
                  type="button"
                  className="proj-link"
                  onClick={() => {
                    setSent(false)
                    formRef.current?.reset()
                  }}
                >
                  Write another
                </button>
              </div>
            </div>
          ) : (
          <form ref={formRef} className="form-inner" noValidate aria-label="Contact form" onSubmit={onSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label className="form-label" htmlFor="fname">
                  Name
                </label>
                <input className="form-input" id="fname" name="name" type="text" placeholder="Your name" autoComplete="name" />
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
          )}
        </div>
      </div>
    </section>
  )
}
