import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const GIF = "/images/homepage/hero-platform.gif";
const POSTER = "/images/homepage/hero-platform-poster.webp";

export const HeroAnimation = () => {
  const [playing, setPlaying] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event) => setPlaying(!event.matches);
    preference.addEventListener("change", onChange);
    return () => preference.removeEventListener("change", onChange);
  }, []);

  return (
    <figure className="landing-hero-visual" data-testid="hero-animation">
      <img
        src={playing && !failed ? GIF : POSTER}
        alt="TRUSTED-V processor connecting silicon IP, middleware, AI engines, RISC-V core, security, tools and simulation"
        width="400"
        height="283"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="landing-hero-gif"
        data-testid="hero-animation-image"
        onError={() => setFailed(true)}
      />
      {!failed && (
        <div className="landing-hero-animation-controls">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Pause animation" : "Play animation"}
            title={playing ? "Pause animation" : "Play animation"}
            className="landing-hero-animation-toggle"
            data-testid="hero-animation-toggle"
          >
            {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
            <span>{playing ? "Pause animation" : "Play animation"}</span>
          </Button>
        </div>
      )}
    </figure>
  );
};