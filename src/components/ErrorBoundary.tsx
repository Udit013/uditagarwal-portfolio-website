import { Component, type ErrorInfo, type ReactNode } from 'react'

/**
 * Top-level safety net. Without it a throw anywhere in the tree unmounts the
 * whole app and leaves a blank page — and since the intro curtain now lives in
 * index.html rather than React, the visitor would stare at an opaque panel
 * until the 6s failsafe cleared it.
 *
 * Deliberately plain: no hooks, no dependencies, and its own inline-safe
 * styling via .errfb-* classes, so it can still render when something in the
 * app is badly broken.
 */

const EMAIL = 'agarwaludit13@gmail.com'

interface Props {
  children: ReactNode
}
interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // The curtain is plain HTML and its remover lives in the component that
    // just failed to mount, so take it down here rather than wait out the
    // 6s failsafe behind an opaque panel.
    document.getElementById('loader')?.remove()
    console.error('Unhandled error:', error, info.componentStack)
  }

  private retry = () => this.setState({ error: null })

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    const subject = encodeURIComponent('Portfolio: something broke')
    const body = encodeURIComponent(`I hit an error on uditagarwal.vercel.app\n\n${error.message}`)

    return (
      <div className="errfb" role="alert">
        <div className="errfb-card">
          <p className="errfb-eyebrow">Something went wrong</p>
          <h1 className="errfb-title">
            This page hit an error<span>.</span>
          </h1>
          <p className="errfb-copy">
            Not your fault. You can try again, or reach me directly and I'll take a look.
          </p>
          <div className="errfb-actions">
            <button type="button" className="btn-primary" onClick={this.retry}>
              Try again
            </button>
            <a className="hero-pill" href={`mailto:${EMAIL}?subject=${subject}&body=${body}`}>
              Email me ↗
            </a>
            <a className="hero-pill" href="/">
              Reload ↻
            </a>
          </div>
        </div>
      </div>
    )
  }
}
