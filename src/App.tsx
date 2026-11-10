import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowDown, Heart, Phone, Volume2, VolumeX } from "lucide-react";
import ScrollCue from "./components/ScrollCue";
import ScratchCard from "./components/ScratchCard";
import EventSection from "./components/EventSection";
import { events, rsvpContacts } from "./data/events";

// Prefixed with BASE_URL so assets resolve when hosted under a sub-path (GitHub Pages).
const POSTER_URL = `${import.meta.env.BASE_URL}images/entry-poster.jpg`;
const VIDEO_URL = `${import.meta.env.BASE_URL}videos/entry.mp4`;
const MUSIC_URL = `${import.meta.env.BASE_URL}audio/wedding-bg-music.mp3`;

function RevealObserver() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -7% 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return null;
}

function Countdown() {
  const target = new Date("2026-11-24T19:00:00+05:30").getTime();
  const [remaining, setRemaining] = useState(target - Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(target - Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const safe = Math.max(0, remaining);
  const units = [
    ["DAYS", Math.floor(safe / 86400000)],
    ["HOURS", Math.floor((safe % 86400000) / 3600000)],
    ["MINUTES", Math.floor((safe % 3600000) / 60000)],
    ["SECONDS", Math.floor((safe % 60000) / 1000)],
  ] as const;

  return (
    <div className="countdown-grid">
      {units.map(([label, value], index) => (
        <div className="count-unit" data-reveal key={label} style={{ transitionDelay: `${index * 90}ms` }}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [entryStarted, setEntryStarted] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (scrollEnabled) {
      root.classList.remove("entry-locked");
      body.classList.remove("entry-locked");
    } else {
      root.classList.add("entry-locked");
      body.classList.add("entry-locked");
    }
    return () => {
      root.classList.remove("entry-locked");
      body.classList.remove("entry-locked");
    };
  }, [scrollEnabled]);

  const openInvitation = async () => {
    if (entryStarted) return;
    setEntryStarted(true);
    // Started inside the tap handler so browsers allow audio.
    const music = audioRef.current;
    if (music) {
      music.volume = 0.6;
      music.play().catch(() => setMuted(true));
    }
    const video = videoRef.current;
    if (video) {
      try {
        await video.play();
      } catch {
        // Playback blocked: don't leave the visitor stuck on the entry screen.
        setScrollEnabled(true);
      }
    }
  };

  return (
    <main className="wedding-site">
      <RevealObserver />
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" muted={muted} />
      {entryStarted && (
        <button
          type="button"
          className="music-toggle"
          aria-label={muted ? "Turn music on" : "Turn music off"}
          onClick={() => {
            const music = audioRef.current;
            if (muted && music?.paused) music.play().catch(() => undefined);
            setMuted(!muted);
          }}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      )}

      <section
        className={`hero ${entryStarted ? "entry-started" : ""} ${scrollEnabled ? "entry-scroll-enabled" : ""}`}
        id="top"
        onClick={openInvitation}
        role="button"
        tabIndex={0}
        aria-label="Tap to open the wedding invitation"
        onKeyDown={(event) => {
          if ((event.key === "Enter" || event.key === " ") && !entryStarted) {
            event.preventDefault();
            void openInvitation();
          }
        }}
      >
        <img className="hero-poster" src={POSTER_URL} alt="" />
        <video
          ref={videoRef}
          className="hero-video"
          src={VIDEO_URL}
          poster={POSTER_URL}
          playsInline
          preload="none"
          onTimeUpdate={(event) => {
            const { currentTime, duration } = event.currentTarget;
            if (duration && duration - currentTime <= 10) setScrollEnabled(true);
          }}
          onEnded={() => setScrollEnabled(true)}
          onError={() => setScrollEnabled(true)}
        />
        {!entryStarted && (
          <div className="tap-open-wrap">
            <span className="tap-open-pill">Tap to Open</span>
          </div>
        )}
        <ScrollCue visible={scrollEnabled} />
      </section>

      <section className="scratch-scene" id="reveal">
        <div className="scene-background scratch-background" aria-hidden="true" />
        <div className="scratch-scene-wash" aria-hidden="true" />
        <div className="scratch-scene-content">
          <span className="eyebrow" data-reveal>A LITTLE SURPRISE FOR YOU</span>
          <h2 className="script-heading" data-reveal>The celebration begins</h2>
          <p className="scene-subtitle" data-reveal>One beautiful date. A lifetime of memories.</p>
          <ScratchCard />
          <p className="scratch-caption" data-reveal>Gently scratch to uncover the special dates</p>
          <a className="scroll-link" href="#festivities">
            <span>SCROLL TO EXPLORE</span><ArrowDown size={18} />
          </a>
        </div>
        <SceneParticles type="rose" count={6} />
      </section>

      <section className="festivities-intro" id="festivities">
        <div className="intro-flourish" data-reveal>✦ ✦ ✦</div>
        <span className="eyebrow" data-reveal>CELEBRATION DIARIES · ONE UNFORGETTABLE JOURNEY</span>
        <h2 className="script-heading" data-reveal>The Wedding Festivities</h2>
        <p data-reveal>Come together for rituals, laughter, music and moments to treasure forever.</p>
      </section>

      <div className="event-story">
        {events.map((event) => (
          <EventSection key={event.id} event={event} />
        ))}
      </div>

      <section className="rsvp-scene" id="rsvp">
        <div className="rsvp-border" aria-hidden="true" />
        <span className="eyebrow" data-reveal>YOUR PRESENCE IS OUR PRESENT</span>
        <h2 className="script-heading" data-reveal>R S V P</h2>
        <p className="rsvp-intro" data-reveal>For timings, travel, or anything at all.</p>
        <div className="rsvp-list">
          {rsvpContacts.map((contact, index) => (
            <div className="rsvp-row" data-reveal style={{ transitionDelay: `${index * 120}ms` }} key={contact.phone}>
              <div className="rsvp-person">
                <span>{contact.name}</span>
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </div>
              <div className="rsvp-actions">
                <a className="rsvp-action call" href={`tel:${contact.phone}`} aria-label={`Call ${contact.name}`}>
                  <Phone size={17} />
                </a>
                <a className="rsvp-action whatsapp" href={`https://wa.me/91${contact.phone}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${contact.name}`}>
                  <svg viewBox="0 0 24 24" role="img" aria-label="WhatsApp" focusable="false">
                    <path fill="currentColor" d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.5 0 .15 5.35.15 11.93c0 2.1.55 4.15 1.6 5.96L.05 24l6.27-1.64a11.9 11.9 0 0 0 5.75 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.19-3.49-8.42ZM12.08 21.8h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.72.97.99-3.63-.23-.37a9.86 9.86 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.91 7.01c0 5.48-4.45 9.93-9.98 9.93Zm5.45-7.43c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="rsvp-footnote" data-reveal><Heart size={14} /> We can't wait to celebrate with you</p>
        <SceneParticles type="rose" count={5} />
      </section>

      <section className="finale-scene">
        <div className="finale-arch" aria-hidden="true" />
        <span className="eyebrow" data-reveal>THE MOMENT IS GETTING CLOSER</span>
        <h2 className="script-heading" data-reveal>Counting down to</h2>
        <div className="forever" data-reveal>Forever</div>
        <Countdown />
        <div className="finale-divider" data-reveal>✦ ✦ ✦</div>
        <h3 className="closing-names" data-reveal>Shivam <span>weds</span> Apoorva</h3>
        <p className="closing-date" data-reveal>24 NOVEMBER 2026</p>
        <Heart className="closing-heart" size={18} />
      </section>
      <footer>MADE WITH LOVE · SHIVAM WEDS APOORVA</footer>
      <a className="top-button" href="#top" aria-label="Back to top">↑</a>
    </main>
  );
}

function SceneParticles({ type, count }: { type: "rose"; count: number }) {
  return (
    <div className={`scene-particles particles-${type}`} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <i
          key={index}
          style={{
            left: `${(index * 37 + 9) % 100}%`,
            animationDelay: `${(index * 2.4) % 14}s`,
            animationDuration: `${17 + (index % 4) * 2.5}s`,
            ["--drift" as string]: `${(index % 2 === 0 ? 1 : -1) * (14 + (index % 3) * 9)}px`,
            ["--scale" as string]: `${0.5 + (index % 3) * 0.14}`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
