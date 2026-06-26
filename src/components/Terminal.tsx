import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CHAT_FAQ, KB } from '../data/terminal'

type Line =
  | { id: number; kind: 'plain'; html: string }
  | { id: number; kind: 'out'; html: string }

const escHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const stripHtml = (html: string) => {
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.innerText
}
const timestamp = () => {
  const now = new Date()
  return [now.getHours(), now.getMinutes(), now.getSeconds()].map((n) => String(n).padStart(2, '0')).join(':')
}

export function Terminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [acItems, setAcItems] = useState<string[]>([])
  const [acIdx, setAcIdx] = useState(-1)
  const [height, setHeight] = useState<number | null>(null)

  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)
  const booted = useRef(false)
  const chatMode = useRef(false)
  const history = useRef<string[]>([])
  const hIdx = useRef(-1)

  const nextId = () => ++idRef.current
  const print = useCallback((html: string) => setLines((l) => [...l, { id: nextId(), kind: 'plain', html }]), [])
  const printOut = useCallback((html: string) => setLines((l) => [...l, { id: nextId(), kind: 'out', html }]), [])
  const hideAc = useCallback(() => {
    setAcItems([])
    setAcIdx(-1)
  }, [])

  /* Keep output scrolled to the bottom as lines are added */
  useLayoutEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [lines])

  const openPanel = useCallback(() => {
    setOpen(true)
    if (!booted.current) {
      booted.current = true
      const date = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      print(`<span class="t-sys">▸ portfolio terminal — ${date}</span>`)
      print(`<span class="t-sys">type <span class="t-hi">help</span> · tab autocomplete · ↑↓ history · \` toggle</span>`)
    }
    setTimeout(() => inputRef.current?.focus(), 120)
  }, [print])

  const closePanel = useCallback(() => {
    setOpen(false)
    hideAc()
  }, [hideAc])

  const runCmd = useCallback(
    (rawInput: string) => {
      const raw = rawInput.trim()
      const cmd = raw.toLowerCase()
      if (!cmd) return
      history.current.unshift(raw)
      hIdx.current = -1
      hideAc()
      print(`<span class="t-ts">${timestamp()}</span><span class="t-prompt">$</span>&nbsp;<span class="t-cmd">${escHtml(raw)}</span>`)

      if (chatMode.current) {
        if (cmd === 'exit' || cmd === 'quit') {
          chatMode.current = false
          print(`<span class="t-sys">← returned to terminal mode</span>`)
          return
        }
        const match = CHAT_FAQ.find((f) => f.q.test(raw))
        printOut(
          match
            ? match.a
            : `I answer questions about Udit's skills, experience, projects, research, and availability. Try something specific, or type <span class="t-hi">exit</span> to return.`,
        )
        return
      }

      if (cmd === 'clear') return setLines([])
      if (cmd === 'exit' || cmd === 'quit') return closePanel()
      if (cmd === 'history') {
        return printOut(
          history.current.length > 1
            ? history.current
                .slice(1)
                .map((h, i) => `<span class="t-hi">${String(i + 1).padStart(3)}</span>  ${escHtml(h)}`)
                .join('\n')
            : '(no history yet)',
        )
      }
      if (cmd === 'date') {
        return printOut(
          new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        )
      }

      const key = KB[cmd] && typeof KB[cmd] === 'string' && KB[KB[cmd]] ? KB[cmd] : cmd
      const res = KB[key] ?? KB[cmd]

      if (!res) {
        print(`<span class="t-err">✗ command not found: '${escHtml(cmd)}' — type <span class="t-hi">help</span></span>`)
      } else if (res.startsWith('__open__')) {
        const url = res.slice(8)
        printOut(`Opening → <span class="t-link">${url}</span>`)
        setTimeout(() => window.open(url, '_blank', 'noopener,noreferrer'), 500)
      } else if (res === '__chat__') {
        chatMode.current = true
        print(`<span class="t-sys">💬 chat mode — ask anything about Udit — type <span class="t-hi">exit</span> to return</span>`)
      } else {
        printOut(res)
      }
    },
    [print, printOut, hideAc, closePanel],
  )

  /* Autocomplete suggestions as the user types */
  const onInputChange = (value: string) => {
    setInput(value)
    const v = value.toLowerCase().trim()
    if (!v) return hideAc()
    const matches = Object.keys(KB)
      .filter((k) => k.startsWith(v) && k !== v && !k.startsWith('_'))
      .slice(0, 6)
    setAcItems(matches.length > 1 ? matches : [])
    setAcIdx(-1)
  }

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const v = input
      setInput('')
      hideAc()
      runCmd(v)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (acItems.length) {
        const i = Math.max(acIdx - 1, 0)
        setAcIdx(i)
        setInput(acItems[i] ?? input)
      } else {
        hIdx.current = Math.min(hIdx.current + 1, history.current.length - 1)
        setInput(history.current[hIdx.current] ?? '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (acItems.length) {
        const i = Math.min(acIdx + 1, acItems.length - 1)
        setAcIdx(i)
        setInput(acItems[i] ?? input)
      } else {
        hIdx.current = Math.max(hIdx.current - 1, -1)
        setInput(hIdx.current < 0 ? '' : history.current[hIdx.current])
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const v = input.toLowerCase().trim()
      if (acItems.length > 0) {
        setInput(acItems[acIdx >= 0 ? acIdx : 0])
        hideAc()
      } else {
        const m = Object.keys(KB).find((k) => k.startsWith(v) && v.length > 0 && !k.startsWith('_'))
        if (m) setInput(m)
      }
    } else if (e.key === 'Escape') {
      hideAc()
    }
  }

  /* ` / ~ global hotkey + Escape to close */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName
      const editable = tag === 'INPUT' || tag === 'TEXTAREA'
      if ((e.key === '`' || e.key === '~') && !editable) {
        e.preventDefault()
        if (open) closePanel()
        else openPanel()
      }
      if (e.key === 'Escape' && open) closePanel()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, openPanel, closePanel])

  /* Drag-to-resize from the top edge */
  const onResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    const startY = e.clientY
    const startH = panelRef.current?.getBoundingClientRect().height ?? 0
    document.body.style.userSelect = 'none'
    const onMove = (ev: MouseEvent) => {
      const newH = Math.min(Math.max(startH + (startY - ev.clientY), 240), window.innerHeight * 0.85)
      setHeight(newH)
    }
    const onUp = () => {
      document.body.style.userSelect = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const copyAll = () => {
    const text = lines.map((l) => stripHtml(l.html)).join('\n')
    navigator.clipboard?.writeText(text)
  }

  return (
    <>
      <button
        className="term-toggle"
        aria-label="Open terminal (press backtick to toggle)"
        title="Press ` to toggle"
        type="button"
        onClick={() => (open ? closePanel() : openPanel())}
      >
        {'>_'}
      </button>

      <div
        ref={panelRef}
        className={`term-panel${open ? ' open' : ''}`}
        aria-hidden={!open}
        role="dialog"
        aria-label="Portfolio terminal"
        aria-modal="true"
        data-lenis-prevent
        style={height ? { height } : undefined}
      >
        <div className="term-resize-handle" aria-hidden="true" onMouseDown={onResizeStart} />
        <div className="term-titlebar">
          <div className="term-traffic" aria-hidden="true">
            <span style={{ background: '#ff5f57' }} />
            <span style={{ background: '#ffbd2e' }} />
            <span style={{ background: '#28ca42' }} />
          </div>
          <span className="term-title" aria-hidden="true">
            portfolio@udit
          </span>
          <div className="term-toolbar">
            <button className="term-action-btn" title="Clear terminal" aria-label="Clear terminal output" onClick={() => setLines([])}>
              ⌫
            </button>
            <button className="term-action-btn" title="Copy all output" aria-label="Copy all terminal output" onClick={copyAll}>
              ⧉
            </button>
            <button className="term-close" aria-label="Close terminal" type="button" onClick={closePanel}>
              ×
            </button>
          </div>
        </div>

        <div className="term-output" ref={outputRef} role="log" aria-live="polite" aria-label="Terminal output">
          {lines.map((line) =>
            line.kind === 'plain' ? (
              <div key={line.id} style={{ animation: 'tFadeUp .16s ease forwards', marginBottom: 2 }} dangerouslySetInnerHTML={{ __html: line.html }} />
            ) : (
              <div key={line.id} style={{ animation: 'tFadeUp .16s ease forwards' }}>
                <span className="t-out">
                  <span dangerouslySetInnerHTML={{ __html: line.html }} />
                  <button className="t-copy-btn" aria-label="Copy output" onClick={() => navigator.clipboard?.writeText(stripHtml(line.html))}>
                    ⧉ copy
                  </button>
                </span>
              </div>
            ),
          )}
        </div>

        <div className="term-inputbar" style={{ position: 'relative' }}>
          <span className="term-prompt-label" aria-hidden="true">
            $&nbsp;
          </span>
          <input
            ref={inputRef}
            className="term-input"
            autoComplete="off"
            spellCheck={false}
            placeholder="type 'help'…"
            aria-label="Terminal input"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onInputKeyDown}
          />
          <span className="term-cursor" aria-hidden="true" />
          {acItems.length > 0 && (
            <div className="term-autocomplete visible" role="listbox">
              {acItems.map((m, i) => (
                <div
                  key={m}
                  className={`term-ac-item${i === acIdx ? ' ac-active' : ''}`}
                  role="option"
                  aria-selected={i === acIdx}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    setInput(m)
                    hideAc()
                    inputRef.current?.focus()
                  }}
                >
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
