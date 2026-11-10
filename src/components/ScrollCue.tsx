import { ChevronDown } from "lucide-react";

export default function ScrollCue({ visible = false }: { visible?: boolean }) {
  return (
    <a
      className={`scroll-cue ${visible ? "scroll-cue-visible" : ""}`}
      href="#reveal"
      aria-label="Scroll to discover"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <span>SCROLL TO EXPLORE</span>
      <ChevronDown size={19} strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
}
