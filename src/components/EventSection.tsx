import { useEffect, useRef, useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";
import type { WeddingEvent } from "../data/events";

export default function EventSection({ event }: { event: WeddingEvent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting);
    }, { threshold: 0.18, rootMargin: "-8% 0px -8% 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`event-scene event-${event.id} ${active ? "is-active" : ""}`}
      id={event.id}
      aria-labelledby={`${event.id}-title`}
    >
      <div className={`scene-background event-background event-background-${event.id}`} aria-hidden="true" />
      <div className="event-image-wash" aria-hidden="true" />
      <div className={`event-particles particles-${event.particle}`} aria-hidden="true">
        {Array.from({ length: event.id === "baraat" ? 10 : 7 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 43 + 7) % 100}%`,
              animationDelay: `${(i * 2.1) % 13}s`,
              animationDuration: `${15 + (i % 4) * 2.5}s`,
              ["--drift" as string]: `${((i % 2 === 0) ? 1 : -1) * (14 + (i % 3) * 9)}px`,
              ["--scale" as string]: `${0.55 + (i % 3) * 0.15}`,
            } as CSSProperties}
          />
        ))}
      </div>

      <div className="event-content-wrap">
        <div className="event-info-panel">
          <span className="eyebrow event-eyebrow">{event.eyebrow}</span>
          <span className="event-date">{event.dateLabel}</span>
          <h2 id={`${event.id}-title`}>{event.title}</h2>
          <div className="event-divider"><i>✦</i></div>
          <div className="event-details">
            {event.schedule.map((item) => (
              <p key={item.label} className={item.meal ? "event-meal" : undefined}>
                {item.label} · {item.time}
              </p>
            ))}
          </div>
          <div className="event-location">
            <MapPin size={17} strokeWidth={1.7} />
            <span>{event.location}</span>
          </div>
          <a className="event-map-link" href={event.mapUrl} target="_blank" rel="noreferrer">
            <MapPin size={15} />
            VIEW LOCATION
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
      <span className="event-side-note" aria-hidden="true">A DAY TO REMEMBER</span>
    </section>
  );
}
