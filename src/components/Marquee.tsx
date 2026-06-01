import { MARQUEE_ITEMS } from '../data/content'

/** Infinite-scrolling tagline strip (CSS animation, duplicated track for seamless loop). */
export function Marquee() {
  return (
    <div className="marquee-strip" aria-hidden="true" role="presentation">
      <div className="marquee-track">
        {[0, 1].map((dup) =>
          MARQUEE_ITEMS.map((item, i) => (
            <span key={`${dup}-${i}`} className={`mq${item.hi ? ' hi' : ''}`}>
              {item.text}
            </span>
          )),
        )}
      </div>
    </div>
  )
}
