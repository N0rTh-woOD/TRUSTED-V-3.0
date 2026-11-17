import { useState } from "react";

const VIDEO = "/images/homepage/hero-platform.mp4";
const POSTER = "/images/homepage/hero-platform-poster.webp";

export const HeroAnimation = () => {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="landing-hero-visual" data-testid="hero-animation">
      {failed ? (
        <img
          src={POSTER}
          alt="TRUSTED-V processor connecting silicon IP, middleware, RISC-V core, security, tools and simulation"
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
          src={VIDEO}
          poster={POSTER}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="TRUSTED-V processor connecting silicon IP, middleware, RISC-V core, security, tools and simulation"
          className="landing-hero-media"
          data-testid="hero-animation-image"
          onError={() => setFailed(true)}
        />
      )}
    </figure>
  );
};