import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const VIDEO = "/images/homepage/hero-platform.mp4";
const POSTER = "/images/homepage/hero-platform-poster.webp";

export const HeroAnimation = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [failed, setFailed] = useState(false);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => setFailed(true));
      return;
    }
    video.pause();
  };

  return (
    <figure className="landing-hero-visual" data-testid="hero-animation">
      {failed ? (
        <img
          src={POSTER}
          alt="TRUSTED-V processor connecting silicon IP, middleware, AI engines, RISC-V core, security, tools and simulation"
          width="400"
          height="283"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="landing-hero-media"
          data-testid="hero-animation-image"
        />
      ) : (
        <video
          ref={videoRef}
          src={VIDEO}
          poster={POSTER}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="TRUSTED-V processor connecting silicon IP, middleware, AI engines, RISC-V core, security, tools and simulation"
          className="landing-hero-media"
          data-testid="hero-animation-image"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
        />
      )}
      {!failed && (
        <div className="landing-hero-animation-controls">
          <Button
            type="button"
            variant="ghost"
            onClick={togglePlayback}
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